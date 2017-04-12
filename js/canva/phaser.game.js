/**
 * Created by Paul on 31.03.2017.
 */

// https://habrahabr.ru/post/236809/

"use strict";

var game = new Phaser.Game(1020, 400, Phaser.CANVAS, 'canva', { preload: preload, create: create, update: update });
var tile_size = 64;
var width = 31;
var height = 12;
var controller = new BotsController(width, height);
var cursors;

// phaser's functions

function preload() {
    game.load.image('tilesetimage','img/tiles.png',128);
    game.load.tilemap('tilemap','levels/map1.json',null,Phaser.Tilemap.TILED_JSON);

    game.load.spritesheet('bot', 'img/bot1.png', 64, 64);
};

function create() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    var map = createMap(game);
    createLayers(map);

    focusCameraOnTile(1000, 1000);
    cursors = game.input.keyboard.createCursorKeys();

    initializeBots(map);
};

function update() {

    // Check key states every frame.
    // Move ONLY one of the left and right key is hold.

    if (cursors.left.isDown)
    {
        moveCamera(-5, 0);
    }
    else if (cursors.right.isDown)
    {
        moveCamera(5, 0);
    }

    if (cursors.up.isDown)
    {
        moveCamera(0, -5);
    }
    else if (cursors.down.isDown){
        moveCamera(0, 5);
    }

};






function createLayers(map){
    // creating layers
    var ground = map.createLayer('Ground');
    ground.resizeWorld();
    var obstacles = map.createLayer('Obstacles');
    var decorations = map.createLayer('Decorations');
    var collectorItems = map.createLayer('CollectorsItems');
}

function createMap(game){
    // tilemap using
    var map = game.add.tilemap('tilemap');
    map.addTilesetImage('BotTestTileset','tilesetimage', 64, 64);

    return map;
}

function focusCameraOnTile(x, y){
    game.camera.focusOnXY(x*tile_size, y*tile_size);
}

function moveCamera(x, y){
    game.camera.x += x;
    game.camera.y += y;
}

function initializeBots(map){
    var bots = controller.getBots();

    for (var i=0; i<bots.length; i++){
        bots[i].sprite = game.add.sprite(bots[i].X*tile_size, bots[i].Y*tile_size, 'bot');
        bots[i].sprite.animations.add('selected', [2], 10, true);
    }
}

