import { MIDIDataTable } from "@mididata";
import { InputManager } from "@inputmanager";
import { MIDIToy } from "@miditoy";
import * as paper from 'paper';

export class MIDIMatrix extends MIDIToy {
    gridCells: paper.Path[][];
    rows: number = 12;
    colums: number;
    strokeWidth: number = 5;
    polySides: number = 4;

    cellHeightScale: number = 0.5;
    cellWidthScale: number = 0.7;

    constructor(targetChannel: number) {
        super("MIDI Matrix", targetChannel, 10, 12, true);
        this.gridCells = [];
        this.colums = this.numberOfKeys;
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));

        this.CreateGrid();
    }

    CreateGrid() {
        var cellWidth = this.w / this.colums;
        var cellHeight = this.h / this.rows;
      
        for (let row = 0; row < this.rows; row++) {
          const gridRow: paper.Path[] = [];
      
          for (let col = 0; col < this.colums; col++) {
            const point = new paper.Point(col * cellWidth + cellWidth/2, row * cellHeight + cellHeight/2)
            var poly = new paper.Path.RegularPolygon(point, this.polySides, 1);
            
            poly.scale([cellWidth*this.cellWidthScale, cellHeight * this.cellHeightScale]);
            poly.fillColor = this.fillColor;
            poly.strokeWidth = this.strokeWidth;
            poly.strokeColor = this.strokeColor;
            gridRow.push(poly);
            this.paperLayer.addChild(poly);
          }
      
          // Store the grid row
          this.gridCells[row] = gridRow;
        }

        this.SetupMIDIReceiver(this.numberOfKeys * this.rows, true);
    }
      
    SetupKeyboard() {
        this.CreateGrid();
    }

    InputEvent(onEvent: boolean) {
        let holdingKeys = this.inputManager.GetHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.GetVelocity(this.targetChannel);
        var xIndex = 0;
        var yIndex = 0;

        this.receiver.forEach(element => {
            if(element.GetMIDIInput(holdingKeys, velocities)) {
                this.MatrixONEvent(yIndex, xIndex);
            } else {
                this.MatrixOFFEvent(yIndex, xIndex);
            }

            xIndex++;
            if(xIndex >= this.numberOfKeys) {
                xIndex = 0;
                yIndex++;
            }
        })
    }

    MatrixONEvent(x: number, y: number) {
        this.gridCells[x][y].fillColor = this.accentColor;
    }

    MatrixOFFEvent(x: number, y: number) {
        this.gridCells[x][y].fillColor = this.fillColor;
    }

    ApplySettings() {
        // Implement applying settings here
    }

    UpdateKeyboard() {

    }
      
    LoadDefaultColors() {
        this.fillColor = new paper.Color(1);
        this.strokeColor = new paper.Color(1 / 4);
        this.accentColor = new paper.Color(1 / 2);
    }

    ApplyColors() {
        this.gridCells.forEach((row) => {
        row.forEach((cell) => {
            cell.fillColor = this.accentColor;
            cell.strokeColor = this.strokeColor;
        });
        });
    }

    ToJSON() {
        return {
          ...this.GetBaseJSON(),

          rows: this.rows,
          colums: this.colums,
          strokeWidth: this.strokeWidth,
          polySides: this.polySides,
          cellHeightScale: this.cellHeightScale,
          cellWidthScale: this.cellWidthScale
        };
      }
      
      LoadJSON(data: any) {
        this.LoadBaseJSON(data);

        this.rows = data.rows;
        this.colums = data.colums;
        this.strokeWidth = data.strokeWidth;
        this.polySides = data.polySides;
        this.cellHeightScale = data.cellHeightScale;
        this.cellWidthScale = data.cellWidthScale;
      
        this.SetupKeyboard();
      }
}
