// Define a cena de pré-carregamento
class Main extends Phaser.Scene {
    constructor() {
        super('Main');
        this.cenaAtual = 'teste';
    }

    // Carrega os recursos necessários durante a pré-carga
    preload() {
        this.load.image('bandeiraVermelha', 'assets/bandeiraVermelha.png');
        this.load.image('bandeiraCinza', 'assets/bandeiraCinza.png');
        this.load.image('bntComecar', 'assets/C0/bntComecar.png');
        this.load.image('bgTelainicial', 'assets/C0/bg00.png');
        this.load.image('bgMontanha', 'assets/C0/bg01.png');
        this.load.image('bgMaquina', 'assets/C0/bg02.png');
        this.load.image('bgSorvete', 'assets/C0/bg03.png');
        this.load.image('unilevel', 'assets/C0/unilevel.png');
        this.load.image('filtro', 'assets/C0/filtro.png');
        this.load.spritesheet('urso_azul','assets/ursofofo.png',{ frameWidth: 277, frameHeight: 357});
        this.load.spritesheet('urso_rosa','assets/ursofofo_rosa.png',{ frameWidth: 277, frameHeight: 357});
        this.load.spritesheet('urso_amarelo','assets/ursofofo_amarelo.png', { frameWidth: 277, frameHeight: 357});
        this.load.spritesheet('urso_laranja','assets/ursofofo_laranja.png', { frameWidth: 277, frameHeight: 357});
        this.load.image('urso_default_azul','assets/urso_default_azul.png');
        this.load.image('urso_default_amarelo','assets/urso_default_amarelo.png');
        this.load.image('urso_default_rosa','assets/urso_default_rosa.png');
        this.load.image('urso_default_laranja','assets/urso_default_laranja.png');
        this.load.image('bg1', 'assets/C1/bg1.png');
        this.load.image('exclamacao', 'assets/C1/exclamacao.png');
        this.load.image('botaoE', 'assets/C1/botao_E.png');
        this.load.image('chao1', 'assets/C1/chao1.jpeg');
        this.load.image('direcoes','assets/C1/direcoes.png');
        this.load.spritesheet('player','assets/ursofofo_azul.png',{ frameWidth: 277, frameHeight: 357});
        this.load.spritesheet('telaPiscando', 'assets/telapiscando.png', { frameWidth: 900, frameHeight: 600 });
        this.load.image('bgVaral','assets/C2/bg21.png');
        this.load.image('bgBolha','assets/C2/bg22.png');
        this.load.image('placa', 'assets/C2/placa.png');
        this.load.image('pregador','assets/C2/pregador.png');
        this.load.image('pregadorQuebrado', 'assets/C2/pregadorQuebrado.png');
        this.load.image('chao2','assets/C2/chao2.png');
        this.load.image('maquina','assets/C2/maquina.png');
        this.load.image('bacteria','assets/C2/bacteria.png');
        this.load.image('celular', 'assets/C2/celularnovo.png');
        this.load.image('grades', 'assets/C2/grades.png');
        this.load.spritesheet('omo','assets/spriteomo.png', { frameWidth: 512, frameHeight: 512});
        this.load.spritesheet('portal', 'assets/C2/portalroxosprite.png', { frameWidth: 285, frameHeight: 450 });
        this.load.image('bgGameOver', 'assets/C_gameOver/bgGameOver.png');
        this.load.image('textoGameOver', 'assets/C_gameOver/gameOver.png');
        this.load.image('bntVoltar','assets/C_gameOver/bntVoltar.png');
        this.load.image('bgPergunta', 'assets/C_pergunta/bgPergunta.png');
        this.load.image('fundoPergunta', 'assets/C_pergunta/fundoPergunta.png');
        this.load.image('bntA', 'assets/C_pergunta/bntA.png');
        this.load.image('bntB', 'assets/C_pergunta/bntB.png');
        this.load.image('bntC', 'assets/C_pergunta/bntC.png');
        this.load.image('bntD', 'assets/C_pergunta/bntD.png');
        this.load.spritesheet('virus', 'assets/C_pergunta/virus.png', {frameWidth: 225, frameHeight: 180});
        this.load.image('3coracao', '../assets/_tresCoracoes.png');
        this.load.image('2coracao', '../assets/_doisCoracoes.png');
        this.load.image('1coracao', '../assets/_umCoracao.png');
        this.load.image('fundomt', 'assets/C3/bgMaeTerra.png');
        this.load.image('montanhas', 'assets/C3/bg30.png');
        this.load.image('colinas', 'assets/C3/bg31.png');
        this.load.image('arvore', 'assets/C3/bg32.png');
        this.load.image('chaomt', 'assets/C3/chaoMaeTerra.jpeg');
        this.load.audio('musicaFundo', "assets/sounds/game-background-music-62671.mp3");
        this.load.image('moeda', 'assets/moeda.png');
        this.load.image('celularLink', 'assets/C_link/celularLink.png')
        this.load.audio('coletarMoeda', "assets/sounds/coin-collect-retro-8-bit-sound-effect-145251.mp3");
        this.load.audio('dano','assets/sounds/hurt_c_08-102842.mp3');
        this.load.audio('respostaErrada','assets/sounds/fiasco-154915.mp3');
        this.load.audio('somGameOver','assets/sounds/failure-2-89169.mp3');
        this.load.image('balaoDeFala', 'assets/C1/balaoDeFalaHacker.png');
        this.load.image('bgAcerto', 'assets/C_acerto/bgAcerto.png');
        this.load.image('bgAcerto1', 'assets/C_acerto/bgAcerto1.png');
        this.load.image('bgAcerto2', 'assets/C_acerto/bgAcerto2.png');
        this.load.spritesheet('gradesQuebrando', 'assets/C_acerto/gradesQuebrando', {frameWidth: 900, frameHeight: 600});
        this.load.image('bntContinuar', 'assets/C_acerto/bntContinuar.png')
        this.load.image('tronco', 'assets/C3/tronco.png');
        this.load.image('besouro', 'assets/C3/besouro.png');
        this.load.image('cipo', 'assets/C3/cipo.png');
        this.load.image('bolacha', 'assets/C3/bolacha.png');
        this.load.image('bgChangePlayer', 'assets/bgChangePlayer.jpeg');
    }
    // Chama a próxima cena após a pré-carga
    create() {
        this.scene.start('Scene00');
    };
};

window.onload =  function(){
// Configurações do jogo
const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    backgroundColor: "77ddf5",
    physics: {
        default: "arcade",
        arcade: {
            gravity:{y:450},  //gravidade 0 no eixo y (player não cai)
            debug: false,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,},
    scene: [Main, Scene00, Scene01, Scene02, Scene03,SceneQuiz,SceneAcerto,SceneErro, SceneGameOver, SceneChangePlayer, SceneHUD, SceneLink, SceneFim]
};

// Inicia o jogo
const game  = new Phaser.Game(config);
}

