
import { FuncionBool } from './FuncionesMembresia';

import Robot from './Robot';
import { Objeto, Bateria } from './Objetos';
import { ESTADO_BUSCA, ESTADO_NUEVA_BUSQUEDA, ESTADO_IR_A_BATERIA, ESTADO_FIN } from './Objetos'

import Phaser from 'phaser';

export class MaqDeEstados extends Phaser.Scene
{
    constructor() {
        super({ key: 'MaqDeEstados' });
        
        // arreglos para instancias de objetos, e instancias para robot y batería.
        this.objetos = [];
        this.indice_objetos = -1;
        this.bateria = null;
        this.robot = null;
        // this.MAX_OBJETOS = 10;
        this.MAX_OBJETOS = 13; // vamos a subir la dificultad... para el pobre robot.

        // para calcular las distancias a los objetos
        this.distancia_x = null;
        this.distancia_y = null;
    }
    
    create() {
        var descripcion_text = [
            "Este es un ejemplo, de una",
            "máquina con estados finitos.",
            "El robot, junta objetos,",
            "y para eso tiene estados.",
            "Los estados son:",
            "ESTADO_BUSCA, ESTADO_NUEVA_BUSQUEDA,",
            "ESTADO_IR_A_BATERIA, ESTADO_FIN",
            "Un ejemplo de esta técnica, son,",
            "las aspiradoras robot redondas.",
            " ",
            "Si usa un navegador, presione F12",
            "para ver la consola y los valores."
        ];
        this.descripcion = this.add.text( 370, 100, descripcion_text, {fontSize: 16, fill: '#FFFFFF'} );


        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        this.center_height = this.height/2;
        
        this.cameras.main.setBackgroundColor(0x222222);
        
        // se agregan los cafeses, y las comidas, para alimentar al robot
        for ( let cont = 0; cont < this.MAX_OBJETOS; cont ++ ) {
            let randomX = Phaser.Math.Between( 50, 640 );
            let randomY = Phaser.Math.Between( 50, 430 );
            
            let nuevoObjeto = new Objeto(this, randomX, randomY);
            this.objetos.push( nuevoObjeto );
        }
        
        this.indice_objetos = 0;
        
        this.bateria = new Bateria(this, 64, 64);
        
        this.robot = new Robot(this,  -64, this.center_height);
        
        this.tweens.add({
            targets: this.bateria,
            scale: { from : 4, to: 2 },
            duration: 1300, // / this.scale,
            onComplete: () => {
                this.robot.init();
                this.robot.estado_actual = ESTADO_NUEVA_BUSQUEDA;
            },
        });
        
    }
    
    actualizar_estado() {
        // La lógica de la máquina de estados, se manejan las interacciones
        //con los objetos y la gestión de energía.
        switch (this.robot.estado_actual) {
            case ESTADO_BUSCA:
                this.buscar_objeto();
                
                var distancia_x = Math.abs(this.robot.x - this.objetos[this.indice_objetos].x);
                var distancia_y = Math.abs(this.robot.y - this.objetos[this.indice_objetos].y);
                
                if (distancia_x < 5 && distancia_y < 5){
                    this.desactiva_objeto();
                    this.robot.estado_actual = ESTADO_NUEVA_BUSQUEDA;
                    console.log(" robot.estado_actual = ESTADO_NUEVA_BUSQUEDA");
                }
                
                if (this.robot.energia < 200 && this.bateria.energia > 0 ) {
                    this.robot.estado_actual = ESTADO_IR_A_BATERIA;
                    console.log(" robot.estado_actual = ESTADO_IR_A_BATERIA");
                }

                if (this.robot.energia <= 0) {
                    this.robot.estado_actual = ESTADO_FIN;
                    console.log(" robot.estado_actual = ESTADO_FIN");
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
                }
                
                if (this.robot.energia == 0)
                    this.robot.estado_actual = ESTADO_FIN;

                break;
            case ESTADO_FIN:
                this.finalizar();
                break;
        }
    }
    
    buscar_objeto() {
        const velocidad = 3;
        if (this.objetos[this.indice_objetos].x < this.robot.x )
            this.robot.x -= velocidad;
        if (this.objetos[this.indice_objetos].x > this.robot.x )
            this.robot.x += velocidad;
        if (this.objetos[this.indice_objetos].y < this.robot.y )
            this.robot.y -= velocidad;
        if (this.objetos[this.indice_objetos].y > this.robot.y )
            this.robot.y += velocidad;
        
        // cada unidad de movimiento gasta energía:
        this.robot.energia --;
    }
    desactiva_objeto() {
        if ( this.objetos[this.indice_objetos].esta_activo == true ) {
            this.objetos[this.indice_objetos].esta_activo = false;
            this.objetos[this.indice_objetos].visible = false;
        }
    }
    nueva_busqueda() {
        // Se fija en cuales objetos están activos y cambia el estado a "buscar"
        this.indice_objetos = -1;
        let activos = 0;
        for ( let cont = 0; cont < this.MAX_OBJETOS; cont ++ ) {
            if ( this.objetos[cont].esta_activo == true ){
                activos ++;
                this.indice_objetos = cont;
                console.log("Indice objeto actual: " + this.indice_objetos);
                this.robot.estado_actual = ESTADO_BUSCA;
                console.log(" robot.estado_actual = ESTADO_BUSCA");

            }
        }
        
        // si no hay más objetos activos, finaliza el algoritmo:
        if (activos > 0 ) { /* nada */ }
        else { this.robot.estado_actual = ESTADO_FIN; }
        
    }
    mover_hacia_bateria() {
        const velocidad = 3;
        
        if (this.bateria.x < this.robot.x ) this.robot.x -= velocidad;
        if (this.bateria.x > this.robot.x ) this.robot.x += velocidad;
        if (this.bateria.y < this.robot.y ) this.robot.y -= velocidad;
        if (this.bateria.y > this.robot.y ) this.robot.y += velocidad;
        // cada movimiento gasta energía:
        this.robot.energia --;
    }
    recargar_energia() {
        if (this.bateria.energia > 0) {
            this.robot.energia += 500;
            this.bateria.energia -= 500;
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
                onComplete: () => {
                    var btn_reiniciar = this.add.text( 100, 100, "REINICIAR", {fontSize: 24, fill: '#FFFFFF'});
                    btn_reiniciar.setInteractive();
                    //btn_reiniciar.addEventListener("mousedown", (e) => { reload(); });
                    btn_reiniciar.on("pointerdown", ()=>{ window.location.reload(); });
                }
            });


        }
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


