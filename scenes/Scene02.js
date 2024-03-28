//FASE OMO
var moeda1;
var player;
var checkar = [200,500];
var vida = 3;
var pregador1, pregador2, pregador3, pregador4, pregador5, pregador6, pregador7, pregador8, pregador9, pregador10;
var pregador11, pregador12, pregador13, pregador14, pregador15, pregador16, pregador17, pregador18, pregador19;
var chaoA, chaoB, chaoC, chaoD, chaoE, chaoF, chaoG;
var playernoChao;
var teclado; 
var bacteria1, bacteria2, bacteria3, bacteria4, bacteria5, bacteria6;
var maquina1, maquina2, maquina3, maquina4, maquina5, maquina6, maquina7, maquina8, maquina9, maquina10;
var maquina11, maquina12, maquina13;
var barreiraEsquerda;
var platAux;
var fundo;
var celular;
var omo;
var texto, texto1;
var botaoE;
var grades;
var portal;
var placa;
var checkpoint1, checkpoint11, checkpoint22, checkpoint2, checkpoint3;
var platAux2;
var contagemPortal = 1;
var life = vida;
window.sharedData = {life};

class Scene02 extends Phaser.Scene{
    
    constructor(){
        super({key: "Scene02"}, 'Main');
        this.textoHacker = null;    
        this.balaoDeFala = null;
    }

    //criação da parallax de fundo
    createParallax(count, bg , scrollFactor) {
        let x = 0;
        for (let i =0; i < count; ++i) {
            const scene = this.add.image(x, 600, bg).setOrigin(0,1).setScrollFactor(scrollFactor)
            x += 900
        }
    }
    morreu(){
        vida -= 1;
        window.sharedData.life -= 1;
        const som = this.sound.add('dano');
        som.play();

        if(vida == 0){
            window.sharedData.life = 3;
            vida = 3;
            checkar = [200,500];
            this.scene.launch('SceneGameOver');
        };
        this.scene.restart('Scene02');
    };

    create(){
        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0)

        this.cameras.main.setBackgroundColor("#77ddf5");
        const width = this.scale.width;
        const height = this.scale.height;

        teclado = this.input.keyboard.createCursorKeys();


        //fazer camera seguir player
        this.cameras.main.setBounds(0, 0, width*14, 600);
        this.physics.world.setBounds(0, 0, width*14, 600);

        //adicionando as teclas WASD
        this.WASD = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
 
        //adicionar paralaxe
        this.createParallax(14, 'bgVaral', 0.2);
        this.createParallax(14, 'bgBolha', 0.4);
        
        //adicionando as teclas WASD
        this.WASD = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        placa = this.physics.add.sprite(12500,522, 'placa').setScale(0.6);
        placa.setMaxVelocity(0);

        //criacao do player
        player = this.physics.add.sprite(checkar[0], checkar[1],'player').setSize(100,150).setScale(0.8);
        //player = this.physics.add.sprite(11900, checkar[1],'player').setSize(100,150).setScale(0.8);
        this.cameras.main.startFollow(player);

        //criação de checkpoints
        checkpoint1 = this.physics.add.staticImage(4955,500,'bandeiraCinza').setSize(100,500).setScale(0.6);
        checkpoint11 = this.physics.add.staticImage(4950,500,'bandeiraVermelha').setSize(100,500).setScale(0.6).setVisible(false);
        this.physics.add.overlap(player, checkpoint1, () =>{
            console.log('aaaaaaa')
            checkar = [4955,500];
            checkpoint1.setVisible(false);
            checkpoint11.setVisible(true);
        })


        checkpoint2 = this.physics.add.staticImage(8240,500,'bandeiraCinza').setSize(100,500).setScale(0.6);
        checkpoint22 = this.physics.add.staticImage(8235,500,'bandeiraVermelha').setSize(100,500).setScale(0.6).setVisible(false);
        this.physics.add.overlap(player,checkpoint2, () =>{
            console.log('bbbbbbbb');
            checkar = [8240,500];
            checkpoint2.setVisible(false);
            checkpoint22.setVisible(true);
        })

        //barreira que impede o jogador de cair no lado esquerdo do início da fase
        barreiraEsquerda = this.physics.add.staticImage(0,height/2,'').setSize(1,height+100).setVisible(false);
        this.physics.add.collider(player,barreiraEsquerda);

        //plataforma auxiliar que faz a transição das cenas
        platAux = this.physics.add.staticImage(12500,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        this.physics.add.overlap(player, platAux, () =>{
            //ao tocar o portal o jogador vai para tela de quiz com um fade out que n esta funcionndo direito
            this.cameras.main.fadeOut(200, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.launch('SceneQuiz')
                
            })
        });


        //adiciona bacterias
        bacteria1 = this.physics.add.sprite(1200, 500, 'bacteria').setBounce(1).setScale(0.3).setSize(180, 250);
        bacteria1.setVelocityX(-50);
        bacteria1.setPushable(false);
        this.physics.add.collider(player,bacteria1, () => {
            this.morreu()
        })


        bacteria2 = this.physics.add.sprite(3630, 500, 'bacteria').setBounce(1).setScale(0.3).setSize(180, 250);
        bacteria2.setVelocityX(50);
        bacteria2.setPushable(false);
        this.physics.add.collider(player,bacteria2, () => {
            this.morreu()
        })


        bacteria3 = this.physics.add.sprite(4400, 500, 'bacteria').setBounce(1).setScale(0.3).setSize(180, 250);
        bacteria3.setVelocityX(50);
        bacteria3.setPushable(false);
        this.physics.add.collider(player,bacteria3, () => {
            this.morreu()
        })


        bacteria4 = this.physics.add.sprite(7650, 500, 'bacteria').setBounce(1).setScale(0.35).setSize(180, 250);
        bacteria4.setVelocityX(50);
        bacteria4.setPushable(false);
        this.physics.add.collider(player,bacteria4, () => {
            this.morreu()
        })


        bacteria5 = this.physics.add.sprite(7800, 500, 'bacteria').setBounce(1).setScale(0.3).setSize(180, 250);
        bacteria5.setVelocityX(100);
        bacteria5.setPushable(false);
        this.physics.add.collider(player,bacteria5, () => {
            this.morreu()
        })


        bacteria6 = this.physics.add.sprite(7800, 500, 'bacteria').setBounce(1).setScale(0.25).setSize(180, 250);
        bacteria6.setVelocityX(150);
        bacteria6.setPushable(false);
        this.physics.add.collider(player,bacteria6, () => {
            this.morreu()
        })




        
        //adiciona chãos
        chaoA = this.physics.add.staticImage(1000,600,'chao2').setSize(2000, 30).setScale(8,1);
        this.physics.add.collider(player,chaoA,() => {
            playernoChao = true;
        });
        this.physics.add.collider(bacteria1,chaoA);

        chaoB = this.physics.add.staticImage(4300,600,'chao2').setSize(1750, 30).setScale(6.8,1);
        this.physics.add.collider(player,chaoB,() => {
            playernoChao = true;
        });
        this.physics.add.collider(bacteria2,chaoB);
        this.physics.add.collider(bacteria3,chaoB);

        chaoC = this.physics.add.staticImage(5500,600,'chao2').setSize(160, 30).setScale(0.6,1);
        this.physics.add.collider(player,chaoC,() => {
            playernoChao = true;
        });

        chaoD = this.physics.add.staticImage(5900,600,'chao2').setSize(160, 30).setScale(0.6,1);
        this.physics.add.collider(player,chaoD,() => {
            playernoChao = true;
        });

        chaoE = this.physics.add.staticImage(6300,600,'chao2').setSize(160, 30).setScale(0.6,1);
        this.physics.add.collider(player,chaoE,() => {
            playernoChao = true;
        });

        chaoF = this.physics.add.staticImage(7600,600,'chao2').setSize(1750, 30).setScale(6.8,1);
        this.physics.add.collider(player,chaoF,() => {
            playernoChao = true;
        });
        this.physics.add.collider(bacteria4,chaoF);
        this.physics.add.collider(bacteria5,chaoF);
        this.physics.add.collider(bacteria6,chaoF);

        // adiciona fundo que chama a tela de gameover quando o player cai
        fundo = this.physics.add.staticImage(1000,800,'chao2').setSize(50000,30).setScale(500,1);
        this.physics.add.collider(player,fundo, () => {
            this.morreu()
        })
        
       chaoG = this.physics.add.staticImage(12300,600,'chao2').setSize(900, 30).setScale(3.5,1);
        this.physics.add.collider(player,chaoG,() => {
            playernoChao = true;
        });


        

        //adiciona pregadores
        pregador1 = this.physics.add.staticImage(300,350,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador1, () => {
            playernoChao = true;
            
            /*
            this.scene.stop('Scene02');
            this.scene.start('SceneQuiz');
            */
        });
        pregador2 = this.physics.add.staticImage(2400,350,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador2, () => {
            playernoChao = true;
        });
        pregador3 = this.physics.add.staticImage(2800,250,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador3, () => {
            playernoChao = true;
        });


        pregador4 = this.physics.add.staticImage(3200,400,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador4, () => {
            playernoChao = true;
        });


        pregador5 = this.physics.add.staticImage(7200,350,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador5, () => {
            playernoChao = true;
        });


        pregador6 = this.physics.add.staticImage(7600,250,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador6, () => {
            playernoChao = true;
        });


        pregador7 = this.physics.add.staticImage(8700,500,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador7, () => {
            playernoChao = true;
        });


        pregador8 = this.physics.add.staticImage(9100,400,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador8, () => {
            playernoChao = true;
        });


        pregador9 = this.physics.add.staticImage(9500,0,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador9, () => {
            playernoChao = false;
        });


        pregador10 = this.physics.add.staticImage(9500,500,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador10, () => {
            playernoChao = true;
        });


        pregador11 = this.physics.add.staticImage(9900,400,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador11, () => {
            playernoChao = true;
        });


        pregador13 = this.physics.add.staticImage(10300,400,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador13, () => {
            playernoChao = true;
        });


        pregador14 = this.physics.add.staticImage(10700,60,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador14, () => {
            playernoChao = false;
        });


        pregador15 = this.physics.add.staticImage(10700,300,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador15, () => {
            playernoChao = true;
        });


        pregador16 = this.physics.add.staticImage(10700,550,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador16, () => {
            playernoChao = true;
        });


        pregador17 = this.physics.add.staticImage(11100,450,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador17, () => {
            playernoChao = true;
        });


        pregador18 = this.physics.add.staticImage(11500,100,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador18, () => {
            playernoChao = false;
        });
     
        pregador19 = this.physics.add.staticImage(11500,500,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador19, () => {
            playernoChao = true;
        });

        

        //adiciona máquinas
        maquina1 = this.physics.add.staticImage(700,500, 'maquina').setSize(140, 170).setScale(0.5);
        this.physics.add.collider(player,maquina1, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria1,maquina1);

        maquina2 = this.physics.add.staticImage(1955,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina2, () =>{
            playernoChao = true;
            
        });
        this.physics.add.collider(bacteria1,maquina2);

        maquina3 = this.physics.add.staticImage(3570,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina3, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria2,maquina3);

        maquina4 = this.physics.add.staticImage(4300,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina4, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria2,maquina4);
        this.physics.add.collider(bacteria3,maquina4);

        maquina5 = this.physics.add.staticImage(4800,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina5, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria3,maquina5);

        maquina6 = this.physics.add.staticImage(5100,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina6, () =>{
            playernoChao = true;
        });

        maquina7 = this.physics.add.staticImage(5500,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina7, () =>{
            playernoChao = true;
        });

        maquina8 = this.physics.add.staticImage(5500,330, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina8, () =>{
            playernoChao = true;
        });

        maquina9 = this.physics.add.staticImage(5900,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina9, () =>{
            playernoChao = true;
        });

        maquina10 = this.physics.add.staticImage(6300,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina10, () =>{
            playernoChao = true;
        });

        maquina11 = this.physics.add.staticImage(6300,330, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina11, () =>{
            playernoChao = true;
        });

        maquina12 = this.physics.add.staticImage(6800,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina12, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria4,maquina12);
        this.physics.add.collider(bacteria5,maquina12);
        this.physics.add.collider(bacteria6,maquina12);

        maquina13 = this.physics.add.staticImage(8000,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina13, () =>{
            playernoChao = true;
            
        });
        this.physics.add.collider(bacteria4,maquina13);
        this.physics.add.collider(bacteria5,maquina13);
        this.physics.add.collider(bacteria6,maquina13);

        // adiciona o celular
        celular = this.physics.add.sprite(12100,400,'celular').setScale(0.5).setVisible(true);
        celular.body.setSize(500, 800, true)
        this.physics.add.overlap(player, celular, () => {
            this.mostrarBalaoDeFala();
        }, null, this);

        // adiciona o botão da letra E
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        // adiciona o primeiro texto após a tecla E ser pressionada
        //texto1 = this.physics.add.sprite(12100,200,'texto1').setScale(1, 1).setVisible(false);
        // adiciona a sprite sheet do portal para transição de telas
        //portal = this.physics.add.sprite(12500,460,'portal').setScale(0.5).setVisible(false);
        //this.anims.create({
          //  key: 'mexer',
           // frames: this.anims.generateFrameNumbers('portal', { start:0, end:2 }),
          //  frameRate: 5,
          //  repeat: -1
      //  });
        // adiciona o affordance da letra E
        botaoE = this.physics.add.sprite(12118, 300, 'botaoE').setScale(0.15);

        omo = this.physics.add.sprite(12300,500,'omo').setScale(0.3);
        this.anims.create({
            key: 'pular',
            frames: this.anims.generateFrameNumbers('omo', { start:0, end:1 }),
            frameRate: 5,
            repeat: -1
        });
      

        // adiciona plataforma auxiliar que torna o portal visivel 
        platAux2 = this.physics.add.staticImage(12340,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        //this.physics.add.overlap(player, platAux2, () =>{
         //   portal.setVisible (true);
      //  });

        grades = this.physics.add.sprite(12300, 507, 'grades').setScale(1.2);
        this.physics.add.collider(player, grades, () =>{
            playernoChao = true;
        })
        grades.setPushable(false);

        // Adiciona o balão de falas do hacker
        this.balaoDeFala = this.add.image(12340, 40, 'balaoDeFala').setOrigin(1, 0).setScale(0.3).setVisible(false);


        // Adiciona o texto dentro do balão de falas
        this.textoHacker = this.add.text(12120, 90, "Não esperava que você chegasse tão longe! Deve ter sido sorte de principiante, então tente responder essa pergunta", {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setVisible(false);
        this.textoHacker.setOrigin(0.5, 0);

        moeda1 = this.physics.add.staticImage(700, 300, 'moeda').setSize(55,55).setScale(0.2)
        this.physics.add.overlap(player, moeda1, () =>{
            moeda1.destroy();
            const coletaMoeda = this.sound.add("coletarMoeda");
            coletaMoeda.play();
        });

    };

    mostrarBalaoDeFala(){
        this.balaoDeFala.setVisible(true);
        this.textoHacker.setVisible(true);
    }
    
    update(){

        // impede que as sprites sofram com a velocidade da gravidade e caiam
        celular.setMaxVelocity(0);
        botaoE.setMaxVelocity(0);
        grades.setMaxVelocity(0);
        //texto1.setMaxVelocity (0);

        // adiciona a animação da sprite sheet do portal
     //   portal.anims.play('mexer', true);
       // portal.setMaxVelocity (0);

        omo.anims.play('pular', true);
        omo.setMaxVelocity (0);

    
      
        //quando as duas teclas são pressionada, o player para
        if(teclado.left.isDown && teclado.right.isDown){        
            player.setVelocityX(0);
        //anda pra esquerda
        };

        // Lógica para movimentação com as teclas WASD ou setas
        const isMovingLeft = teclado.left.isDown || this.WASD.left.isDown;
        const isMovingRight = teclado.right.isDown || this.WASD.right.isDown;
        const isJumping = teclado.up.isDown || this.WASD.up.isDown;

        if (isMovingLeft) {
            player.setFlip(true);
            player.setVelocityX(-300);
            player.anims.play('andar', true);
        } else if (isMovingRight) {
            player.setFlip(false);
            player.setVelocityX(300);
            player.anims.play('andar', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('parado', true);
        }

        if (isJumping && playernoChao && player.body.touching.down) {
            player.setVelocityY(-400);
            player.anims.play('andar', true);
            playernoChao = false;
        }

        //depois de 2s que o "E" foi pressionado, o HUD de links aparece
        if (this.teclaE.isDown) {
            celular.setVisible(true);
            //texto1.setVisible(true);
            this.scene.launch('SceneLink');
        };
    };
};
// class Scene02 extends Phaser.Scene {
//     constructor() {
//         super({ key: "Scene02" });
//         this.vida = 3;
//         this.checkar = [200, 500];
//         this.player = null;
//         this.playernoChao = false;
//         this.teclado = null;
//         this.balaoDeFala = null;
//         this.textoHacker = null;
//     }

//     create() {
//         this.cameras.main.setBackgroundColor("#77ddf5");
//         const width = this.scale.width;
//         const height = this.scale.height;

//         // Adicionando teclado
//         this.teclado = this.input.keyboard.createCursorKeys();
//         this.WASD = this.input.keyboard.addKeys({
//             up: Phaser.Input.Keyboard.KeyCodes.W,
//             left: Phaser.Input.Keyboard.KeyCodes.A,
//             down: Phaser.Input.Keyboard.KeyCodes.S,
//             right: Phaser.Input.Keyboard.KeyCodes.D,
//         });
//         this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

//         // Criação do player
//         this.player = this.physics.add.sprite(this.checkar[0], this.checkar[1], 'player').setSize(100, 150).setScale(0.8);
//         this.cameras.main.startFollow(this.player);
//         this.physics.world.setBounds(0, 0, width * 14, 600);

//         // ... [Código para criar o cenário, obstáculos, inimigos, etc.] ...

//         // Exemplo de adicionar uma máquina como obstáculo
//         let maquina1 = this.physics.add.staticImage(700, 500, 'maquina').setSize(140, 170).setScale(0.5);
//         this.physics.add.collider(this.player, maquina1);

//         // Adiciona a física para impedir que o jogador caia fora dos limites do mundo
//         let fundo = this.physics.add.staticImage(1000, 800, 'chao2').setSize(50000, 30).setScale(500, 1);
//         this.physics.add.collider(this.player, fundo, () => this.morreu());

//         // Balão de fala e texto
//         this.balaoDeFala = this.add.image(12300, 50, 'balaoDeFala').setOrigin(1, 0).setScale(0.3).setVisible(false);
//         this.textoHacker = this.add.text(12120, 90, "Não esperava que você chegasse tão longe! Deve ter sido sorte de principiante, então tente responder essa pergunta", {
//             fontSize: '16px',
//             fill: '#fff',
//             wordWrap: { width: 300 },
//             align: 'center'
//         }).setVisible(false).setOrigin(0.5, 0);
//     }

//     update() {
//         // Movimentação do jogador
//         if (this.teclado.left.isDown || this.WASD.left.isDown) {
//             this.player.setVelocityX(-160).setFlipX(true);
//         } else if (this.teclado.right.isDown || this.WASD.right.isDown) {
//             this.player.setVelocityX(160).setFlipX(false);
//         } else {
//             this.player.setVelocityX(0);
//         }

//         if ((this.teclado.up.isDown || this.WASD.up.isDown) && this.player.body.touching.down) {
//             this.player.setVelocityY(-330);
//         }
//     }

//     morreu() {
//         this.scene.restart();
//         this.vida -= 1;
//         if (this.vida === 0) {
//             this.vida = 3;
//             this.checkar = [200, 500];
//             this.scene.start('SceneGameOver');
//         }
//     }
// }

// // Código para carregar recursos e criar instâncias da cena aqui
