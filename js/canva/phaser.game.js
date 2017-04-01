/**
 * Created by Paul on 31.03.2017.
 */

var game = new Phaser.Game(2048, 832, Phaser.CANVAS, 'canva', { preload: preload, create: create });

function preload() {
    game.load.image('tilesetimage','img/tiles.png',128);
    game.load.tilemap('tilemap','levels/map1.json',null,Phaser.Tilemap.TILED_JSON);

};

function create() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    console.log(game);
    var map = game.add.tilemap('tilemap');
    map.addTilesetImage('BotTestTileset','tilesetimage', 64, 64);

    ground = map.createLayer('Ground');
    ground.resizeWorld();
    var obstacles = map.createLayer('Obstacles');
    var decorations = map.createLayer('Decorations');
    var collectorItems = map.createLayer('CollectorsItems');
    var bots = map.createLayer('Bots');

    // game.camera.x = map.layers[0].widthInPixels / 2;
    // game.camera.y = 0;
    //
    // game.add.tween(game.camera).to({ x: 0 }, 3000).
    // to({ x: map.layers[0].widthInPixels }, 3000).loop().start();
};