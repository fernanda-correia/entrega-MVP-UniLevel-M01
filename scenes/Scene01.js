var chao;
class Scene01 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene01" }, 'Main');
        // Definindo propriedades da classe
        this.exclamacao = null;
        this.player = null;
        this.cor = 'azul'; // Exemplo, defina conforme a necessidade
        this.playernoChao = false;
        this.teclado = null;
        this.chao = null;
        this.podeMudarCena = false;
        this.balaoDeFala = null;
        this.textos = [
            "Saudações novato! Você deve estar se perguntando o motivo do seu computador não estar funcionando. Eu hackeei a Unilever inteira, sequestrei todos os mascotes e ainda desmontei a área mais importante da empresa. HAHAHAHA! \n[ aperte F para continuar ]",
            "Tudo está escondido atrás do meu sistema super criptografado e protegido por meus servos e enigmas que apenas alguém com muito conhecimento sobre a Unilever poderia solucionar. [ aperte F para continuar ]",
            "Se você quiser tentar passar pelo meu desafio, venha e entre no computador. [ aperte F para continuar ]"
        ];
        this.teclaF = null;
        this.indiceTexto = 0;
        this.textoBalaoFala = null;
        
    }

  
    create() {
        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0)

        this.teclado = this.input.keyboard.createCursorKeys();
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Tecla E

        //adiionando as teclas WASD
        this.WASD = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.teclaF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.add.image(450, 300, 'bg1');

        // adiciona a affordance da exclamação para ir ao computador
        this.exclamacao = this.physics.add.staticImage(700, 270, 'exclamacao').setSize(100, 600).setScale(0.3);

        // adiciona o botão E inicialmente invisivel
        this.botaoE = this.add.image(720, 270,   'botaoE').setScale(0.2).setVisible(false);

        this.balaoDeFala = this.add.image(570, 80, 'balaoDeFala').setScale(0.3).setVisible(false);
        // Ajustando o texto dentro do balão de fala
        // A posição x e y do texto foi ajustada para alinhar com o centro do balão de fala
        // Use wordWrap para ajustar o texto dentro de um certo limite de largura
        this.textoBalaoFala = this.add.text(650, 90, '', {
            font: '14px Arial',
            fill: '#ffffff',
            wordWrap: { width: 400 }, // Ajuste a largura conforme necessário
            align: 'center'
        }).setOrigin(0.5, 0.5).setVisible(false);
        // adiciona affordance que indica os botões a serem utilizados ao longo do jogo
        this.direcoes = this.physics.add.staticImage(140,300, 'direcoes').setScale(0.3);

        // adiciona o player e sua animação de sprite sheet
        this.player = this.physics.add.sprite(140, 450, 'player').setSize(120, 150);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 8 }),
            frameRate: 12,
            repeat: -1
        });      

         this.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        });

        // adiciona a tela piscando entre a cena 01 e 02

        this.anims.create({
            key: 'piscar',
            frames: this.anims.generateFrameNumbers('telaPiscando', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        // troca a exclamação pelo botão E quando o player encosta na hitbox dela
        this.physics.add.overlap(this.player, this.exclamacao, () => {
            this.exclamacao.setVisible(false);
            this.botaoE.setVisible(true);
            this.podeMudarCena = true;
        });

        // adiciona o chão e a colisão do player
        chao = this.physics.add.staticImage(450, 575, 'chao1');
        this.physics.add.collider(this.player, chao, function () {
            playernoChao = true;
            
        });
        // Inicialmente, define o texto do balão para o primeiro texto da lista
        this.atualizarTextoBalaoFala();
    }
    atualizarTextoBalaoFala() {
        // Atualiza o texto sendo exibido no balão de fala e o torna visível
        if (this.indiceTexto < this.textos.length) {
            this.textoBalaoFala.setText(this.textos[this.indiceTexto]);
            this.balaoDeFala.setVisible(true);
            this.textoBalaoFala.setVisible(true);
        } else {
            // Esconde o balão de fala quando todos os textos forem exibidos
            this.balaoDeFala.setVisible(false);
            this.textoBalaoFala.setVisible(false);
            this.indiceTexto = 0; // Reset para permitir que o texto seja mostrado novamente se necessário.
        }
    }
    
    update() {


        if (this.teclado.left.isDown || this.WASD.left.isDown) {
            this.player.setFlipX(true);
            this.player.setVelocityX(-300);
            this.player.anims.play('andar', true);
        } else if (this.teclado.right.isDown || this.WASD.right.isDown) {
            this.player.setFlipX(false);
            this.player.setVelocityX(300);
            this.player.anims.play('andar', true);
        } else {
            this.player.setVelocityX(0);
            if (this.player.body.velocity.y === 0) { // Garante que a animação de parar só aconteça quando não estiver pulando
                this.player.anims.play('parado', true);
            }
        }
    
        if ((this.teclado.up.isDown || this.WASD.up.isDown) && this.playernoChao) {
            this.player.setVelocityY(-200);
            this.playernoChao = false;
        }
    
        if (Phaser.Input.Keyboard.JustDown(this.teclaE) && this.podeMudarCena) {
            this.telaPiscando = this.add.sprite(0, 0, 'telaPiscando').setOrigin(0, 0);
            this.telaPiscando.anims.play('piscar');
            setTimeout(() => {
                this.scene.stop('Scene01');
                this.scene.launch('Scene02');
                this.scene.launch('SceneHUD');
            }, 1500);
        }
        
        // Se a tecla F foi pressionada e o balão de fala está visível
        if (Phaser.Input.Keyboard.JustDown(this.teclaF)) {
            this.indiceTexto++; // Avança para o próximo texto
            this.atualizarTextoBalaoFala();
        };
    };
};    

