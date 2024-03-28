var coracoes;

class SceneHUD extends Phaser.Scene {
    constructor() {
        super({key: "SceneHUD"}, 'Main', 'Scene02', 'Scene03', 'SceneGameOver');
    };

    create () {
        const som = this.sound.add("musicaFundo", {loop: true});
        som.play();
        som.setVolume(0.4);
        
        coracoes = [
            this.add.image(120, 50, '3coracao').setScale(0.15).setVisible(false),
            this.add.image(120, 50, '2coracao').setScale(0.15).setVisible(false),
            this.add.image(120, 50, '1coracao').setScale(0.15).setVisible(false)
        ]; 
    }

    update(){
        if (window.sharedData.life == 3){
            coracoes[0].setVisible(true);
            coracoes[2].setVisible(false);
        }else if(window.sharedData.life == 2){
            coracoes[0].setVisible(false);
            coracoes[1].setVisible(true);
        }else if (window.sharedData.life == 1){
            coracoes[1].setVisible(false);
            coracoes[2].setVisible(true);
        } 
    }
};
