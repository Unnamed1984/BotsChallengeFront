/**
 * Created by Paul on 31.03.2017.
 */

// https://habrahabr.ru/post/236809/
// enemies = game.add.group();enemies.setAll('inputEnabled', true);enemies.setAll('input.useHandCursor', true);

"use strict";

var game = new Phaser.Game(1200, 400, Phaser.CANVAS, 'canva', { preload: preload, create: create, update: update });
var tile_size = 64;
var width = 31;
var height = 12;
var controller = new BotsController(width, height);
var cursors;

// phaser's functions

function preload() {
    game.load.image('tilesetimage','img/tiles.png', 128);
    game.load.tilemap('tilemap','levels/map1.json',null,Phaser.Tilemap.TILED_JSON);

    game.load.spritesheet('bot', 'img/bot1.png', 64, 64);
    game.load.spritesheet('enemyBot', 'img/bot2.png', 64, 64);
};

function create() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.world.setBounds(0, 0, 2048, 848);

    var map = createMap(game);
    createLayers(map);

    // focusCameraOnTile(12, 4);
    cursors = game.input.keyboard.createCursorKeys();

    initializeBots(map);
};

function update() {
    cameraController();
};






function createLayers(map){
    // creating layers
    var ground = map.createLayer('Ground');
    //ground.resizeWorld();
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

    // ahchor depends on camera
    for (var i=0; i<bots.length; i++){
        var sprite = bots[i].sprite = game.add.sprite(bots[i].X*tile_size, bots[i].Y*tile_size, 'bot');
        sprite.animations.add('selected', [1, 2, 3, 4], 4, true);
        sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        sprite.events.onInputDown.add(onBotDown);
    }
    game.camera.focusOn(bots[0].sprite);

    var enemyBots = controller.getEnemyBots();

    for (var i=0; i<enemyBots.length; i++){
        var sprite = enemyBots[i].sprite = game.add.sprite(enemyBots[i].X*tile_size, enemyBots[i].Y*tile_size, 'enemyBot');
        sprite.animations.add('fly', [0, 1], 1.5, true);
        sprite.animations.play("fly");
    }
}

function cameraController(){
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
}

function onBotDown(sprite, pointer){
    sprite.animations.play("selected");

    var selectedBot = controller.getSelectedBot();
    if (selectedBot.content != null){
        selectedBot.content.sprite.animations.stop();
        selectedBot.content.sprite.frame = 0;
    }

    console.log(selectedBot);

    var bots = controller.getBots();

    for (var i=0; i<bots.length; i++){
        if (bots[i].sprite.renderOrderID == sprite.renderOrderID){
            selectedBot.content = bots[i];
        }
    }
    
    selectedBot.content.sprite.animations.play('selected');


    // День Космонавтики!!!!!!!
    
    // setTimeout(function () {
    //     setInterval(function () {
    //         sprite.y -= 10;
    //     }, 100);
    // }, 1000);
}
function mouseDownOnMap(){
//     var x = Math.round(game.input.mousePointer.x/tile_size);
//     var y = Math.round(game.input.mousePointer.y/tile_size);
//     var bots = controller.getBots();
//     console.log("clicked" + x + "   " + y);
//
//    for (var i=0; i<bots.length; i++){
//        if (bots[i].X == x && bots[i].Y == y){
//            bots[i].sprite.animations.play("selected");
//            console.log("selected");
//            break;
//        }
// }
}