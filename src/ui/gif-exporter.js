import GIF from 'gif.js';

/**
 * Encode an array of canvas frames into an animated GIF blob.
 * 
 * @param {HTMLCanvasElement[]} frames - Array of canvas frames
 * @param {number} delayMs - Delay between frames in milliseconds
 * @param {Function} onProgress - Callback for encoding progress (0.0 to 1.0)
 * @returns {Promise<Blob>} Resolves with the GIF Blob
 */
export async function encodeGif(frames, delayMs, onProgress) {
    return new Promise((resolve, reject) => {
        if (!frames || frames.length === 0) {
            reject(new Error("No frames provided for GIF encoding"));
            return;
        }

        // We use a relatively high quality setting. The worker script needs to be accessible.
        // In a webpack setup, usually you need to copy gif.worker.js to the output directory.
        // We'll assume it's available at the root or we can pass a relative path if copied.
        const gif = new GIF({
            workers: 2,
            quality: 10,
            width: frames[0].width,
            height: frames[0].height,
            workerScript: './gif.worker.js', // We will need to make sure this file is copied to dist
            transparent: "rgba(0,0,0,0)" // Support transparency
        });

        for (const frame of frames) {
            gif.addFrame(frame, { delay: delayMs, copy: true });
        }

        gif.on('progress', (p) => {
            if (onProgress) onProgress(p);
        });

        gif.on('finished', (blob) => {
            resolve(blob);
        });

        gif.render();
    });
}
