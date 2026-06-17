import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CATEGORIES, BODY_TYPES } from "../../data/sheet-definitions";
import { ANIMATION_GROUPS, DIRECTION_LABELS } from "../../data/animation-map";

@customElement("character-builder")
export class CharacterBuilder extends LitElement {
    @property({ type: Object }) characterState = {};
    @property({ type: String }) animation = "walk";
    @property({ type: String }) direction = "down";

    createRenderRoot() {
        return this; // use light DOM so we can use styles from App.css.js easily
    }

    _handleBodyTypeChange(e) {
        this.dispatchEvent(new CustomEvent("state-change", {
            detail: { category: "bodyType", value: e.target.value }
        }));
    }

    _handleCategoryChange(category, value) {
        this.dispatchEvent(new CustomEvent("state-change", {
            detail: { category, value }
        }));
    }

    _handleAnimationChange(e) {
        this.dispatchEvent(new CustomEvent("animation-change", {
            detail: { value: e.target.value }
        }));
    }

    _handleDirectionChange(dir) {
        this.dispatchEvent(new CustomEvent("direction-change", {
            detail: { value: dir }
        }));
    }

    render() {
        return html`
            <div class="controls-row">
                <sp-picker label="Animation" value=${this.animation} @change=${this._handleAnimationChange} style="width: 100%;">
                    ${Object.entries(ANIMATION_GROUPS).map(([groupId, group]) => html`
                        <sp-menu-group>
                            <span slot="header">${group.label}</span>
                            ${group.animations.map(anim => html`
                                <sp-menu-item value=${anim}>${anim}</sp-menu-item>
                            `)}
                        </sp-menu-group>
                    `)}
                </sp-picker>

                <div class="direction-controls">
                    ${Object.keys(DIRECTION_LABELS).map(dir => html`
                        <div class="dir-btn dir-${dir} ${this.direction === dir ? 'selected' : ''}" 
                             @click=${() => this._handleDirectionChange(dir)}
                             title=${DIRECTION_LABELS[dir]}>
                             ${dir === 'up' ? '↑' : dir === 'down' ? '↓' : dir === 'left' ? '←' : '→'}
                        </div>
                    `)}
                </div>
            </div>

            <sp-accordion>
                <!-- Body Type -->
                <sp-accordion-item label="Body Type" open>
                    <sp-picker label="Select Body Type" value=${this.characterState.bodyType} @change=${this._handleBodyTypeChange} style="width: 100%;">
                        ${BODY_TYPES.map(bt => html`<sp-menu-item value=${bt.id}>${bt.label}</sp-menu-item>`)}
                    </sp-picker>
                </sp-accordion-item>

                <!-- Other Categories -->
                ${CATEGORIES.filter(c => c.id !== "body").map(cat => html`
                    <sp-accordion-item label=${cat.label}>
                        ${cat.subcategories ? 
                            cat.subcategories.map(sub => this._renderItemGrid(cat.id, sub.items, sub.id, sub.label)) :
                            this._renderItemGrid(cat.id, cat.items)
                        }
                    </sp-accordion-item>
                `)}
            </sp-accordion>
        `;
    }

    _renderItemGrid(catId, items, subcatId = null, label = null) {
        const selectedId = subcatId ? this.characterState[catId]?.[subcatId] : this.characterState[catId];
        
        return html`
            ${label ? html`<div class="section-title">${label}</div>` : ''}
            <div class="item-grid">
                ${items.map(item => html`
                    <div class="item-card ${selectedId === item.id ? 'selected' : ''}" 
                         @click=${() => this._handleCategoryChange(subcatId ? `${catId}.${subcatId}` : catId, item.id)}>
                        <span>${item.label}</span>
                    </div>
                `)}
            </div>
        `;
    }
}
