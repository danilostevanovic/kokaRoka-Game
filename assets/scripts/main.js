var kokaRoka = (function () {
    var level = 1,
        lifeLeft = 3,
        score = 0,
        ammunition = 5,
        magazine = 5,
        reload = false,
        counterInterval,
        introInterval,
        speedInterval = 30,
        intervalGame,
        play = false,
        numberOfChickens = 5,
        levelSpeed = [2, 3, 4, 5,6],
        width = {
            min: 1,
            max: 900
        },
        trophy = {
            gold : 'assets/images/trophy-gold.png',
            silver : 'assets/images/trophy-silver.png',
            bronze : 'assets/images/trophy-bronze.png'
        };
    document.addEventListener('dragstart', function (e) {
            e.preventDefault();
    });
    document.addEventListener('contextmenu',function(e){
        e.preventDefault();
    });
    sound.intro.play();
    introInterval = setInterval(function () {
        elements.displayIndikator.classList.toggle('startGameIndikator');
        elements.buttonStart.classList.toggle('startGameIndikator');
    }, 500);
    var firefox = function(){
        if(navigator.userAgent.indexOf('Firefox')>-1){
          for(var i=0;i<levelSpeed.length;i++){
              levelSpeed[i]-=5;
          }
        }
    }();
    var randomNumbers = function (start, end, count) {
        var returnArray = [],
            randomNumber;
        for (var i = 0; i < count; i++) {
            randomNumber = Math.floor(Math.random() * (end - start)) + start;
            if (returnArray.indexOf(randomNumber) == -1) {
                returnArray.push(randomNumber);
            } else {
                --i;
            }
        }
        return returnArray;
    };
    var randomChicken = function () {
        var chicken = ['chicken-1.png', 'chicken-2.png', 'chicken-3.png'];
        return chicken[Math.floor(Math.random() * chicken.length)];
    };
    var random = randomNumbers(width.min, width.max, numberOfChickens);
    var writeText = function (el, text) {
        el.textContent = text;
    };
    var hide = function (el) {
        el.style.display = 'none';
    }
    var show = function (el) {
        el.style.display = 'block';
    };
    var addChicken = function (chicken, position) {
        chicken.setAttribute('src', 'assets/images/' + randomChicken());
        chicken.style.top = -150 + 'px';
        chicken.style.left = position + 'px';
        show(chicken);
    };
    var checkDown = function (chicken, display, position) {
        if (chicken.offsetTop > display.offsetHeight) {
            lifeLeft--;
            hide(chicken);
            addChicken(chicken, position);
        }
    };
    var chickenMove = function (chicken, speed) {
        var position = chicken.offsetTop += speed;
        chicken.style.top = position + 'px'
    };
    var levelUp = function (score) {
        var levelIncreased = false;
        if(score>=130&&level==4){
            level = 5;
            levelIncreased = true;
        } else if (score >= 95 && level == 3) {
            level = 4;
            levelIncreased = true;
        } else if (score >= 40 && level == 2) {
            level = 3;
            levelIncreased = true;
        } else if (score >= 15 && level == 1) {
            level = 2;
            levelIncreased = true;
        }
        if (levelIncreased) {
            var position = randomNumbers(width.min, width.max, numberOfChickens);
            addChicken(elements['chicken' + level], position[level - 1]);
        }
    };
    var writeScore = function (element, score) {
        writeText(element, score);
    };
    var writeLevel = function (el, level) {
        writeText(el, level);
    };
    var getTrophy = function(element,score,bronze,silver,gold){
        if(score<=100){
            element.setAttribute('src',bronze);
        }
        if(score>=101){
            element.setAttribute('src',silver);
        }
        if(score>=150){
            element.setAttribute('src',gold);
        }
    }
    var writeGameOverScore = function (score) {
        hide(elements.lifeEgg3);
        hide(elements.displayReload);
        show(elements.displayGameOver);
        writeText(elements.gameOverScore, score);
    };
    var counterTimer = function () {
        sound.intro.stop();
        clearInterval(introInterval);
        hide(elements.displayIndikator);
        show(elements.displayCounter);
        var timer = 6
        counterInterval = setInterval(function () {
            sound.gun.play();
            timer--;
            elements.displayCounter.classList.toggle('startGameIndikator');
            writeText(elements.displayCounter, timer);
            if (timer <= 0) {
                sound.gun.stop();
                sound.start.play();
                writeText(elements.displayCounter, 'SHOOT!');
                clearInterval(counterInterval);
                setTimeout(function () {
                    hide(elements.displayCounter);
                }, 1000)
            }
        }, 1000)
    };
    var lifeDown = function (lifeLeft) {
        if (lifeLeft < 3 && lifeLeft > 0) {
            hide(elements['lifeEgg' + lifeLeft]);
        }
    };
    var checkGameOver = function (lifeLeft) {
        if (lifeLeft <= 0) {
            clearInterval(intervalGame);
            for (var i = 1; i <= numberOfChickens; i++) {
                hide(elements['chicken' + i]);
            }
            writeGameOverScore(score);
            writeText(elements.buttonReset,'New Game');
            sound.intro.play();
        }
    };
    var addBlood = function (positionLeft, positionTop, blood) {
        blood.style.top = positionTop + 'px';
        blood.style.left = positionLeft + 'px';
        show(blood);
    };
    var ammoDown = function(){
        ammunition--;
        if(ammunition==0){
            ammunition=0;
        }
    };
    var reloadAmmo = function(){
        if(reload){
            ammunition = magazine;
        };
        sound.reload.play();
    };
    var showAmmo = function(ammoNumber,ammo){
        if(ammo<0){
            writeText(ammoNumber,0)
        }else{
            writeText(ammoNumber,ammo);
        }
    };
    var shootSound = function(ammo){
        if(ammo>=0){
            sound.gun.play();
        }
        if(ammo<0){
            sound.gunEmpty.play();
        }
    };
    var showReloadMassage = function(displayReload,ammo){
        if(ammo<=0){
            show(displayReload);
        }else{
            hide(displayReload);
        }
    };
    var loseAmmo = function(target){
        if(target.hasAttribute('data-display')||target.hasAttribute('data-target')){
            ammoDown();
        }
    };
    var shoot = function () {
        show(elements.ammoBox);
        show(elements.ammoDisplay);
        elements.display.addEventListener('click', function (event) {
            var random = randomNumbers(width.min, width.max, numberOfChickens);
            var position = random[Math.floor(Math.random() * random.length)];
            var target = event.target;
            loseAmmo(target);
            shootSound(ammunition);
            if(target.hasAttribute('data-ammo')){
                ammunition=0;
                reload=true;
                reloadAmmo();
            }
            if (target.hasAttribute("data-target")&&ammunition>-1) {
                score++;
                sound.chicken.play();
                addBlood(target.offsetLeft - 50, target.offsetTop - 50, elements.blood);
                hide(target);
                addChicken(target, position);
            }
        })
    };
    var chickenFall = function (level) {
        var position = randomNumbers(width.min, width.max, numberOfChickens);
        if ((level == 1) || (level > 1 && level == 2) || (level > 2 && level == 3) || (level > 3 && level == 4)||(level > 4 && level == 5)) {
            for (var i = 1; i <= level; i++) {
                chickenMove(elements['chicken' + i], levelSpeed[i - 1]);
                checkDown(elements['chicken' + i], elements.display, position[i - 1]);
            }
        }
    };
    var action = function () {
        var randomPosition = random[Math.floor(Math.random() * random.length)];
        shoot();
        addChicken(elements.chicken1, randomPosition);
        intervalGame = setInterval(function () {
            chickenFall(level);
            levelUp(score);
            lifeDown(lifeLeft);
            writeScore(elements.score, score);
            writeLevel(elements.level, level);
            showAmmo(elements.ammoNumber,ammunition);
            showReloadMassage(elements.displayReload,ammunition);
            checkGameOver(lifeLeft);
            getTrophy(elements.trophy,score,trophy.bronze,trophy.silver,trophy.gold);
        }, speedInterval);
    };
    var resetGame = function(){
        elements.buttonReset.addEventListener('click',function(){
            window.location.reload();
        })
    };
    var selectMode = function(){
        hide(elements.displayIndikator);
        hide(elements.buttonStart);
        show(elements.selectMode);
        elements.mode.addEventListener('change',function(){
            for(var i=0;i<this.options.length;i++){
                if(this.options[i].selected){
                  elements.smiley.setAttribute('src','assets/images/'+this.options[i].value+'.png');
                  speedInterval = this.options[i].value;
                };
            };
        });
    };
    var gameBegin = function(){
        elements.goButton.addEventListener('click',function(){
            play = true;
            hide(elements.selectMode);
                resetGame();
                counterTimer();
                setTimeout(function () {
                    action();
                }, 6000)
        })
    }
    var start = function () {
        elements.buttonStart.addEventListener('click', function () {
            selectMode();
            gameBegin();
        })
    };
    return {
        game: start
    }
}());
kokaRoka.game();

