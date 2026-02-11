
import { OperadorAND, OperadorOR, OperadorNOT } from './OperadoresDifusos';
import {
    FuncionBool, FuncionBoolInversa,
    FuncionGrado, FuncionGradoInversa,
    FuncionTriangulo,
    FuncionTrapezoide
} from './FuncionesMembresia' ;

import { Objeto, TuboDeViento } from './Objetos';
// import { ESTADO_BUSCA, ESTADO_NUEVA_BUSQUEDA, ESTADO_IR_A_BATERIA, ESTADO_FIN } from './Objetos'

import Phaser from 'phaser';

export class MaquinaDifusa extends Phaser.Scene
{
    constructor() {
        super({ key: 'MaquinaDifusa' });

        // arreglos para instancias de objetos, e instancias para robot y batería.
        this.posY_objetivo = 200;
        this.velocidadY = 0;
        this.objeto = null;
        this.gravedad = 9.8;
        // this.ventilador = 9.8; // se reemplaza por this.tubo_de_viento.ventilador

        this.obj_1 = null;
        this.obj_2 = null;
        this.obj_3 = null;
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        this.center_height = this.height/2;

        this.cameras.main.setBackgroundColor(0x222222);

        //this.bateria = new Bateria(this, 64, 64);
        this.objeto = new Objeto(this, 240, this.posY_objetivo, 'croissant');
        this.tubo_de_viento = new TuboDeViento(this, 200, 200);

        this.cafecito = new Objeto(this, 350, 100, 'cafe');
        var descripcion_text = [
            "Este es un ejemplo, de una",
            "máquina con estados difusos.",
            "Hay un ventilador, con 7",
            "niveles de potencia, y tiene",
            "que mantener centrado un",
            "objeto, que flota adentro de",
            "un tubo de viento.",
            "El cálculo difuso, se realiza",
            "usando funciones llamadas:",
            "CENTRADO, Cerca, Normal, Lejos.",
            "Un ejemplo de esta tecnología, son",
            "los lavarropas que usaban FuzzyLogic,",
            "calculando el peso de la ropa, para",
            "los ciclos de lavado y centrifugado.",
            " ",
            "Si usa un navegador, presione F12",
            "para ver la consola y los valores."
            ];
        this.descripcion = this.add.text( 370, 100, descripcion_text, {fontSize: 16, fill: '#FFFFFF'} );

        this.time.addEvent({
            delay: 50,
            callback: this.updateAltura,
            callbackScope: this,
            loop: true
        });

    }

    getRandom ( max, min ) {
        return Math.random() * (max - min) + min;
    }

    updateAltura() {

        this.Difusa();
        var caos = this.getRandom ( -2, +2 );

        this.velocidadY += ( this.gravedad - this.tubo_de_viento.ventilador + caos ) / 10;
        //this.velocidadY += ( this.gravedad - this.ventilador ) ;

        this.objeto.y += this.velocidadY;

        // para simular un suelo y el ventilador: límite del valor Y en 400
        if (this.objeto.y > 400)
            this.objeto.y = 400;

    }

    update () {

        // this.actualizar_estado();
        // this.updateText();
    }

    Difusa() {
        // Lógica de defuzzificación
        var centrado;
        var normalA; var cercaA; var lejosA;
        var normalB; var cercaB; var lejosB;

        //var distancia = this.objeto.y - this.posY_objetivo;
        // se cambia el valor de distancia, ya que la posY_objetivo es la misma que el factor inicial (200px)
        var distancia = this.objeto.y;

        var ejemplo = FuncionTriangulo (10, -20, 0, 20);

        centrado = FuncionTriangulo(distancia, 160, 200, 240);

        cercaA = FuncionTrapezoide(distancia, 80, 120, 160, 200);
        normalA = FuncionTrapezoide(distancia, 0, 40, 80, 120);
        lejosA = FuncionGradoInversa(distancia, 0, 40);

        cercaB = FuncionTrapezoide(distancia, 220, 240, 280, 300);
        normalB = FuncionTrapezoide(distancia, 280, 320, 360, 380);
        lejosB = FuncionGrado(distancia, 360, 400);

        this.tubo_de_viento.ventilador = (centrado*9.8 + cercaA*4.0 + normalA*2.0 + lejosA*1.0 + cercaB*14.0 + normalB*15.5 + lejosB*18.0) / (centrado + cercaA + normalA + lejosA + cercaB + normalB + lejosB);

        console.log("A:  cercaA: ", cercaA, " normalA: ", normalA, " lejosA: ", lejosA);
        console.log(" cercaB: ", cercaB, " normalB: ", normalB, " lejosB: ", lejosB);
    }
}


