var senha = ['UNI', 'OPS']

class SceneAcerto extends Phaser.Scene {
    constructor() {
        super({key: 'SceneAcerto'}, 'Main');
        this.counter = 2
    }

 
    create() {
        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0)

        //lógica de pontos
        let sceneQuiz = this.scene.manager.getScene('SceneQuiz');
        let pontosTotais = sceneQuiz.pontosTotais;
        console.log(pontosTotais)

        //design de fundo
        //this.add.image(0,0,'bgAcerto').setOrigin(0,0);

        //adiciona mensagem de parabéns e a pontuação
        //this.add.text(450, 230, 'Você desbloqueou parte da chave:', {fontSize: '40px', align: 'center', wordWrap: { width: 800 }, fill: '#000000'}).setOrigin(0.5);
        this.add.text(450, 380, 'Pontuação: '+ pontosTotais, {fontSize: '30px', fill: '#000000'}).setOrigin(0.5);

        if (this.counter == 2) {
            this.add.image(0,0,'bgAcerto1').setOrigin(0,0);
            this.add.text(450, 300, senha[0], {fontSize: '60px', fill: '#000000'}).setOrigin(0.5).setVisible(false);
            this.counter++
        } else if (this.counter == 3) {
            this.add.image(0,0,'bgAcerto2').setOrigin(0,0);
            this.add.text(450, 300, senha[1], {fontSize: '60px', fill: '#000000'}).setOrigin(0.5).setVisible(false);
            this.counter++
        }
        

        
        this.pressBotao('bntContinuar');
    }

    
    pressBotao(image){
        let bnt = this.add.image(450, 480, image).setOrigin(0.5).setScale(0.8);
            bnt.setInteractive({ useHandCursor: true });

            bnt.on('pointerover', () => {
                bnt.setScale(0.85);
            })

            bnt.on('pointerout', () => {
                bnt.setScale(0.8);
            })

            bnt.on('pointerdown', () => {
                this.cameras.main.fadeOut(200, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    
                    if (this.counter == 3){
                        this.scene.start('Scene03')
                    } else if (this.counter == 4) {
                        this.scene.start('SceneFim')
                    }
                    this.scene.stop('SceneAcerto')
                })
            })
    }
}
