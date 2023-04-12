// import { InputManager } from "./input/InputManager";
// import { MIDIDataTable } from "../MIDIDataTable";
// import { MIDIReceiver } from "../MIDIReceiver";

// export class NoteSquare extends MIDIReceiver {
//     htmlCanvas: HTMLCanvasElement; //Obsolete, do not use
//     inputManager: InputManager;

//     targetSize = 100;
//     calculatedSize = this.targetSize;
//     lastTargetIndex = -1;

//     triggerColor = 255;
//     calculatedColor = this.triggerColor;

//     triggerAlpha = 1;
//     calculatedAlpha = this.triggerAlpha;


//     constructor(inputManager: InputManager, targetChannel: number, targetNote: string, htmlCanvas: HTMLCanvasElement) {
//         super(targetChannel, targetNote);
//         this.htmlCanvas = htmlCanvas;
//         this.inputManager = inputManager;
//         //this.targetRegExp = MIDIDataTable.MIDIStringNoteToRegExp(targetNote);
//     }

//     // GetMIDIInput() {
//     //     const keys = this.inputManager.getHoldingKeys(this.targetChannel) as string[];
//     //     const velocity = this.inputManager.getVelocity(this.targetChannel) as number[];
//     //     const targetIndex = keys.findIndex((element) => element.match(this.targetRegExp));

//     //     if (targetIndex !== -1) {
//     //         this.UpdateElement(true, velocity[targetIndex]);
//     //     } else {
//     //         this.UpdateElement(false, 0);
//     //     }

//     //     this.lastTargetIndex = targetIndex;
//     // }

//     UpdateElement(on: boolean, velocity: number) {
//         const canWidth = this.htmlCanvas.width;
//         const canHeight = this.htmlCanvas.height;
//         const ctx = this.canvasContext;

//         ctx.clearRect(0, 0, canWidth, canHeight);
//         this.calculatedColor *= on ? 1 : 0.95;
//         this.calculatedAlpha *= on ? 1 : 0.95;

//         if (on) {
//             this.calculatedColor = this.triggerColor;
//             this.calculatedAlpha = this.triggerAlpha;

//             if (this.calculatedSize < canHeight / 4 + velocity * 4) {
//                 this.calculatedSize += (canHeight / 4 + velocity * 4) * 0.2;
//             }

//             ctx.fillStyle = `rgba(${this.calculatedColor}, 0, 0, ${this.calculatedAlpha})`;
//             ctx.fillRect(0, canHeight, canWidth, -this.calculatedSize);
//             ctx.strokeRect(0, canHeight, canWidth, -this.calculatedSize);

//             ctx.fillStyle = "white";
//             ctx.font = "100px Arial";
//             ctx.fillText(this.targetNote.toUpperCase(), canWidth / 4, canHeight - 10);
//         } else {
//             if (this.calculatedSize > this.targetSize) {
//                 this.calculatedSize *= 0.95;
//             }

//             ctx.fillStyle = `rgba(${this.calculatedColor}, 0, 0, ${this.calculatedAlpha})`;
//             ctx.strokeStyle = "white";
//             ctx.lineWidth = 5;
//             ctx.fillRect(0, canHeight, canWidth, -this.calculatedSize);
//             ctx.strokeRect(0, canHeight, canWidth, -this.calculatedSize);

//             ctx.fillStyle = `rgba(${this.calculatedColor * 2}, 0, 0, ${this.calculatedAlpha})`;
//             ctx.font = "100px Arial";
//             ctx.fillText(this.targetNote.toUpperCase(), canWidth / 4, canHeight - 10);
//         }
//     }
// }