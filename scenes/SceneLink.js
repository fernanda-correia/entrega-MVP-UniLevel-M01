class SceneLink extends Phaser.Scene{
    constructor(){
        super({key: 'SceneLink'}, 'Main')
    }

 

    create(){
        //adiciona celular
        this.add.image(450, 300, 'celularLink').setOrigin(0.5).setScale(0.8);

        //adiciona link
        this.addLink('Clique aqui', 450, 350, '40px','https://drive.google.com/drive/folders/1QDCGMSD83y6AoQ9tcP817pe-1cFrSTq1')

        //voltar para a cena anterior
        var Voltar = this.add.text(550, 500, 'Voltar', {fontSize: '15px', color: '#000000' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
        
        Voltar.on('pointerdown', () => {
            this.scene.stop('SceneLink');
        })

        Voltar.on('pointerover', () => {
            Voltar.setScale(1.05)
            Voltar.setColor('#ffffff')
        });

        Voltar.on('pointerout', () => {
            Voltar.setScale(1)
            Voltar.setColor('#000000')
        });
    }

    
    addLink(text, x, y, size, link){
        var linkText = this.add.text(x, y, text, {fontSize: size, color: '#000000' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
        
        linkText.on('pointerdown', () => {
            window.open(link, '_blank');
        })

        linkText.on('pointerover', () => {
            linkText.setScale(1.05)
            linkText.setColor('#ffffff')
        });

        linkText.on('pointerout', () => {
            linkText.setScale(1)
            linkText.setColor('#000000')
        });
    }
}
