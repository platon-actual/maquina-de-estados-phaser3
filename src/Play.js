//import crearBateriaYObjetos from './cosasForRobots';
import Robot from './Robot';
import { Objeto, Bateria } from './cosasForRobots';
import { ESTADO_BUSCA, ESTADO_NUEVA_BUSQUEDA, ESTADO_IR_A_BATERIA, ESTADO_FIN } from './cosasForRobots'
//import Robot from './Robot';

import Phaser from 'phaser';

export class Play extends Phaser.Scene
{
    constructor() {
        super({ key: 'Play' });
        
        this.objetos = [];
        this.indice_objetos = -1;
        this.bateria = null;
        this.robot = null;
        this.MAX_OBJETOS = 10;
        // this.MAX_OBJETOS = 2;
    }
    
    create() {
        console.log("Hola mundo");
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        this.center_height = this.height/2;
        
        //this.cameras.main.setBackgroundColor(0x87ceeb);
        this.cameras.main.setBackgroundColor(0x333322);
        
        for ( let cont = 0; cont < this.MAX_OBJETOS; cont ++ ) {
            let randomX = Phaser.Math.Between( 50, 640 );
            let randomY = Phaser.Math.Between( 50, 430 );
            
            let nuevoObjeto = new Objeto(this, randomX, randomY);
            console.log("objeto creado --");
            this.objetos.push( nuevoObjeto );
            //this.add ( this.objetos[cont] );
        }
        
        this.indice_objetos = 0;
        
        this.bateria = new Bateria(this, 64, 64);
        
        
        
        console.log("creando robot...");
        this.robot = new Robot(this,  -64 /*this.center_width*/, this.center_height, 'card-1');
        console.log("[INTERGALACTIC PLANETARY]");
        
        console.log("Estado actual: " + this.robot.estado_actual);
        
        this.tweens.add({
            targets: this.bateria,
            scale: { from : 4, to: 2 },
            duration: 1300, // / this.scale,
            onComplete: () => {
                //this.destroy();
                this.robot.init();
                this.robot.estado_actual = ESTADO_NUEVA_BUSQUEDA;
            },
        });
        
    }
    
    actualizar_estado() {
        switch (this.robot.estado_actual) {
            case 0:
                //nada
                break;
            case ESTADO_BUSCA:
                
                this.buscar_objeto();
                
                var distancia_x = Math.abs(this.robot.x - this.objetos[this.indice_objetos].x);
                var distancia_y = Math.abs(this.robot.y - this.objetos[this.indice_objetos].y);
                
                if (distancia_x < 5 && distancia_y < 5){
                    this.desactiva_objeto();
                    this.robot.estado_actual = ESTADO_NUEVA_BUSQUEDA;
                    console.log("Estado actual: " + this.robot.estado_actual);
                }
                
                if (this.robot.energia < 300) {
                    this.robot.estado_actual = ESTADO_IR_A_BATERIA;
                }
                break;
            case ESTADO_NUEVA_BUSQUEDA:
                this.nueva_busqueda();
                break;
            case ESTADO_IR_A_BATERIA:
                this.mover_hacia_bateria();
                
                var distancia_x = Math.abs(this.robot.x - this.bateria.x);
                var distancia_y = Math.abs(this.robot.y - this.bateria.y);
                
                if (distancia_x < 5 && distancia_y < 5){
                    this.recargar_energia();
                    this.robot.estado_actual = ESTADO_NUEVA_BUSQUEDA;
                    console.log("Estado actual: " + this.robot.estado_actual);
                }
                
                if (this.robot.energia == 0) {
                    this.robot.estado_actual = ESTADO_FIN;
                    console.log("Estado actual: " + this.robot.estado_actual);
                }
                break;
            case ESTADO_FIN:
                this.finalizar();
                break;
        }
    }
    
    buscar_objeto() {
        const velocidad = 3;
        if (this.objetos[this.indice_objetos].x < this.robot.x ) this.robot.x -= velocidad;
        if (this.objetos[this.indice_objetos].x > this.robot.x ) this.robot.x += velocidad;
        if (this.objetos[this.indice_objetos].y < this.robot.y ) this.robot.y -= velocidad;
        if (this.objetos[this.indice_objetos].y > this.robot.y ) this.robot.y += velocidad;
        
        // cada unidad de movimiento gasta energía:
        this.robot.energia --;
    }
    desactiva_objeto() {
        console.log ("entra en función: desactiva_objeto()" );
        if ( this.objetos[this.indice_objetos].esta_activo == true ) {
            this.objetos[this.indice_objetos].esta_activo = false;
            this.objetos[this.indice_objetos].visible = false;
            console.log("objeto : " + this.indice_objetos + " DESACTIVADO");
            if (this.robot.energia < 333) {
                this.robot.estado_actual = ESTADO_IR_A_BATERIA;
                console.log("Estado actual: " + this.robot.estado_actual);
            }
        }
    }
    nueva_busqueda() {
        console.log ("entra en función: nueva_busqueda()" );
        this.indice_objetos = -1;
        let activos = 0;
        for ( let cont = 0; cont < this.MAX_OBJETOS; cont ++ ) {
            if ( this.objetos[cont].esta_activo == true ){
                activos ++;
                this.indice_objetos = cont;
                console.log("Indice objeto actual: " + this.indice_objetos);
                this.robot.estado_actual = ESTADO_BUSCA;
            } /*else {
                if ( cont == )
            }*/
        }
        
        if (activos > 0 ) { /* nada */ }
        else { this.robot.estado_actual = ESTADO_FIN; }
        
    }
    mover_hacia_bateria() {
        const velocidad = 3;
        
        if (this.bateria.x < this.robot.x ) this.robot.x -= velocidad;
        if (this.bateria.x > this.robot.x ) this.robot.x += velocidad;
        if (this.bateria.y < this.robot.y ) this.robot.y -= velocidad;
        if (this.bateria.y > this.robot.y ) this.robot.y += velocidad;
        // cada píxel de movimiento gasta energía:
        this.robot.energia --;
    }
    recargar_energia() {
        if (this.bateria.energia > 0) {
            this.robot.energia += 400;
            this.bateria.energia -= 400;
        }
    }
    finalizar() {
        if (this.robot.estado_actual != 0 ){
            this.robot.estado_actual = 0
            this.robot.energia_text.text = '[FINALIZADO]';
            this.tweens.add({
                targets: this.robot,
                scale: { from : 2, to: 4 },
                duration: 1300,
//                 onComplete: () => {
//                     this.robot.estado_actual = 0;
//                     
//                 },
            });
        }
        /*no hace nada, solo muestra una animación y un texto.*/
        
    }
    
    updateText() {
        // solo actualiza si no está en el final del algoritmo:
        if (this.robot.estado_actual != ESTADO_FIN && this.robot.estado_actual != 0) {
            // texto del robot
            this.robot.energia_text.x = this.robot.x - 24;
            this.robot.energia_text.y = this.robot.y - 48;
            this.robot.energia_text.text = this.robot.energia;
            
            // texto de la batería
            this.bateria.energia_text.text = this.bateria.energia;
        }
    }
    
    update () {
        this.actualizar_estado();
        this.updateText();
    }
}


