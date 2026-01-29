//Robot.js
import Phaser from 'phaser';
import { ESTADO_BUSCA, ESTADO_NUEVA_BUSQUEDA, ESTADO_IR_A_BATERIA, ESTADO_FIN } from './cosasForRobots'

export default class Robot extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super (scene, x, y, 'robot');
        this.name = "rob";
        
        this.estado_actual = 0;
        this.setScale(2);
        scene.add.existing (this);
        
        //this.init();
        
        this.energia = 800;
        // this.energia_text = new Phaser.GameObjects.Text(scene, x, y, this.energia, {fontSize: 15, color: '#cc4422'}); 
        this.energia_text = this.scene.add.text(this.x - 24, this.y - 32, this.energia, {fontSize: 20, color: '#cc4422'});
        
    }
    
    init() {
        this.scene.tweens.add({
            targets: this,
            duration: 2000,
            x: { from: -60, to: 360 },
            onComplete: ()=>{ this.estado_actual = ESTADO_NUEVA_BUSQUEDA },
        });
    }
}
