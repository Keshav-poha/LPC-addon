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
function tintImage(image, colorHex, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    if (!colorHex) return canvas;

    let r, g, b;
    if (colorHex.startsWith("#")) {
        r = parseInt(colorHex.slice(1, 3), 16);
        g = parseInt(colorHex.slice(3, 5), 16);
        b = parseInt(colorHex.slice(5, 7), 16);
    } else {
        return canvas;
    }

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
            const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            // Base blonde hair has a luminance around 180
            const factor = Math.min(lum / 180, 2.0);
            
            data[i] = Math.min(255, r * factor);
            data[i + 1] = Math.min(255, g * factor);
            data[i + 2] = Math.min(255, b * factor);
        }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
}

export function compositeLayers(layers, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    const sorted = [...layers].sort((a, b) => a.zPos - b.zPos);

    for (const layer of sorted) {
        if (layer.image) {
            if (layer.tint) {
                const tintedCanvas = tintImage(layer.image, layer.tint, width, height);
                ctx.drawImage(tintedCanvas, 0, 0);
            } else {
                ctx.drawImage(layer.image, 0, 0);
            }
        }
    }

    return canvas;
}

export function compositeAnimationLayers(layers) {
    const validLayers = layers.filter((l) => l.image);
    if (validLayers.length === 0) return null;

    const refImg = validLayers[0].image;
    const width = refImg.naturalWidth || refImg.width;
    const height = refImg.naturalHeight || refImg.height;

    return compositeLayers(validLayers, width, height);
}
