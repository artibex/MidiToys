import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIToy } from "./MIDIToy";
import { Vector2D } from "../Interfaces";
import paper from 'paper';

export class MusicSpheres extends MIDIToy {
    // shapes: paper.Path[] = [];
    circleRadius: number = 15;
    velocity: Vector2D[] = [];

    strokeWidth: number = 2;
    polySides: number = 20;

    velocityLimit: number = 50;
    yGravity: number = -0.9;

    yFriction: number = 0.90;
    xFriction: number = 0.90;

    yImpulsPower: number = 30;
    xImpulsPower: number = 0;

    constructor(targetChannel: number, numberOfKeys: number, startKey: number) {
        super("MusicSpheres", targetChannel, numberOfKeys, startKey, true);
        console.log("CREATED MusicBalls");
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
        this.LoadDefaultColorSettings();
        this.SetupKeyboard();
    }

    LoadDefaultColorSettings() {
        this.fillColor = new paper.Color(0,0,0,0);
        this.strokeColor = new paper.Color(1);
        this.accentColor = new paper.Color(0,0,0,0);
    }

    // [O][O][O][O][O][O][O][O]
    SetupKeyboard() {
        // this.InitDrawPositions();
        this.InitVelocity();
        this.RemoveChildrenFromLayer();
        var cellSize = (this.w / this.numberOfKeys) ;
        this.circleRadius = cellSize / 4;
        this.HorizontalDrawPositionDistrubution(cellSize);

        // this.shapes.length = 0;
        this.drawPositions.forEach(element => {
            var pos = element as Vector2D;
            var point = new paper.Point(pos.x, pos.y);
            // var circle = new paper.Path.Circle(point, this.circleRadius);
            var poly = new paper.Path.RegularPolygon(point, this.polySides, this.circleRadius);

            poly.fillColor = this.fillColor;
            poly.strokeColor = this.strokeColor;
            poly.strokeWidth = this.strokeWidth;
            this.paperLayer.addChild(poly); //Work on layer
        })
    }

    InitVelocity() {
        this.velocity.length = 0;
        for(let i = 0; i < this.numberOfKeys; i++) {
            let vec: Vector2D = ({x: 0, y: 0});
            this.velocity.push(vec);
        }
    }

    prevHoldingKeys: string[] = [];
    InputEvent(onEvent: boolean) {
        let holdingKeys = this.inputManager.GetHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.GetVelocity(this.targetChannel);
        this.bpm = this.inputManager.GetBPM();
        
        if(!onEvent) {
            this.prevHoldingKeys = [...holdingKeys];
            return;
        }
        
        let index = 0;
        if(JSON.stringify(holdingKeys) !== JSON.stringify(this.prevHoldingKeys)) {
            this.receiver.forEach(element => {
                var r = element as MIDIReceiver;
                if(r.GetMIDIInput(holdingKeys, velocities)) {
                    // console.log("FOUND key, spawn square");
                    this.Impuls(index, this.yImpulsPower, this.xImpulsPower);
                }
                index++;
            })
        }
        this.prevHoldingKeys = [...holdingKeys];
    }

    UpdateKeyboard() {
        let indexValue = 0;
        this.paperLayer.children.forEach(element => {
            var s = element as paper.Path.RegularPolygon;
            var vel = this.velocity[indexValue];
            if(vel == undefined) return;

            if(this.yGravity < 0) { //Gravity down
                if(vel.y > 0) vel.y *= this.yFriction;
            }
            if(this.yGravity > 0) { //Gravity up
                if(vel.y < 0) vel.y *= this.yFriction;
            }

            // Bounce conditions
            if (s.position.y > this.h - (this.circleRadius + this.strokeWidth / 2)) { // Ground bounce
                if (vel.y < 0) {
                    vel.y = -vel.y;
                    // vel.y *= this.yFriction;
                }
            }
            if (s.position.y < 0 + (this.circleRadius + this.strokeWidth / 2)) { // Top height bounce
                if (vel.y > 0) {
                    vel.y = -vel.y;
                }
            }
            if(s.position.y > 0 + (this.circleRadius + this.strokeWidth / 2) && s.position.y < this.h - (this.circleRadius + this.strokeWidth / 2)) {
                vel.y += this.yGravity;
            }

            if(vel.x !== 0) vel.x *= this.xFriction;
            if(s.position.x > this.w - (this.circleRadius + this.strokeWidth/2)) vel.x = -vel.x; //When on right side, mirror velocity
            if(s.position.x < 0 + (this.circleRadius + this.strokeWidth/2)) vel.x = -vel.x; //When on left side, mirror velocity

            //When over limit, reduce to limit
            if(vel.y < -this.velocityLimit || vel.y > this.velocityLimit) {
                if(vel.y < 0) vel.y = -this.velocityLimit;
                if(vel.y > 0) vel.y = this.velocityLimit;
            }

            //Collider check to others
            // for (let i = 0; i < this.paperLayer.children.length; i++) {
            //     var other = this.paperLayer.children[i] as paper.Path.RegularPolygon;
            //     if (s.intersects(other)) {
            //         // Perform bounce off behavior
            //         vel.x = -vel.x;
            //         vel.y = -vel.y;
            //         break; // Exit the loop if a collision is detected (to avoid multiple bounces in one frame)
            //     }
            // }

            //Update position
            s.position.y -= vel.y;
            s.position.x -= vel.x;
            
            this.velocity[indexValue].y = vel.y;
            this.velocity[indexValue].x = vel.x;

            indexValue++;
        });
    }

    Impuls(indexValue: number, yForce: number, xForce: number) {
        var vel = this.velocity[indexValue];
        var rand = Math.random();

        if(this.yGravity < 0) vel.y += yForce;
        else vel.y -= yForce;

        if(rand <= 0.5) vel.x += xForce * 1;
        else vel.x += xForce * -1;

        this.velocity[indexValue] = vel;
    }
}