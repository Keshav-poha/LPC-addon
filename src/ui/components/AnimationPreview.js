import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { loadSprites } from "../../engine/sprite-loader";
import { compositeAnimationLayers } from "../../engine/sprite-compositor";
import { extractAnimationFrames } from "../../engine/frame-extractor";
import { CATEGORIES, getAnimationFolder, HAIR_COLORS } from "../../data/sheet-definitions";
import { ANIMATIONS, EXPORT_SIZE, ANIMATION_FPS } from "../../data/animation-map";
import { encodeGif } from "../gif-exporter";

import "@spectrum-web-components/toast/sp-toast.js";

@customElement("animation-preview")
export class AnimationPreview extends LitElement {
    @property({ type: Object }) characterState = {};
    @property({ type: String }) animation = "walk";
    @property({ type: String }) direction = "down";
    @property({ type: Object }) addOnUISdk;

    @state() isLoading = false;
    @state() isExporting = false;
    @state() exportProgress = 0;
    @state() errorMessage = "";
    @state() toastOpen = false;

    @query("canvas") canvas;
    
    _frames = [];
    _currentFrameIndex = 0;
    _animationTimer = null;
    _compositeSheet = null;
    _cancelToken = null;

    static styles = css`
        .preview-container {
            background-color: var(--spectrum-global-color-gray-200);
            border-radius: 4px;
            border: 1px solid var(--spectrum-global-color-gray-400);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            aspect-ratio: 1; /* Square */
            overflow: hidden;
            position: relative;
            margin-bottom: 16px;
            background-image: 
                linear-gradient(45deg, var(--spectrum-global-color-gray-300) 25%, transparent 25%), 
                linear-gradient(-45deg, var(--spectrum-global-color-gray-300) 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, var(--spectrum-global-color-gray-300) 75%), 
                linear-gradient(-45deg, transparent 75%, var(--spectrum-global-color-gray-300) 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }

        canvas {
            image-rendering: pixelated;
            max-width: 100%;
            max-height: 100%;
        }

        .loading-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(255, 255, 255, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
        }

        .action-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
        }
        
        sp-button {
            width: 100%;
        }

        .hidden { display: none !important; }
    `;

    updated(changedProperties) {
        if (changedProperties.has("characterState") || changedProperties.has("animation")) {
            this._loadAndComposite();
        } else if (changedProperties.has("direction")) {
            this._extractFrames();
        }
    }

    async _loadAndComposite() {
        this.errorMessage = "";
        if (!this.characterState.bodyType) return;
        
        // Create a unique token for this load operation
        const currentToken = Symbol();
        this._cancelToken = currentToken;
        
        this.isLoading = true;
        
        try {
            // 1. Determine all sprite paths needed based on characterState
            const pathsToLoad = [];
            const layerInfo = []; // keep track of zPos and path
            const mappedAnim = getAnimationFolder(this.animation);
            this._pathToCategoryMap = {};
            
            for (const cat of CATEGORIES) {
                // Check subcategories (like head -> ears, nose, eyes)
                if (cat.subcategories) {
                    for (const sub of cat.subcategories) {
                        const selectedItemId = this.characterState[cat.id]?.[sub.id];
                        if (selectedItemId && selectedItemId !== "none") {
                            const item = sub.items.find(i => i.id === selectedItemId);
                            if (item && item.getPath) {
                                const path = item.getPath(this.characterState.bodyType, mappedAnim);
                                if (path) {
                                    pathsToLoad.push(path);
                                    layerInfo.push({ path, zPos: cat.zPos });
                                    this._pathToCategoryMap[path] = { catId: cat.id, subcatId: sub.id };
                                }
                            }
                        }
                    }
                } else {
                    // Regular category (like hair, torso)
                    const selectedItemId = this.characterState[cat.id];
                    
                    // Special case for body which doesn't have selectable items in the same way
                    if (cat.id === "body") {
                        const path = cat.getPath(this.characterState.bodyType, mappedAnim);
                        pathsToLoad.push(path);
                        layerInfo.push({ path, zPos: cat.zPos });
                        if (cat.getHeadPath) {
                            const headPath = cat.getHeadPath(this.characterState.bodyType, mappedAnim);
                            if (headPath) {
                                pathsToLoad.push(headPath);
                                layerInfo.push({ path: headPath, zPos: 12 }); // just above body
                            }
                        }
                    } else if (selectedItemId && selectedItemId !== "none") {
                        const item = cat.items.find(i => i.id === selectedItemId);
                        if (item && item.getPath) {
                            const path = item.getPath(this.characterState.bodyType, mappedAnim);
                            if (path) {
                                pathsToLoad.push(path);
                                let tint = null;
                                if (cat.id === "hair" && this.characterState.hairColor) {
                                    const colorDef = HAIR_COLORS.find(c => c.id === this.characterState.hairColor);
                                    if (colorDef) tint = colorDef.hex;
                                }
                                layerInfo.push({ path, zPos: cat.zPos, tint });
                                this._pathToCategoryMap[path] = { catId: cat.id, subcatId: null };
                            }
                        }
                    }
                }
            }

        // 2. Load all sprites
        const images = await loadSprites(pathsToLoad);
        
        // Check if user clicked cancel or a new load started
        if (this._cancelToken !== currentToken) {
            return;
        }
        
        // 3. Match images to layer info for z-ordering
        const layers = layerInfo.map((info, index) => ({
            image: images[index],
            zPos: info.zPos,
            tint: info.tint
        })).filter(l => l.image !== null); // remove failed loads
        
            // 4. Composite
            this._compositeSheet = compositeAnimationLayers(layers);
            
            if (!this._compositeSheet) {
                this.errorMessage = "Failed to composite: No valid layers";
            }
            
            this.isLoading = false;
            
            // 5. Extract frames for current direction
            this._extractFrames();
            
            // Dispatch event with all loaded paths so parent can update credits
            this.dispatchEvent(new CustomEvent('sprites-loaded', {
                detail: { paths: pathsToLoad },
                bubbles: true,
                composed: true
            }));
        } catch (e) {
            console.error(e);
            
            // Extract failed path and reset that category
            const match = e.message.match(/Failed to load sprite: (.*)/);
            if (match && match[1]) {
                const failedPath = match[1];
                const categoryInfo = this._pathToCategoryMap?.[failedPath];
                if (categoryInfo && categoryInfo.catId !== "body") {
                    this.dispatchEvent(new CustomEvent('reset-category', {
                        detail: categoryInfo,
                        bubbles: true,
                        composed: true
                    }));
                }
            }

            this.errorMessage = "Incompatible configuration!";
            this.toastOpen = true;
            this.isLoading = false;
            
            setTimeout(() => {
                this.toastOpen = false;
            }, 3000);
        }
    }

    _extractFrames() {
        if (!this._compositeSheet) return;
        
        const animDef = ANIMATIONS[this.animation];
        if (!animDef) return;
        
        this._frames = extractAnimationFrames(
            this._compositeSheet, 
            this.direction, 
            animDef.frames, 
            EXPORT_SIZE
        );
        
        this._currentFrameIndex = 0;
        this._startAnimation();
        
        // Setup Drag and Drop
        this._setupDragAndDrop();
    }

    _startAnimation() {
        if (this._animationTimer) {
            clearInterval(this._animationTimer);
        }
        
        if (this._frames.length === 0) return;
        
        this._drawCurrentFrame();
        
        const frameTimeMs = 1000 / ANIMATION_FPS;
        this._animationTimer = setInterval(() => {
            this._currentFrameIndex = (this._currentFrameIndex + 1) % this._frames.length;
            this._drawCurrentFrame();
        }, frameTimeMs);
    }

    _drawCurrentFrame() {
        if (!this.canvas || this._frames.length === 0) return;
        
        const frame = this._frames[this._currentFrameIndex];
        const ctx = this.canvas.getContext("2d");
        
        // Clear and draw
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(frame, 0, 0);
    }

    async _exportGif() {
        if (this._frames.length === 0) return;
        
        const currentToken = Symbol();
        this._cancelToken = currentToken;
        
        this.isExporting = true;
        this.exportProgress = 0;
        
        try {
            const delayMs = Math.round(1000 / ANIMATION_FPS);
            const blob = await encodeGif(this._frames, delayMs, (progress) => {
                if (this._cancelToken === currentToken) {
                    this.exportProgress = progress * 100;
                }
            });
            
            if (this._cancelToken !== currentToken) return;
            
            // Send to Express Document
            await this.addOnUISdk.app.document.addAnimatedImage(blob);
            
        } catch (error) {
            console.error("Failed to export GIF", error);
        } finally {
            if (this._cancelToken === currentToken) {
                this.isExporting = false;
            }
        }
    }
    
    _cancelLoad() {
        this._cancelToken = null;
        this.isLoading = false;
        this.isExporting = false;
    }
    
    _setupDragAndDrop() {
        if (!this.addOnUISdk || this._frames.length === 0) return;
        
        const dragData = {
            previewCallback: (element) => {
                // The element is the preview image that Express will show while dragging
                // We generate a data URL from the first frame
                const dataUrl = this._frames[0].toDataURL("image/png");
                return new URL(dataUrl);
            },
            completionCallback: async (element) => {
                // When dropped, generate the full animated GIF
                const delayMs = Math.round(1000 / ANIMATION_FPS);
                const blob = await encodeGif(this._frames, delayMs, null);
                return [{ blob }];
            }
        };
        
        // Register the element for drag
        this.addOnUISdk.app.enableDragToDocument(this.canvas, dragData);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._animationTimer) {
            clearInterval(this._animationTimer);
        }
    }

    render() {
        return html`
            <div class="preview-container">
                <canvas width="${EXPORT_SIZE}" height="${EXPORT_SIZE}"></canvas>


                <div class="loading-overlay ${this.isLoading || this.isExporting ? "" : "hidden"}">
                    <sp-progress-circle 
                        label="${this.isExporting ? 'Exporting...' : 'Loading...'}" 
                        size="l"
                        ?indeterminate=${!this.isExporting}
                        value=${this.exportProgress}>
                    </sp-progress-circle>
                    <sp-button variant="secondary" size="s" style="margin-top: 16px;" @click=${this._cancelLoad}>
                        Cancel
                    </sp-button>
                </div>
            </div>
            
            <div class="action-row">
                <sp-button variant="accent" @click=${this._exportGif} ?disabled=${this.isLoading || this.isExporting || this._frames.length === 0}>
                    Add to Document
                </sp-button>
            </div>

            <sp-toast ?open=${this.toastOpen} variant="negative" @close=${() => this.toastOpen = false} style="position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 1000; white-space: nowrap; max-width: 90vw; font-size: 12px; padding: 0 12px;">
                ${this.errorMessage}
            </sp-toast>
        `;
    }
}
