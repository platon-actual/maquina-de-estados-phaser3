// Menu para elegir aplicaciones de ia:
// - Máquina de estados finita
// - Lógica difusa o lógica borrosa
// - etc.

export class Menu extends Phaser.Scene
{
    constructor() {
        super({ key: 'Menu' });
//        this.menu = [];



    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        this.center_height = this.height/2;

        this.cameras.main.setBackgroundColor(0x222222);

        this.maquina_de_estados = this.add.text( 100, 100, "[Máquina de estados finita]", {fontSize: 24, fill: '#FFFFFF'});
        this.maquina_de_estados.setInteractive();
        this.maquina_de_estados.on("pointerdown", ()=>{ this.scene.start("MaqDeEstados"); });

        this.add.text( 100, 150, "[Lógica difusa y controlador]", {fontSize: 24, fill: '#FFFFFF'})
        .setInteractive()
        .on("pointerdown", ()=>{ this.scene.start("MaquinaDifusa"); });
    }
}
