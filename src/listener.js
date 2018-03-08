class Listener {
    constructor(bingo) {
        this.bingo = bingo;
    }
    id;

    init() {
        document.getElementById('game-start').addEventListener('click', (e) => {
            const settings = this.bingo.getData(e);
            this.bingo.setSettings(settings);
            if (this.bingo.setSettings(settings)) {
                this.bingo.createMessage(this.bingo.setSettings(settings));
            } else {
                const users = this.bingo.createUsers();
                this.bingo.createUserFild(users);
            }
        });

        document.getElementById('remove-cards').addEventListener('click', () => {
            this.bingo.showPageView();
            this.bingo.resetData();
        });

        document.getElementById('start-game').addEventListener('click', () => {
            this.bingo.showGameView();
            this.id = setInterval(() => {
                this.bingo.showNum(this.bingo.setFirstNumber());
                let data = this.bingo.startCount();
                this.bingo.redrawTd(data.users);
                this.bingo.checkLines();
                if (data.off) {
                    clearInterval(this.id);
                }
            }, 2000);


        });
        document.getElementById('stop-game').addEventListener('click', () => {
            this.bingo.hideGameView();
            clearInterval(this.id);
            this.bingo.resetCount();
            this.bingo.removeChacked();
            this.bingo.clearFilds();
            this.bingo.resetLineCrosed();
            this.bingo.setAllFalse();
            let users = this.bingo.returnUsers();
            this.bingo.redrawTd(users);
        });

        document.getElementById('restart-game').addEventListener('click', () => {
            this.bingo.hideGameView();
            clearInterval(this.id);
            this.bingo.resetCount();
            this.bingo.removeChacked();
            this.bingo.clearFilds();
            this.bingo.resetLineCrosed();
            this.bingo.setAllFalse();
            let users = this.bingo.returnUsers();
            this.bingo.redrawTd(users);
            this.bingo.showStartPage();
            this.bingo.resetUsers();
            this.bingo.resetTimer();
        });
    }
}

export default Listener;