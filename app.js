new Vue({
    el: '#app',
    data: {
        healthYou:100,
        healthMonster:100,
        gameIsRunning:false,
        scores: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.healthYou = 100;
            this.healthMonster = 100;
            this.scores = [];
        },
        attack: function () {
            const damage = this.calculateDamage(3, 10);
            this.healthMonster -= damage;
            this.scores.unshift({
                isPlayer: true,
                text: 'You hit Monster for' + "" + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function () {
            const damage = this.calculateDamage(10, 20);
            this.healthMonster -= damage;
            this.scores.unshift({
                isPlayer: true,
                text: 'You hit Monster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        monsterAttack: function (){
            const damage = this.calculateDamage(5, 12);
            this.healthYou -= damage;
            this.checkWin();
            this.scores.unshift({
                isPlayer: false,
                text: 'Monster hits You for' + "" + damage
            });
        },

        heal: function () {
            if (this.healthYou <= 90) {
                this.healthYou += 10;
            } else {
                this.healthYou = 100;
            }
            this.scores.unshift({
                isPlayer: true,
                text: 'You heal for 10'
            });
            this.monsterAttack();

        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            return Math.max( Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if (this.healthMonster <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else  if (this.healthYou <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});