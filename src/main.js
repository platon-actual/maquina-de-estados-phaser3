import { Preloader } from './Preloader';
import { Menu } from './Menu';
import { MaqDeEstados } from './MaqDeEstados';
import { MaquinaDifusa } from './MaquinaDifusa';
import Phaser from 'phaser';

const config = {
    title: 'Máquina de Estados, Máquina Difusa',
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
        Menu,
        MaqDeEstados,
        MaquinaDifusa
    ]
};

const game = new Phaser.Game(config);
