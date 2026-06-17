/**
 * Sprite Compositor
 *
 * Composites multiple sprite layers onto a single offscreen canvas.
 * Layers are drawn in z-order (lowest first = behind, highest = on top).
 */

/**
 * Composite multiple sprite images into a single canvas.
 *
 * @param {Array<{image: HTMLImageElement, zPos: number}>} layers
 *   Sorted by zPos ascending (back to front). Each layer has the loaded sprite image.
 * @param {number} width - Width of the composite canvas (in source pixels)
 * @param {number} height - Height of the composite canvas (in source pixels)
 * @returns {HTMLCanvasElement} The composited result
 */
export function compositeLayers(layers, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Clear with transparent background
    ctx.clearRect(0, 0, width, height);

    // Sort by zPos ascending (back to front)
    const sorted = [...layers].sort((a, b) => a.zPos - b.zPos);

    for (const layer of sorted) {
        if (layer.image) {
            ctx.drawImage(layer.image, 0, 0);
        }
    }

    return canvas;
}

/**
 * Composite layers for a specific animation and direction.
 * Each layer image is a per-animation PNG (e.g., walk.png) containing 4 directional rows.
 * The result is a composite of all layers for that single animation.
 *
 * @param {Array<{image: HTMLImageElement, zPos: number}>} layers
 * @returns {HTMLCanvasElement|null}
 */
export function compositeAnimationLayers(layers) {
    const validLayers = layers.filter((l) => l.image);
    if (validLayers.length === 0) return null;

    // Use the first valid layer to determine dimensions
    const refImg = validLayers[0].image;
    const width = refImg.naturalWidth || refImg.width;
    const height = refImg.naturalHeight || refImg.height;

    return compositeLayers(validLayers, width, height);
}
