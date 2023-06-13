import { MIDIDataTable } from "@mididata";
import { InputManager } from "@inputmanager";
import { MIDIToy } from "@miditoy";
import * as paper from 'paper';

export class MIDIMatrix extends MIDIToy {
    gridCells: paper.Path[][];
    rows: number = 12;
    colums: number;
    polySides: number = 4;
    
    strokeWidth: number = 5;
    cellHeightScale: number = 0.8;
    cellWidthScale: number = 0.8;

    constructor(targetChannel: number) {
        super("MIDI Matrix", targetChannel, 10, 12, true);
        this.gridCells = [];
        this.colums = this.numberOfKeys;
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));

        this.LoadDefaultColors();
        this.SetupKeyboard();
    }

    SetupKeyboard() {
        this.RemoveChildrenFromLayer();
        this.CreateGrid();
        this.SetupMIDIReceiver(this.colums * this.rows, this.useRegExp);
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
            poly.strokeScaling = false;
            gridRow.push(poly);
            this.paperLayer.addChild(poly);
          }
      
          // Store the grid row
          this.gridCells[row] = gridRow;
        }
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
            if(xIndex >= this.colums) {
                xIndex = 0;
                yIndex++;
            }
        })
    }

    MatrixONEvent(x: number, y: number) {
        this.gridCells[x][y].fillColor = this.accentColor;
        // this.gridCells[x][y].strokeWidth += this.strokeWidth
    }

    MatrixOFFEvent(x: number, y: number) {
        this.gridCells[x][y].fillColor = this.fillColor;
    }

    ApplySettings() {
        this.SetupKeyboard();
        // Implement applying settings here
    }

    UpdateKeyboard() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.colums; col++) {
                // if(this.gridCells[row][col].strokeWidth > this.strokeWidth) {
                //     this.gridCells[row][col].strokeWidth -= 1;
                // }
            }
        }
  
    }
    
    LoadDefaultColors() {
        this.fillColor = new paper.Color(100,100,100,0.5);
        this.strokeColor = new paper.Color(100,100,100,0.4);
        this.accentColor = new paper.Color(0,0,0,1);
    }

    ApplyColors() {
        this.gridCells.forEach((row) => {
            row.forEach((cell) => {
                cell.fillColor = this.fillColor;
                cell.strokeColor = this.strokeColor;
            });
        });
    }

    ToJSON() {
        return {
          ...this.GetBaseJSON(),

          rows: this.rows,
          colums: this.colums,
          polySides: this.polySides,
          strokeWidth: this.strokeWidth,
          cellHeightScale: this.cellHeightScale,
          cellWidthScale: this.cellWidthScale
        };
    }  

    LoadJSON(data: any) {
        this.rows = data.rows;
        this.colums = data.colums;
        this.polySides = data.polySides;
        
        this.strokeWidth = data.strokeWidth;
        this.cellHeightScale = data.cellHeightScale;
        this.cellWidthScale = data.cellWidthScale;
        
        this.LoadBaseJSON(data);
    }
}