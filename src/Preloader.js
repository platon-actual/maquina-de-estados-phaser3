import Phaser from 'phaser';

export class Preloader extends Phaser.Scene
{
    constructor()
    {
        super({
            key: 'Preloader'
        });
    }

    preload ()
    {
        this.load.setPath("assets/");
        this.load.image("cafe", "cafe.png");
        this.load.image("croissant", "croissant.png");
        this.load.image("torta", "torta.png");
        this.load.image("robot", "robot_1.png");
        this.load.image("bateria", "bateria.png");

    }

    create ()
    {
        this.scene.start("Menu");
        // this.scene.start("Play");
    }
}
