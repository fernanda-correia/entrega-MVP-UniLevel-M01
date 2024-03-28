var bntA;
var bntB;
var bntC;
var bntD;
var virus;
var pergunta = ['Qual o propósito da UniOPS?', 'Qual das alternativas abaixo NÂO \nrepresenta uma visão da Unilever?'];
var respostas = 
['A) Transformar as operações da Unilever para garantir seu caráter inovador e sustentável\n\nB) Operar a Unilever visando o lucro\n\nC) Gerenciar as operações da Unilever para garantir uma alta no mercado\n\nD) Fazer o back e o front end dos programas da Unilever', 
'A) Ser líder global em negócios sustentáveis. \nB)  Ser a empresa sustentável mais lucrativa do mercado. \nC) Tornar "viver sustentavelmente" algo comum. \nD) Tornar a sustentabilidade parte do dia a dia de todos.'];
var cenaAnterior = 2;

class SceneQuiz extends Phaser.Scene {
    constructor() {
        super({key: 'SceneQuiz'})
        this.pontosTotais = 0;
        this.pontosGanhos = 8;
    }

    preload(){
        this.load.image('bgPergunta', 'assets/C_pergunta/bgPergunta.png');
        this.load.image('bntA', 'assets/C_pergunta/bntA.png');
        this.load.image('bntB', 'assets/C_pergunta/bntB.png');
        this.load.image('bntC', 'assets/C_pergunta/bntC.png');
        this.load.image('bntD', 'assets/C_pergunta/bntD.png');
    }

    create() {
        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0);
        this.scene.setVisible(false, 'SceneHUD');

        //adiciona fundos
        this.add.image(0,0, 'bgPergunta').setOrigin(0,0);


        //adiciona botões
        bntA = this.add.image(220,490, 'bntA').setScale(0.9)
        bntB = this.add.image(400,490, 'bntB').setScale(0.9)
        bntC = this.add.image(580,490, 'bntC').setScale(0.9)
        bntD = this.add.image(760,490, 'bntD').setScale(0.9)

        //muda quiz por fase
        if (cenaAnterior == 2) {
            this.add.text(100, 70, pergunta[0], {fill: '#3c7e45', fontSize: '40px', wordWrap: { width: 850 }, stroke: '#3c7e45', strokeThickness: 2});
            this.add.text(170, 220, respostas[0], {fill: '#3c7e45', fontSize: '20px', wordWrap: { width: 550 }, stroke: '#3c7e45', strokeThickness: 2});
            this.responder(bntA, bntB, bntC, bntD, this.pontosGanhos, this.pontosTotais);
            
        } else if (cenaAnterior == 3) {
            this.add.text(85, 70, pergunta[1], {fill: '#3c7e45', fontSize: '32px', wordWrap: { width: 850 }, stroke: '#3c7e45', strokeThickness: 2});
            this.add.text(170, 220, respostas[1], {fill: '#3c7e45', fontSize: '20px', wordWrap: { width: 550 }, stroke: '#3c7e45', strokeThickness: 2});
            this.responder(bntB, bntD, bntC, bntA, this.pontosGanhos, this.pontosTotais);

        }  

        //lógica de pontuação:
        if (this.pontosGanhos != 8){
            //ligação entre cenas
            let sceneErro = this.scene.manager.getScene('SceneErro');
            this.pontosGanhos = sceneErro.pontosGanhos;
        }
    }


    responder(bntCerto, bntErrado1, bntErrado2, bntErrado3) {
        //affordance dos botoes
        this.bntAffordance(bntCerto);
        this.bntAffordance(bntErrado1);
        this.bntAffordance(bntErrado2);
        this.bntAffordance(bntErrado3);

        //botao certo é apertado
        bntCerto.on('pointerdown', () => {
            this.pontosTotais += this.pontosGanhos;
            this.pontosGanhos = 8
            cenaAnterior++
            this.cameras.main.fadeOut(200, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.stop('SceneQuiz');
                this.scene.start('SceneAcerto')
                /*
                if (cenaAnterior == 3){
                    this.scene.start('SceneAcerto')
                } else if (cenaAnterior == 4) {
                    this.scene.start('SceneFim')
                }
                */
            })
        })

        bntErrado1.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })

        bntErrado2.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })

        bntErrado3.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })
    }
    

    bntAffordance(bnt) {
        bnt.setInteractive({ useHandCursor: true });
        bnt.on('pointerover', () => {
            bnt.setScale(1.25);
        })

        bnt.on('pointerout', () => {
            bnt.setScale(1.2);
        })
    }
}