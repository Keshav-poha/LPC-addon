# Animated Sprites for Adobe Express

A premium, state-of-the-art Adobe Express Web Add-on designed to create, customize, animate, and export Liberated Pixel Cup (LPC) style characters. 

Animated Sprites compiles pixel art sprite sheets on-demand, composites them in real-time, animates them, and enables direct drag-and-drop or insertion of high-quality animated GIFs directly onto your Adobe Express design canvas.

---

## ✨ Features

- **Dynamic Character Builder**: Customize body types (Male, Female, Muscular, Pregnant, Teen, Child), hairstyles (30+ variations), eyes, noses, ears, apparel (torso, legs, footwear, headwear, armor), and equip weapons (swords, daggers, bows) or tools (axes, hoes).
- **Real-Time Animation Canvas**: View character animations (Walking, Running, Slashing, Spellcasting, Bow shooting, etc.) instantly across all four cardinal directions.
- **High-Fidelity Rendering**: Sprites are rendered at 512×512 using crisp, nearest-neighbor canvas interpolation to preserve pixel-art aesthetics.
- **Animated GIF Export & Drag-and-Drop**: Export animations directly to your document. Simply drag the canvas or click "Add to Document" to place the animated character into Adobe Express.
- **License Compliance & Credits Manager**: Automatically tracks and aggregates attribution details (authors, OGA links, licenses) for every active layer on your character. Click "Add Credits to Document" to insert required legal attributions directly onto your canvas.

---

## 🛠️ Technology Stack

1. **Core UI**: [Lit](https://lit.dev/) (v2.8) for reactive, component-based rendering.
2. **Styling**: Vanilla CSS with [Adobe Spectrum Web Components (SWC)](https://opensource.adobe.com/spectrum-web-components/) for seamless visual integration with the Adobe Express dark/light host themes.
3. **Compositing**: Canvas 2D context layered rendering with asynchronous image preloading.
4. **GIF Generator**: [gif.js](https://github.com/jnordberg/gif.js) for client-side GIF encoding.
5. **Runtime Architecture**: Adobe Express Dual-Runtime:
   - **UI Iframe**: Handles user interaction, customizer UI, canvas rendering, and GIF compilation.
   - **Document Sandbox**: Runs in a privileged context with direct access to the `express-document-sdk` to manipulate the document scenegraph (e.g., adding text credits, inserting image shapes).

---

## 📂 Project Structure

```
├── src/
│   ├── data/
│   │   ├── animation-map.js       # Slicing and coordinate definitions for LPC animations
│   │   ├── credits-data.js        # Credits mapping & helper functions for licensing
│   │   └── sheet-definitions.js   # Paths & mappings for all sprite assets
│   ├── engine/
│   │   ├── frame-extractor.js     # Extracts individual frames from spritesheets
│   │   ├── sprite-compositor.js   # Layer compositing logic
│   │   └── sprite-loader.js       # Asynchronous sprite preloader with LRU caching
│   ├── sandbox/
│   │   ├── code.js                # Document Sandbox runtime (adds credits/shapes to document)
│   │   └── tsconfig.json          # TypeScript config for Document Sandbox typings
│   ├── ui/
│   │   ├── components/
│   │   │   ├── AnimationPreview.js# Canvas rendering and playback controls
│   │   │   ├── App.js             # Main application orchestrator
│   │   │   ├── CharacterBuilder.js# Collapsible Spectrum-styled customizer panel
│   │   │   ├── CreditsManager.js  # Live licensing / credits UI panel
│   │   │   └── App.css.js         # Panel layout styling
│   │   ├── index.js               # Webpack UI entry point
│   │   └── styles.css             # Global and typography styles
│   ├── index.html                 # UI iframe HTML template
│   └── manifest.json              # Add-on configuration and permissions manifest
├── .babelrc                       # Babel compiler configuration
├── LICENSE                        # Licensing disclosures and attributions
├── package.json                   # Project scripts and dependencies
├── webpack.config.js              # Webpack compilation configuration
└── tsconfig.json                  # Root TypeScript configuration
```

---

## 🚀 Setup & Local Development

### Prerequisites

- Node.js (v18 or higher recommended)
- Adobe Express account (with developer mode enabled)

### Installation

1. Clone this repository and navigate to the project directory:
   ```bash
   cd LPC-addon
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Add-on Locally

1. Start the local development server:
   ```bash
   npm run start
   ```
   This compiles the project and hosts it locally (typically at `https://localhost:5200` or similar).

2. Open Adobe Express in your browser: [https://new.express.adobe.com/](https://new.express.adobe.com/).

3. Open or create any design document.

4. In the left panel, click **Add-ons** > **In Development**. You should see **Animated Sprites** listed there. Click on it to run the local add-on panel.

---

## 🏗️ Production Build

To compile a optimized production bundle of the add-on:
```bash
npm run build
```
The compiled files will be located in the `dist/` directory, ready to be packaged via `npm run package` for submission.

---

## ⚖️ Licensing & Attribution

- **Source Code**: The application code is licensed under the **GNU General Public License, Version 3 (GPLv3)**. See [LICENSE](LICENSE) for details.
- **Artwork Assets**: The sprite assets are fetched dynamically from the Universal LPC Spritesheet Character Generator repository. The art assets themselves are created by various community artists under copyleft licenses (CC-BY-SA 3.0, GPLv3, and OGA-BY 3.0). 
  - The embedded **Credits Manager** automatically identifies all authors and licenses for the active character design. Users are required to credit these authors when using the generated graphics.

---

## 🎨 LPC Sprite Assets Credits & Attributions

The sprite assets loaded dynamically by this add-on are created by the community of artists from the **Liberated Pixel Cup (LPC)**. We owe immense gratitude to the creators who open-sourced their designs.

Key contributors and base designers include:
- **bluecarrot16** (Massive spritesheet compilation, clothing, weapons, and accessories)
- **Johannes Sjölund (wulax)** (Original female base, hair, clothing, and weapons)
- **Stephen Challener (Redshrike)** (Original male base concepts and design)
- **Eliza Wyatt (ElizaWy)** (Base bodies, movement animations, and clothing variants)
- **Benjamin K. Smith (BenCreating)** (Weapon and clothing spritesheets)
- **Lanea Zimmerman (Sharm)** (Original base graphics, textures, and style guide concepts)
- **Daniel Eddeland (daneeklu)** (Original clothing, armor overlays, and hairstyles)
- **JaidynReiman** (Thick male body bases and animation sets)
- **makrohn** (Console conversions, sprite assembly, and repository organization)

All dynamically fetched art is subject to copyleft permissions. Anyone using the exported characters in their designs must attribute the original artists. The add-on provides an **Add Credits to Document** button to place these attributions directly onto your canvas automatically.

For the full list of authors, licenses, and raw source links, refer to the [LICENSE](LICENSE) file or inspect the built-in Credits Manager in the add-on panel.
