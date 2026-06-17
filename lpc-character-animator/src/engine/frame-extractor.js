/**
 * Frame Extractor
 *
 * Extracts individual frames from a composited spritesheet.
 * Scales frames to the export size (e.g. 512x512) using nearest-neighbor interpolation.
 */

import { SPRITE_SIZE, EXPORT_SIZE, DIRECTIONS } from "../data/animation-map";

/**
 * Extract a single frame from a spritesheet.
 * 
 * @param {HTMLCanvasElement|HTMLImageElement} sheet - The source spritesheet
 * @param {number} col - The column index (frame index)
 * @param {number} row - The row index (direction)
 * @param {number} exportSize - The target size for the extracted frame (default: EXPORT_SIZE)
 * @returns {HTMLCanvasElement} - A canvas containing the extracted and scaled frame
 */
export function extractFrame(sheet, col, row, exportSize = EXPORT_SIZE) {
    const frameCanvas = document.createElement("canvas");
    frameCanvas.width = exportSize;
    frameCanvas.height = exportSize;
    const ctx = frameCanvas.getContext("2d");

    // Important for pixel art: disable smoothing to use nearest-neighbor scaling
    ctx.imageSmoothingEnabled = false;

    // Source coordinates
    const sx = col * SPRITE_SIZE;
    const sy = row * SPRITE_SIZE;

    // Draw and scale from SPRITE_SIZE to exportSize
    ctx.drawImage(
        sheet,
        sx, sy, SPRITE_SIZE, SPRITE_SIZE, // Source
        0, 0, exportSize, exportSize      // Destination
    );

    return frameCanvas;
}

/**
 * Extract all frames for a given animation and direction.
 * 
 * @param {HTMLCanvasElement|HTMLImageElement} sheet - The source spritesheet (composite for this animation)
 * @param {string} direction - "up", "left", "down", "right"
 * @param {number} frameCount - Total number of frames in the sequence
 * @param {number} exportSize - Target size
 * @returns {HTMLCanvasElement[]} - Array of canvases, one per frame
 */
export function extractAnimationFrames(sheet, direction, frameCount, exportSize = EXPORT_SIZE) {
    const frames = [];
    let row = DIRECTIONS[direction];

    if (row === undefined) {
        console.error(`Invalid direction: ${direction}`);
        return frames;
    }

    // Force row 0 if the spritesheet contains only a single animation row
    if (sheet && sheet.height === SPRITE_SIZE) {
        row = 0;
    }

    for (let col = 0; col < frameCount; col++) {
        frames.push(extractFrame(sheet, col, row, exportSize));
    }

    return frames;
}
