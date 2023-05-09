import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIToy } from "./MIDIToy";
import { Vector2D } from "../Interfaces";
import paper from 'paper';

export class MusicSpheres extends MIDIToy {
    shapes: paper.Path[] = [];
    circleRadius: number = 15;
    velocity: Vector2D[] = [];

    strokeWidth = 2;

    velocityLimit: number = 20;
    yGravity: number = -0.9;
    xGravity: number = 0;

    yFriction: number = 0.90;
    xFriction: number = 0.95;

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
        this.mainColor = new paper.Color(0,0,0,0);
        this.secondaryColor = new paper.Color(1);
        this.accentColor = new paper.Color(0,0,0,0);
    }

    SetupKeyboard() {
        // this.InitDrawPositions();
        this.InitVelocity();
        this.circleRadius = this.HorizontalDrawPositionDistrubution() / 4;

        this.shapes.length = 0;
        this.drawPositions.forEach(element => {
            var pos = element as Vector2D;
            var point = new paper.Point(pos.x, pos.y);
            var circle = new paper.Path.Circle(point, this.circleRadius);
            circle.fillColor = this.mainColor;
            circle.strokeColor = this.secondaryColor;
            circle.strokeWidth = this.strokeWidth;
            this.shapes.push(circle);
            this.paperLayer.addChild(circle); //Work on layer
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
        this.shapes.forEach(element => {
            var s = element as paper.Path.Circle;
            var vel = this.velocity[indexValue];
            if(vel == undefined) return;

            if(s.position.y < this.h - this.circleRadius) vel.y += this.yGravity; //add negativ gravity value
            if(vel.y > 0) vel.y *= this.yFriction; //reduce velocity when going up

            if(s.position.y > this.h - this.circleRadius) if(vel.y < -0.1) vel.y = -vel.y; //When on ground, bounce up
            if(s.position.y < 0 + this.circleRadius) if(vel.y > -0.1) vel.y = -vel.y; //When on top height, bounce down
            
            if(vel.x !== 0) vel.x *= this.xFriction;
            if(s.position.x < this.w + this.circleRadius) vel.x = -vel.x; //When on right side, mirror velocity
            if(s.position.x > 0 - this.circleRadius) vel.x = -vel.x; //When on left side, mirror velocity
            if(vel.x > this.velocityLimit * 2) vel.x = this.velocityLimit * 2;
            if(vel.x < -this.velocityLimit * 2) vel.x = -this.velocityLimit * 2;

            if(vel.y < -this.velocityLimit) vel.y = -this.velocityLimit; //When over limit, reduce to limit

            s.position.y -= vel.y;
            s.position.x -= vel.x;
            
            this.velocity[indexValue].y = vel.y;
            this.velocity[indexValue].x = vel.x;

            indexValue++;
        });
    }

    Impuls(indexValue: number, yForce: number, xForce: number) {
        var vel = this.velocity[indexValue];
        
        vel.y += yForce;
        vel.x += this.GetRandomNumber(-1, 1) * xForce;

        this.velocity[indexValue] = vel;
    }
}