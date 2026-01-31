import { Preloader } from './Preloader';
import { Play } from './Play';
import Phaser from 'phaser';

const config = {
    title: 'Máquina de Estados (?)',
    type: Phaser.AUTO,
    width: 720,
    height: 480,
    parent: 'container',
    physics: {
        default: "arcade",
        // arcade: {
        //     gravity: { y: 350 },
        //     //debug: true,
        // },
    },
    //backgroundColor: '#192a56',
    backgroundColor: '#000000',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
    scene: [
        Preloader,
        Play
    ]
};

const game = new Phaser.Game(config);
