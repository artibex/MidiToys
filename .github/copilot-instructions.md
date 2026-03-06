# MidiToys — GitHub Copilot Instructions

## Project Overview

MidiToys is a browser-based MIDI visualizer built with **Astro**, **SolidJS**, **TypeScript**, and **Paper.js**. Users connect MIDI hardware, assign visual "toys" to each of the 16 MIDI channels, and see real-time animations driven by MIDI input. Presets can be saved to Firebase Firestore or exported/imported as JSON.

**Live at:** https://artibex.github.io/MidiToys/  
**License:** GPL-3.0

---

## Tech Stack

| Layer            | Technology                                                  |
| ---------------- | ----------------------------------------------------------- |
| Web framework    | [Astro](https://astro.build/)                               |
| UI components    | [SolidJS](https://www.solidjs.com/) (`@astrojs/solid-js`)   |
| Canvas rendering | [Paper.js](http://paperjs.org/)                             |
| Backend / Auth   | [Firebase](https://firebase.google.com/) (Firestore + Auth) |
| Language         | TypeScript + JavaScript                                     |
| Icons            | `@iconify-icon/solid`                                       |

---

## Directory Structure

```
src/
├── components/          # SolidJS UI components
│   ├── classSpecific/   # Per-toy settings panels (GraviBoardUI, PolyDrumUI, MIDIMatrixUI)
│   ├── ColorSettingsUI.tsx
│   ├── GlobalSettingsUI.tsx
│   ├── KeySettingsUI.tsx
│   ├── PresetUI.tsx
│   ├── SettingsPanel.tsx
│   └── ToyContainer.tsx
├── css/                 # Global styles
├── firebase/
│   ├── client.ts        # Firebase app init, auth, firestore instances
│   └── FirebaseManager.ts  # Singleton: auth methods, preset CRUD
├── js/
│   ├── input/
│   │   ├── InputManager.ts       # Singleton: routes MIDI/keyboard events to channels
│   │   ├── MIDIInputModule.ts    # Web MIDI API integration
│   │   └── KeyboardInputModule.ts
│   ├── miditoy/
│   │   ├── MIDIToy.ts      # Abstract base class for all toys
│   │   ├── ToyManager.ts   # Singleton: manages 16 channel slots, Paper.js layers
│   │   ├── MIDIReceiver.ts # Maps MIDI note ranges to toy slots
│   │   ├── EmptyToy.ts     # Placeholder toy (no visuals)
│   │   ├── GraviBoard.ts   # Gravity-based particle visualizer
│   │   ├── PolyDrum.ts     # Polygon drum pad visualizer
│   │   ├── MIDIMatrix.ts   # Matrix/grid visualizer
│   │   └── SquareKeyboard.ts
│   ├── AnimationCollection.ts
│   ├── CanvasManager.ts    # Paper.js canvas setup and animation loop
│   ├── Interfaces.ts       # Shared interfaces: Vector2D, RGBA
│   ├── MIDIDataTable.ts    # MIDI note number ↔ name lookup table
│   ├── PresetManager.ts    # Local preset save/load (IndexedDB via idb)
│   └── utils.js
└── pages/
    ├── index.astro     # Main app page
    ├── sandbox.astro   # Development sandbox
    └── debug.astro
```

---

## Architecture & Key Patterns

### Singletons

`ToyManager`, `InputManager`, `FirebaseManager`, and `CanvasManager` are all singletons implemented via a static `instance` check in their constructors:

```ts
constructor() {
  if (ClassName.instance) return ClassName.instance;
  ClassName.instance = this;
}
```

### MIDIToy Lifecycle

Every toy extends `MIDIToy` and must implement:

- `SetupKeyboard()` — build the initial Paper.js scene
- `ApplySettings()` — react to setting changes while running
- `UpdateKeyboard()` — called every frame (~60fps)
- `LoadDefaultColors()` / `ApplyColors()` — colour theme support
- `ToJSON()` / `LoadJSON(data)` — preset serialisation

### MIDI Channel Routing

- `InputManager` maintains 16 channel event arrays
- `MIDIReceiver` subscribes to specific channel(s) on behalf of a toy
- `ToyManager.toys[]` is a 16-element array indexed 0–15 (channel = index + 1)

### Paper.js Integration

Each toy creates its own `paper.Layer`. `CanvasManager` runs the unified animation loop and calls `ToyManager.UpdateToys()` each frame.

---

## TypeScript Path Aliases (`tsconfig.json`)

| Alias              | Resolves to                             |
| ------------------ | --------------------------------------- |
| `@miditoy`         | `src/js/miditoy/MIDIToy.ts`             |
| `@miditoy/*`       | `src/js/miditoy/*`                      |
| `@input/*`         | `src/js/input/*`                        |
| `@inputmanager`    | `src/js/input/InputManager.ts`          |
| `@toymanager`      | `src/js/miditoy/ToyManager.ts`          |
| `@canvasmanager`   | `src/js/CanvasManager.ts`               |
| `@presetmanager`   | `src/js/PresetManager.ts`               |
| `@firebaseManager` | `src/firebase/FirebaseManager.ts`       |
| `@firebaseClient`  | `src/firebase/client.ts`                |
| `@components/*`    | `src/components/*`                      |
| `@specificui`      | `src/components/classSpecific/index.ts` |
| `@mididata`        | `src/js/MIDIDataTable.ts`               |
| `@interfaces`      | `src/js/Interfaces.ts`                  |
| `@ui`              | `src/components/UIElements.jsx`         |
| `@utils`           | `src/js/utils.js`                       |
| `@env`             | `env.ts`                                |

---

## Environment Variables

Copy `env.ts.example` to `env.ts`. Firebase config keys are required for auth and Firestore preset storage. Without them the app runs in local-only mode.

---

## Common Commands

```bash
npm start        # Start dev server (astro dev)
npm run build    # Production build (astro build)
npm run check    # Type-check with astro check
npm run format   # Format with Prettier
```

---

## Adding a New Toy

1. Create `src/js/miditoy/MyToy.ts` extending `MIDIToy`
2. Implement all abstract methods
3. Register it in `ToyManager` (`CreateMyToy(channel)` + switch case)
4. Create `src/components/classSpecific/MyToyUI.tsx` for settings
5. Export from `src/components/classSpecific/index.ts`
6. Add the UI conditionally in `SettingsPanel.tsx`

---

## Notes

- The project uses **JSX for SolidJS** (not React), set via `"jsxImportSource": "solid-js"` in tsconfig.
- `@types/paper` is a stub — Paper.js ships its own types; prefer importing from `'paper'` directly.
- The `firebase-auth` npm package (`^0.1.2`) is a legacy wrapper — Firebase auth is accessed via `'firebase/auth'` from the main `firebase` package.
- Keyboard input maps keys `W E T Z U / A S D F G H J K` to note triggers on channel 1.
