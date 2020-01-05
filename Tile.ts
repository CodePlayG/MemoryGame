"use strict"
class Tile {
    tileId:number;
    x: number;
    y: number;
    height: number;
    width: number;
    on: boolean;
    imageId: number;
    imageName: string;
}

class Game {
    protected images: string[] = [
        'Apple.png'
        , 'Banana.png'
        , 'blackberry.png'
        , 'coconut.png'
        , 'fruits.png'
        , 'Grapes.png'
        , 'Grapes2.png'
        , 'GreenApple.png'
        , 'Kivi.png'
        , 'Orange.png'
        , 'Orange2.png'
        , 'Papaya.png'
        , 'Pears.png'
        , 'Pineapple.png'
        , 'RedBerry.png'
        , 'Straberry.png'
        , 'WaterMellon.png'
    ]
    protected tiles: []

    constructor() {
        this.tiles = new Tile[64];
    }
    draw() {
        let i=0;
        let row=0; let column=0;
        this.tiles.forEach(element => {
            element.tileId= i;


            i++;
        });

    }
}