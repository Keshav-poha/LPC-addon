import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/accordion/sp-accordion.js";
import "@spectrum-web-components/accordion/sp-accordion-item.js";
import "@spectrum-web-components/picker/sp-picker.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/menu/sp-menu-group.js";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { style } from "./App.css.js";


import { CATEGORIES, getAnimationFolder } from "../../data/sheet-definitions";

import "./AnimationPreview.js";
import "./CharacterBuilder.js";
import "./CreditsManager.js";

@customElement("add-on-app")
export class App extends LitElement {
    @property({ type: Object }) addOnUISdk;

    @state() _sandboxProxy;
    
    @state() _characterState = {
        bodyType: "male",
        head: { ears: "none", nose: "none", eyes: "none" },
        hair: "none",
        hairColor: "blonde",
        headwear: "none",
        torso: "none",
        legs: "none",
        feet: "none",
        arms: "none",
        weapons: "none",
        tools: "none"
    };

    @state() _animation = "walk";
    @state() _direction = "down";
    @state() _loadedPaths = [];

    static get styles() {
        return style;
    }

    async firstUpdated() {
        try {
            // Get the UI runtime.
            const { runtime } = this.addOnUISdk.instance;
            this._sandboxProxy = await runtime.apiProxy("documentSandbox");
            console.log("Document Sandbox Proxy initialized successfully.");
        } catch (error) {
            console.error("Failed to initialize Document Sandbox Proxy:", error);
        }
    }

    _validateState(newState, newAnimation) {
        let validatedState = { ...newState };
        let validatedAnimation = newAnimation;

        // 1. Validate Animation: is the current animation supported by the current bodyType?
        const bodyCategory = CATEGORIES.find(c => c.id === "body");
        let mappedAnim = getAnimationFolder(validatedAnimation);
        
        if (bodyCategory.getPath(validatedState.bodyType, mappedAnim) === null) {
            // Fallback to "walk" which is supported by everything
            validatedAnimation = "walk";
            mappedAnim = getAnimationFolder("walk");
        }

        // 2. Validate all equipped items: are they supported by the (possibly updated) bodyType and animation?
        for (const cat of CATEGORIES) {
            if (cat.id === "body") continue;

            if (cat.subcategories) {
                for (const sub of cat.subcategories) {
                    const selectedItemId = validatedState[cat.id]?.[sub.id];
                    if (selectedItemId && selectedItemId !== "none") {
                        const item = sub.items.find(i => i.id === selectedItemId);
                        if (item && item.getPath && item.getPath(validatedState.bodyType, mappedAnim) === null) {
                            validatedState[cat.id] = { ...validatedState[cat.id], [sub.id]: "none" };
                        }
                    }
                }
            } else {
                const selectedItemId = validatedState[cat.id];
                if (selectedItemId && selectedItemId !== "none") {
                    const item = cat.items.find(i => i.id === selectedItemId);
                    if (item && item.getPath && item.getPath(validatedState.bodyType, mappedAnim) === null) {
                        validatedState[cat.id] = "none";
                    }
                }
            }
        }

        return { validatedState, validatedAnimation };
    }

    _handleStateChange(e) {
        const { category, value } = e.detail;
        let newState;
        if (category.includes('.')) {
            const [cat, sub] = category.split('.');
            newState = {
                ...this._characterState,
                [cat]: { ...this._characterState[cat], [sub]: value }
            };
        } else {
            newState = { ...this._characterState, [category]: value };
        }
        
        const { validatedState, validatedAnimation } = this._validateState(newState, this._animation);
        this._characterState = validatedState;
        this._animation = validatedAnimation;
    }

    _handleAnimationChange(e) {
        const { validatedState, validatedAnimation } = this._validateState(this._characterState, e.detail.value);
        this._characterState = validatedState;
        this._animation = validatedAnimation;
    }

    _handleDirectionChange(e) {
        this._direction = e.detail.value;
    }

    _handleSpritesLoaded(e) {
        this._loadedPaths = e.detail.paths;
    }

    _handleAddCreditsToDocument(e) {
        if (this._sandboxProxy && this._sandboxProxy.addCreditsText) {
            this._sandboxProxy.addCreditsText(e.detail.text);
        } else {
            console.warn("Sandbox proxy or addCreditsText not available");
        }
    }

    render() {
        // You may use "this.addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        return html`
            <sp-theme system="express" color="light" scale="medium">
                <div class="container">
                    <div class="body">
                        <animation-preview
                            .addOnUISdk=${this.addOnUISdk}
                            .characterState=${this._characterState}
                            .animation=${this._animation}
                            .direction=${this._direction}
                            @sprites-loaded=${this._handleSpritesLoaded}
                        ></animation-preview>

                        <character-builder
                            .characterState=${this._characterState}
                            .animation=${this._animation}
                            .direction=${this._direction}
                            @state-change=${this._handleStateChange}
                            @animation-change=${this._handleAnimationChange}
                            @direction-change=${this._handleDirectionChange}
                        ></character-builder>
                    </div>

                    <div class="footer">
                        <credits-manager
                            .loadedPaths=${this._loadedPaths}
                            @add-credits-to-document=${this._handleAddCreditsToDocument}
                        ></credits-manager>
                    </div>
                </div>
            </sp-theme>
        `;
    }
}
