import { css } from 'lit';

export const style = css`
:host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 100%;
    background-color: var(--spectrum-global-color-gray-100);
    box-sizing: border-box;
    overflow: hidden;
}

.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.header {
    padding: 8px 12px;
    border-bottom: 1px solid var(--spectrum-global-color-gray-300);
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: var(--spectrum-global-color-gray-50);
}

.header h2 {
    margin: 0;
    font-size: var(--spectrum-global-dimension-font-size-100);
    color: var(--spectrum-global-color-gray-900);
}

.body {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer {
    padding: 12px;
    border-top: 1px solid var(--spectrum-global-color-gray-300);
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--spectrum-global-color-gray-50);
}

/* Character Builder specific styles */

.section-title {
    font-size: var(--spectrum-global-dimension-font-size-100);
    font-weight: 700;
    color: var(--spectrum-global-color-gray-800);
    margin: 0 0 8px 0;
}

.color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));
    gap: 8px;
    margin-bottom: 16px;
}

.color-swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: transform 0.1s ease;
}

.color-swatch:hover {
    transform: scale(1.1);
}

.color-swatch.selected {
    border-color: var(--spectrum-global-color-blue-500);
    box-shadow: 0 0 0 2px var(--spectrum-global-color-blue-200);
}

.item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    gap: 6px;
}

.item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
    border: 1px solid var(--spectrum-global-color-gray-300);
    border-radius: 3px;
    cursor: pointer;
    background-color: var(--spectrum-global-color-gray-50);
    transition: all 0.2s ease;
}

.item-card:hover {
    background-color: var(--spectrum-global-color-gray-100);
    border-color: var(--spectrum-global-color-gray-400);
}

.item-card.selected {
    border-color: var(--spectrum-global-color-blue-500);
    background-color: var(--spectrum-global-color-blue-100);
}

.item-card span {
    font-size: 10px;
    text-align: center;
    margin-top: 2px;
    color: var(--spectrum-global-color-gray-800);
    word-break: break-word;
}

.item-thumbnail {
    width: 32px;
    height: 32px;
    object-fit: contain;
    image-rendering: pixelated;
}

/* Animation Preview */

.top-layout {
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-bottom: 10px;
}

.preview-container {
    background-color: var(--spectrum-global-color-gray-200);
    border-radius: 4px;
    border: 1px solid var(--spectrum-global-color-gray-400);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 140px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
    background-image: 
        linear-gradient(45deg, var(--spectrum-global-color-gray-300) 25%, transparent 25%), 
        linear-gradient(-45deg, var(--spectrum-global-color-gray-300) 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, var(--spectrum-global-color-gray-300) 75%), 
        linear-gradient(-45deg, transparent 75%, var(--spectrum-global-color-gray-300) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.side-controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
}

canvas.preview-canvas {
    image-rendering: pixelated; /* Crisp pixels */
    max-width: 100%;
    max-height: 100%;
}

.controls-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
}

.direction-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 3px;
    width: 60px;
    height: 60px;
    margin: 0 auto;
}

.dir-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--spectrum-global-color-gray-100);
    border: 1px solid var(--spectrum-global-color-gray-300);
    border-radius: 4px;
    cursor: pointer;
    color: var(--spectrum-global-color-gray-800);
    font-size: 11px;
}

.dir-btn:hover {
    background-color: var(--spectrum-global-color-gray-200);
}

.dir-btn.selected {
    background-color: var(--spectrum-global-color-blue-500);
    color: white;
    border-color: var(--spectrum-global-color-blue-600);
}

.dir-up { grid-column: 2; grid-row: 1; }
.dir-left { grid-column: 1; grid-row: 2; }
.dir-down { grid-column: 2; grid-row: 3; }
.dir-right { grid-column: 3; grid-row: 2; }

/* Credits */

.credits-panel {
    background-color: var(--spectrum-global-color-gray-100);
    border: 1px solid var(--spectrum-global-color-gray-300);
    border-radius: 4px;
    padding: 8px;
    font-size: 10px;
    max-height: 150px;
    overflow-y: auto;
}

.credits-panel h4 {
    margin: 0 0 4px 0;
    font-size: 11px;
    color: var(--spectrum-global-color-gray-900);
}

.credits-list {
    margin: 0 0 8px 0;
    padding-left: 12px;
    color: var(--spectrum-global-color-gray-800);
}

/* Loading Overlay */
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.hidden {
    display: none !important;
}
`;
