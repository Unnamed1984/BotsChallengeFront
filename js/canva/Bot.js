/**
 * Created by Paul on 11.04.2017.
 */
"use strict"

class Bot{
    constructor(x, y){
        this.health = 100;
        this.x = x;
        this.y = y;
        this.sprite = null;
    }

    get X(){
        return this.x;
    }

    set X(value){
        this.x = value;
    }

    get Y(){
        return this.y;
    }

    set Y(value){
        this.y = value;
    }

    decreaseHealth(value){
        var delta = health - value;
        if (delta <=0){
            this.health = 0;
        }
        else{
            this.health = delta;
        }
    }

    shoot(){

    }
}