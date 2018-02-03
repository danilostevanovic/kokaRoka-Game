var elements = {
    score:document.getElementById('display-info-score-text'),
    level:document.getElementById('display-info-level-text'),
    life:document.getElementById('display-info-life-picture'),
    cowboy:document.getElementById('display-info-life-cowboy-picture'),
    display:document.getElementById('display-main'),
    displayIndikator:document.getElementById('display-main-indikator'),
    displayCounter:document.getElementById('display-main-indikator-counter'),
    displayGameOver:document.getElementById('display-main-info'),
    gameOverScore:document.getElementById('display-main-info-text-score'),
    trophy:document.getElementById('throphy'),
    ammoDisplay:document.getElementById('display-main-ammo'),
    ammoNumber:document.getElementById('display-main-ammo-number'),
    ammoBox:document.getElementById('display-main-ammo-can'),
    buttonStart:document.getElementById('button-startGame'),
    displayReload:document.getElementById('display-main-reload'),
    buttonReset:document.getElementById('button-reset'),
    buttonText:document.getElementById('button-startGame-text'),
    selectMode:document.getElementById('display-main-form'),
    mode:document.getElementById('mode'),
    goButton:document.getElementById('display-main-form-button'),
    smiley:document.getElementById('smiley'),
    blood:document.getElementById('blood'),
    lifeEgg1:document.getElementById('life-1'),
    lifeEgg2:document.getElementById('life-2'),
    lifeEgg3:document.getElementById('life-3'),
    chicken1:document.getElementById('chicken-1'),
    chicken2:document.getElementById('chicken-2'),
    chicken3:document.getElementById('chicken-3'),
    chicken4:document.getElementById('chicken-4'),
    chicken5:document.getElementById('chicken-5')
};

var sound = {
    intro: new Howl({
        src:['assets/media/intro.ogg'],
        loop:true
    }),
    gun: new Howl({
        src:['assets/media/gunShot.ogg']
    }),
    chicken: new Howl({
        src:['assets/media/chicken.ogg']
    }),
    start: new Howl({
        src:['assets/media/startGame.ogg']
    }),
    reload: new Howl({
        src:['assets/media/reload.ogg']
    }),
    gunEmpty:new Howl({
        src:['assets/media/emptyGun.ogg']
    })
};


