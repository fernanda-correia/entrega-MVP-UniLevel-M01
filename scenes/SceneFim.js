class SceneFim extends Phaser.Scene{
    constructor(){
        super({key: 'SceneFim'})
    }

    create(){
        this.add.image(0,0,'bgAcerto').setOrigin(0,0);
        //this.add.text(450, 200, 'PARABÉNS', {fontSize: '80px', fill: '#000000'}).setOrigin(0.5);
        this.add.text(450, 300, 'Você desligou o sistema do Hacker com a senha:', {fontSize: '30px', align: 'center', wordWrap: { width: 800 }, fill: '#000000',stroke: '#000000', strokeThickness: 2}).setOrigin(0.5);
        this.add.text(450, 400, 'UNIOPS', {fontSize: '50px', fill: '#000000', stroke: '#000000', strokeThickness: 2}).setOrigin(0.5);
    }
}