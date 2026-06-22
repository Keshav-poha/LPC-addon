/**
 * Sprite Loader
 *
 * Fetches sprite PNGs from the GitHub CDN and caches them in memory.
 * Uses an LRU cache with configurable limit to manage memory.
 */

import { getSpriteUrl } from "../data/sheet-definitions";

const MAX_CACHE_SIZE = 200;

class SpriteCache {
    constructor(maxSize = MAX_CACHE_SIZE) {
        this._cache = new Map();
        this._maxSize = maxSize;
    }

    get(key) {
        if (!this._cache.has(key)) return null;
        // Move to end (most recently used)
        const val = this._cache.get(key);
        this._cache.delete(key);
        this._cache.set(key, val);
        return val;
    }

    set(key, value) {
        if (this._cache.has(key)) {
            this._cache.delete(key);
        } else if (this._cache.size >= this._maxSize) {
            // Evict oldest (first) entry
            const firstKey = this._cache.keys().next().value;
            this._cache.delete(firstKey);
        }
        this._cache.set(key, value);
    }

    has(key) {
        return this._cache.has(key);
    }

    clear() {
        this._cache.clear();
    }
}

const cache = new SpriteCache();
const pendingLoads = new Map();

/**
 * Load a sprite image from the CDN.
 * Returns a Promise that resolves to an HTMLImageElement.
 * Results are cached in an LRU cache.
 *
 * @param {string} relativePath - Path relative to the spritesheets folder
 * @returns {Promise<HTMLImageElement|null>}
 */
export async function loadSprite(relativePath) {
    if (!relativePath) return null;

    // Check cache
    const cached = cache.get(relativePath);
    if (cached) return cached;

    // Check if already loading
    if (pendingLoads.has(relativePath)) {
        return pendingLoads.get(relativePath);
    }

    const loadPromise = new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            cache.set(relativePath, img);
            pendingLoads.delete(relativePath);
            resolve(img);
        };
        img.onerror = () => {
            console.warn(`Failed to load sprite: ${relativePath}`);
            pendingLoads.delete(relativePath);
            reject(new Error(`Failed to load sprite: ${relativePath}`));
        };
        img.src = getSpriteUrl(relativePath);
    });

    pendingLoads.set(relativePath, loadPromise);
    return loadPromise;
}

/**
 * Load multiple sprites in parallel.
 * Returns an array of HTMLImageElements (null for failed loads).
 *
 * @param {string[]} paths
 * @returns {Promise<(HTMLImageElement|null)[]>}
 */
export async function loadSprites(paths) {
    return Promise.all(paths.map((p) => loadSprite(p)));
}

/**
 * Preload the body sprite for a given body type and animation.
 * This ensures the core sprite is cached before the user interacts.
 */
export async function preloadBody(bodyType, animation) {
    const path = `body/bodies/${bodyType}/${animation}.png`;
    return loadSprite(path);
}

/**
 * Clear the entire sprite cache
 */
export function clearCache() {
    cache.clear();
}
