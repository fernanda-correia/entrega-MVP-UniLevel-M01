class Scene00 extends Phaser.Scene {
    constructor() {
        super({key: "Scene00"}, 'Main');
    };

    create() {
        this.createParallax(4, 'bgTelainicial', 0);
        this.createParallax(4, 'bgMontanha', 0.2);
        this.createParallax(4, 'bgMaquina', 0.4);
        this.createParallax(4, 'bgSorvete', 0);
        this.pressBotao('bntComecar');
        this.physics.add.staticImage(450, 140, 'unilevel').setScale(0.8);
        this.add.text(450, 270, 'Embarque nessa aventura!', {fill: '#000000', fontSize: '50px', setFontFamily: 'Baloo Bhai 2 ExtraBold',stroke: '#000000', strokeThickness: 2}).setOrigin(0.5);
    }

    // adiciona o botão da tela inicial para começar o jogo
    pressBotao(image) {
        let bnt = this.add.image(450, 400, image).setScale(0.8).setOrigin(0.5);
        bnt.setInteractive({ useHandCursor: true });

        // o botão é aumentado quando o cursor passa sobre ele
        bnt.on('pointerover', () => {
            bnt.setScale(0.85)
        });
        // o botão volta para escala normal quando o cursor sai de cima dele
        bnt.on('pointerout', () => {
            bnt.setScale(0.8)
        });
        // quando o botão é acionado, a  transição é feita para a cena 01
        bnt.on('pointerdown', () => {
            //fade out
            this.cameras.main.fadeOut(400, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('SceneChangePlayer')
            })
        })
    };

    pressSpace(nextScene){
        this.input.keyboard.once('keydown-SPACE', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
    
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start(nextScene)
        })
    }


    createParallax(count, bg , scrollFactor) {
        let x = 0;
        for (let i =0; i < count; ++i) {
            const scene = this.add.image(x, 600, bg).setOrigin(0,1).setScrollFactor(scrollFactor)
            x += 900
        }
    }
};
