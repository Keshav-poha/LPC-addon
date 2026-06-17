import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { aggregateCredits, formatCreditsText } from "../../data/credits-data";

@customElement("credits-manager")
export class CreditsManager extends LitElement {
    @property({ type: Array }) loadedPaths = [];

    @state() _credits = { authors: [], licenses: [], urls: [] };

    createRenderRoot() {
        return this; // Use light DOM to share styles
    }

    updated(changedProperties) {
        if (changedProperties.has("loadedPaths")) {
            this._credits = aggregateCredits(this.loadedPaths);
        }
    }

    async _copyCredits() {
        const text = formatCreditsText(this._credits);
        try {
            await navigator.clipboard.writeText(text);
            // Could show a toast/tooltip here if desired
            console.log("Credits copied to clipboard");
        } catch (err) {
            console.error("Failed to copy credits", err);
        }
    }

    _addCreditsToDocument() {
        if (!this._credits.authors.length) return;
        
        let text = "LPC Asset Credits: ";
        text += "Authors: " + this._credits.authors.join(", ") + ". ";
        text += "Licenses: " + this._credits.licenses.join(", ") + ".";
        
        this.dispatchEvent(new CustomEvent("add-credits-to-document", {
            detail: { text }
        }));
    }

    render() {
        if (!this._credits.authors.length) return html``;

        return html`
            <div class="credits-panel">
                <h4>LPC Assets Attribution</h4>
                <p>This character uses art by:</p>
                <ul class="credits-list">
                    ${this._credits.authors.map(a => html`<li>${a}</li>`)}
                </ul>
                <p>Licenses:</p>
                <ul class="credits-list">
                    ${this._credits.licenses.map(l => html`<li>${l}</li>`)}
                </ul>
                <sp-button variant="secondary" size="s" @click=${this._copyCredits} style="width: 100%; margin-bottom: 8px;">
                    Copy Credits
                </sp-button>
                <sp-button variant="primary" size="s" @click=${this._addCreditsToDocument} style="width: 100%;">
                    Add Credits to Document
                </sp-button>
            </div>
        `;
    }
}
