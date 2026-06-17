/**
 * LPC Spritesheet Animation Map
 *
 * Standard LPC spritesheets use 64×64 pixel cells.
 * Each animation occupies 4 rows (one per direction: up, left, down, right).
 * Individual animation PNGs are stored per-animation, with 4 rows each.
 *
 * The sprites are loaded per-animation (e.g., walk.png, slash.png),
 * so row indices here are relative to each animation's PNG file.
 *
 * Direction order within each animation PNG (rows 0-3):
 *   0 = Up, 1 = Left, 2 = Down, 3 = Right
 */

export const SPRITE_SIZE = 64;
export const EXPORT_SIZE = 512;
export const ANIMATION_FPS = 8;

/** Direction name → row offset within an animation PNG */
export const DIRECTIONS = {
    up: 0,
    left: 1,
    down: 2,
    right: 3,
};

export const DIRECTION_LABELS = {
    up: "↑ Up",
    left: "← Left",
    down: "↓ Down",
    right: "→ Right",
};

/**
 * Animation definitions.
 * Each animation has:
 *   - label: Display name
 *   - frames: Number of frames per direction row
 *   - category: Group for UI organization
 */
export const ANIMATIONS = {
    idle: {
        label: "Idle",
        frames: 2,
        category: "basic",
    },
    walk: {
        label: "Walk",
        frames: 9,
        category: "basic",
    },
    run: {
        label: "Run",
        frames: 8,
        category: "basic",
    },
    jump: {
        label: "Jump",
        frames: 6,
        category: "basic",
    },
    sit: {
        label: "Sit",
        frames: 3,
        category: "basic",
    },
    emote: {
        label: "Emote",
        frames: 3,
        category: "basic",
    },
    climb: {
        label: "Climb",
        frames: 6,
        category: "basic",
    },
    spellcast: {
        label: "Spellcast",
        frames: 7,
        category: "combat",
    },
    thrust: {
        label: "Thrust",
        frames: 8,
        category: "combat",
    },
    slash: {
        label: "Slash",
        frames: 6,
        category: "combat",
    },
    shoot: {
        label: "Shoot",
        frames: 13,
        category: "combat",
    },
    hurt: {
        label: "Hurt",
        frames: 6,
        category: "combat",
    },
    combat: {
        label: "Combat Idle",
        frames: 2,
        category: "combat",
    },
    "1h_slash": {
        label: "1H Slash",
        frames: 6,
        category: "combat",
    },
    "1h_backslash": {
        label: "1H Backslash",
        frames: 6,
        category: "combat",
    },
    "1h_halfslash": {
        label: "1H Halfslash",
        frames: 6,
        category: "combat",
    },
    watering: {
        label: "Watering",
        frames: 5,
        category: "tool",
    },
};

/** Grouped animations for the picker UI */
export const ANIMATION_GROUPS = {
    basic: {
        label: "Movement",
        animations: ["idle", "walk", "run", "jump", "sit", "emote", "climb"],
    },
    combat: {
        label: "Combat",
        animations: [
            "spellcast",
            "thrust",
            "slash",
            "shoot",
            "hurt",
            "combat",
            "1h_slash",
            "1h_backslash",
            "1h_halfslash",
        ],
    },
    tool: {
        label: "Tools",
        animations: ["watering"],
    },
};
