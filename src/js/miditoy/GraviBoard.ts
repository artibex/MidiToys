import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIToy } from "./MIDIToy";
import { Vector2D } from "../Interfaces";
import paper from 'paper';

export class GraviBoard extends MIDIToy {
    // shapes: paper.Path[] = [];
    circleRadius: number = 15;
    velocity: Vector2D[] = [];
    horizontalAlign: boolean = true;

    strokeWidth: number = 2;
    polySides: number = 20;

    velocityLimit: number = 50;
    yGravity: number = -0.9;
    xGravity: number = 0;

    yFriction: number = 0.90;
    xFriction: number = 0.90;

    yImpulsPower: number = 30;
    xImpulsPower: number = 0;

    constructor(targetChannel: number) {
        super("GraviBoard", targetChannel, 24, 12, true);
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
    ToJSON() {
        return {
        //MIDIToy data
        numberOfKeys: this.numberOfKeys,
        startKey: this.startKey,
        useRegExp: this.useRegExp,

        fillColor: {
            red: this.fillColor.red,
            green: this.fillColor.green,
            blue: this.fillColor.blue,
            alpha: this.fillColor.alpha
        },
        strokeColor: {
            red: this.strokeColor.red,
            green: this.strokeColor.green,
            blue: this.strokeColor.blue,
            alpha: this.strokeColor.alpha
        },
        accentColor: {
            red: this.accentColor.red,
            green: this.accentColor.green,
            blue: this.accentColor.blue,
            alpha: this.accentColor.alpha
        },

        //Class specific data
        horizontalAlign: this.horizontalAlign,
        circleRadius: this.circleRadius,
        velocity: this.velocity.map(v => ({ x: v.x, y: v.y })),
        strokeWidth: this.strokeWidth,
        polySides: this.polySides,
        velocityLimit: this.velocityLimit,
        yGravity: this.yGravity,
        xGravity: this.xGravity,
        yFriction: this.yFriction,
        xFriction: this.xFriction,
        yImpulsPower: this.yImpulsPower,
        xImpulsPower: this.xImpulsPower,
        };
    }
    LoadJSON(data) {
        this.numberOfKeys = data.numberOfKeys;
        this.startKey = data.startKey;
        this.useRegExp = data.useRegExp;
    
        this.fillColor = new paper.Color(
            data.fillColor.red,
            data.fillColor.green,
            data.fillColor.blue,
            data.fillColor.alpha
        );
        this.strokeColor = new paper.Color(
            data.strokeColor.red,
            data.strokeColor.green,
            data.strokeColor.blue,
            data.strokeColor.alpha
        );
        this.accentColor = new paper.Color(
            data.accentColor.red,
            data.accentColor.green,
            data.accentColor.blue,
            data.accentColor.alpha
        );
    
        // Class specific data
        this.horizontalAlign = data.horizontalAlign;
        this.circleRadius = data.circleRadius;
        this.velocity = data.velocity.map(v => ({ x: v.x, y: v.y }));
        this.strokeWidth = data.strokeWidth;
        this.polySides = data.polySides;
        this.velocityLimit = data.velocityLimit;
        this.yGravity = data.yGravity;
        this.xGravity = data.xGravity;
        this.yFriction = data.yFriction;
        this.xFriction = data.xFriction;
        this.yImpulsPower = data.yImpulsPower;
        this.xImpulsPower = data.xImpulsPower;
        this.TriggerToyChangedEvent();
    }
    
    // [O][O][O][O][O][O][O][O]
    SetupKeyboard() {
        // this.InitDrawPositions();
        this.InitVelocity();
        this.RemoveChildrenFromLayer();
        var cellSize = (this.w / this.numberOfKeys) ;
        this.circleRadius = cellSize / 4;
        
        if(this.horizontalAlign) this.HorizontalDrawPositionDistrubution(cellSize);
        else this.VerticalDrawPositionDistrubution(cellSize);

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
        var yGravity = this.yGravity;
        var xGravity = this.xGravity;
        var yFriction = this.yFriction;
        var xFriction = this.xFriction;

        this.paperLayer.children.forEach(element => {
            var s = element as paper.Path.RegularPolygon;
            var vel = this.velocity[indexValue];
            if(vel == undefined) return;

            //No Gravity Y
            if(yGravity == 0) vel.y *= yFriction;
            //No Gravity X
            if(xGravity == 0) vel.x *= xFriction;
            //Gravity down
            if(yGravity < 0)if(vel.y > 0) vel.y *= yFriction;      
            //Gravity up
            if(yGravity > 0) if(vel.y < 0) vel.y *= yFriction;
            //Gravity left
            if(xGravity < 0) if(vel.x > 0) vel.x *= xFriction;
            //Gravity right
            if(xGravity > 0) if(vel.x < 0) vel.x *= xFriction;

            // Bounce conditions
            if (s.position.y > this.h - (this.circleRadius + this.strokeWidth / 2)) { // Ground bounce
                if (vel.y < 0) {
                    vel.y = -vel.y;
                }
            }
            if (s.position.y < 0 + (this.circleRadius + this.strokeWidth / 2)) { // Top height bounce
                if (vel.y > 0) {
                    vel.y = -vel.y;
                }
            }


            if(s.position.y > 0 + (this.circleRadius + this.strokeWidth / 2) && s.position.y < this.h - (this.circleRadius + this.strokeWidth / 2)) {
                vel.y += yGravity;
                vel.x += xGravity;
            }

            // if(vel.x !== 0) vel.x *= this.xFriction;
            //right bounce
            if(s.position.x > this.w - (this.circleRadius + this.strokeWidth/2)) vel.x = -vel.x;
            //left bounce
            if(s.position.x < 0 + (this.circleRadius + this.strokeWidth/2)) vel.x = -vel.x;

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
        
        // var rand = Math.random();
        // if(rand <= 0.5) vel.x += xForce * 1;
        // else vel.x += xForce * -1;

        if(this.yGravity < 0) vel.y += yForce;
        else vel.y -= yForce;

        if(this.xGravity < 0) vel.x += xForce;
        else vel.x -= xForce;


        this.velocity[indexValue] = vel;
    }

}