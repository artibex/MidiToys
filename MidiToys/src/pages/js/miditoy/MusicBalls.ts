import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIKeyboard } from "./MIDIKeyboard";
import { Vector2D } from "./MIDIKeyboard";
import paper, { Color } from "paper";

export class MusicBalls extends MIDIKeyboard {
    shapes: paper.Path[] = [];
    circleRadius: number = 15;
    velocity: Vector2D[] = [];

    velocityLimit: number = 20;
    yGravity: number = -0.9;
    xGravity: number = 0;
    friction: number = 0.95;

    yImpulsPower: number = 30;
    xImpulsPower: number = 10;

    constructor(canvas: HTMLCanvasElement, targetChannel: number, numberOfKeys: number, startNote: number) {
        super(canvas, targetChannel, numberOfKeys, startNote, true);
        console.log("CREATED MusicBalls");
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
        this.SetupKeyboard();
    }

    SetupKeyboard() {
        // this.InitDrawPositions();
        this.circleRadius = this.HorizontalDrawPositionDistrubution() / 4;
        this.InitVelocity();

        this.drawPositions.forEach(element => {
            var pos = element as Vector2D;
            var point = new paper.Point(pos.x, pos.y);
            var circle = new paper.Path.Circle(point, this.circleRadius);
            circle.strokeColor = new Color(255);
            circle.strokeWidth = 2;
            this.shapes.push(circle);
        })
    }

    InitVelocity() {
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
                    this.Impuls(index, this.yImpulsPower, 0);
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
            
            if(s.position.y < this.h - this.circleRadius) vel.y += this.yGravity; //add negativ gravity value
            if(vel.y > this.friction) vel.y -= this.friction; //reduce velocity when going up

            if(s.position.y > this.h - this.circleRadius) if(vel.y < -0.1) vel.y = -vel.y; //When on ground, bounce up
            if(s.position.y < 0 + this.circleRadius) if(vel.y > -0.1) vel.y = -vel.y; //When on upper height, bounce down
                        
            vel.x *= 0.98;
            //Limit to x bounds
            if(s.position.x < this.w + this.circleRadius) vel.x = -vel.x;
            if(s.position.x > 0 - this.circleRadius) vel.x = -vel.x;

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
        // var s = this.shapes[indexValue] as paper.Shape.Circle;
        vel.y += yForce;

        vel.x += this.GetRandomNumber(-1.2, 1.2) * xForce;

        this.velocity[indexValue] = vel;

    }
}