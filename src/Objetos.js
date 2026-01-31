/**
 * Crear objetos para que el robot interactue
 */


// Al ser una máquina de estados finita, los estados son prediseñados:
export const ESTADO_BUSCA = 1;
export const ESTADO_NUEVA_BUSQUEDA = 2;
export const ESTADO_IR_A_BATERIA = 3;
export const ESTADO_FIN = 4;

export class Bateria extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        
        const randomY = Phaser.Math.Between( 30, 480 - 30);
        const randomX = Phaser.Math.Between( 30, 720 - 30);
        
        if ( x != null && y != null ){
            super (scene, x, y, 'bateria');
        } else {
            super (scene, randomX, randomY, 'bateria');
        }
        
        scene.add.existing(this);
        const alpha = 1 / Phaser.Math.Between (1, 3);
        
        this.energia = 1200;
        this.energia_text = this.scene.add.text(this.x - 24, this.y - 32, this.energia, {fontSize: 18, color: '#33ff22'});
        
        this.setScale(alpha);
    }
}

export class Objeto extends Phaser.GameObjects.Image {
    constructor (scene) {
        const randomX = Phaser.Math.Between( 30, 720 - 30 );
        const randomY = Phaser.Math.Between( 30, 480 - 30 );
        
        const random_img = Phaser.Math.Between( 1, 3 );
        let new_image;
        switch (random_img){
            case 1:
                new_image = 'cafe';
                break;
            case 2:
                new_image = 'croissant';
                break;
            case 3:
                new_image = 'torta';
                break;
        }
        
        super (scene, randomX, randomY, new_image);
        
        this.setScale(2);
        
        scene.add.existing (this);
        scene.physics.add.existing (this);
        
        this.body.setAllowGravity(false);
        
        // declaro una variable para saber si está activo:
        this.esta_activo = true;
        
    }
}
