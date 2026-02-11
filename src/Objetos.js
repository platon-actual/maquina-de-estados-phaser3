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
        /*
        if ( x != null && y != null ){
            super (scene, x, y, 'bateria');
        } else {
            super (scene, randomX, randomY, 'bateria');
        }*/

        super (scene, randomX, randomY, 'bateria');
        
        scene.add.existing(this);
        const alpha = 1 / Phaser.Math.Between (1, 3);
        
        this.energia = 1000;
        this.energia_text = this.scene.add.text(this.x - 24, this.y - 32, this.energia, {fontSize: 18, color: '#33ff22'});
        
        this.setScale(alpha);
    }
}

export class Objeto extends Phaser.GameObjects.Image {
    constructor (scene, x, y, default_image) {
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
        
        if (x != null && y != null && default_image != null)
            super (scene, x, y, default_image);
        else
            super (scene, randomX, randomY, new_image);
        
        this.setScale(2);
        
        scene.add.existing (this);
        scene.physics.add.existing (this);
        
        this.body.setAllowGravity(false);
        
        // declaro una variable para saber si está activo:
        this.esta_activo = true;
        
    }
}

export class TuboDeViento extends Phaser.GameObjects.Container {
    constructor ( scene, x, y ){
        super (scene);
        this.pared_izq = null;
        this.pared_der = null;
        this.base = null;

        this.pos_x = x;
        this.pos_y = y;

        this.ventilador = 0;

        this.ventilador1 = this.scene.add.line ( this.pos_x + 40, 430, 0, 0, 40, 40, '0x336677' );
        this.ventilador2 = this.scene.add.line ( this.pos_x + 40, 430, 0, 40, 40, 0, '0x336677' );


        // this.pared_izq = this.scene.add.line( 50, 50, 50, 50, 60, 120, '0xFF0000' );
        const num_lineas = 5;
        for ( var cont = 0; cont < num_lineas; cont ++ ){
            this.scene.add.line( x ,     y, 0 + cont, 50, 0 + cont, 400, '0x00aaaa' );
            this.scene.add.line( x + 80, y, 0 + cont, 50, 0 + cont, 400, '0x00aaaa' );
        }

        scene.time.addEvent({
            delay: 100,
            callback: this.updateAnimation,
            callbackScope: this,
            loop: true
        });
    }

    updateAnimation() {

        var angulo_velocidad = parseInt(this.ventilador);

        // this.ventilador1.angle += 15;
        // this.ventilador2.angle += 15;
        this.ventilador1.angle += angulo_velocidad;
        this.ventilador2.angle += angulo_velocidad;
        if (this.ventilador1.angle >= 180 ) {
            this.ventilador1.angle = -180 ;
            this.ventilador2.angle = -180 ;
        }

        // if ( this.ventilador1.visible == true ) {
        //     this.ventilador2.visible = true;
        //     this.ventilador1.visible = false
        // } else {
        //     this.ventilador1.visible = true;
        //     this.ventilador2.visible = false
        // }
    }
}
