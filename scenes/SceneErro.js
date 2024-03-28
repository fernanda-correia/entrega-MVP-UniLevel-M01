class SceneErro extends Phaser.Scene {
    constructor() {
        super({key: "SceneErro"}, 'Main');
    }

 

    create() {
        this.add.image(0,0, 'bgGameOver').setOrigin(0,0);
        
        //const som = this.sound.add('somRespostaErrada');
        //som.play();

        //diminuir pontuação
        let sceneQuiz = this.scene.manager.getScene('SceneQuiz');
        this.pontosGanhos = sceneQuiz.pontosGanhos;

        //criar botao de voltar
        this.pressBotao('bntVoltar');
    }


    
    pressBotao(image){
        let bnt = this.add.image(450, 450, image);
            bnt.setInteractive({ useHandCursor: true });

            bnt.on('pointerover', () => {
                bnt.setScale(1.1);
            })

            bnt.on('pointerout', () => {
                bnt.setScale(1);
            })

            bnt.on('pointerdown', () => {
                this.scene.stop('SceneErro'),
                this.scene.start('SceneQuiz');
            })
    }
}
