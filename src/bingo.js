class Bingo {


    constructor() { }
    getData(e) {
        e.preventDefault();
        const users = document.getElementById('users').value;
        const cards = document.getElementById('cards').value;
        const numbers = document.getElementById('numbers').value;
        return {
            users,
            cards,
            numbers
        };
    }

    createMessage(data) {
        alert(`Count of ${data.type} must be ${data.min}-${data.max}. You write ${data.item}`);
    }

    createUserFild(users) {
        let html = '';
        let cards = [];
        users.forEach((user, i) => {
            html += `
            <div class="user">
                <h2 class="user-name">Player ${i + 1}</h2>
                <div class="cards">
            `;
            user.cards.forEach((_cards) => {
                cards.push(_cards);
                html += `<table class="card">
                    <tbody class="nums-list" data-user=${i}>
                        ${this.createTr(_cards)}
                    </tbody>
                </table>
            `;
            });
            html += `
            </div>
            </div>`;

        });
        document.querySelector('.box').innerHTML = html;
        this.fillTd(cards);
        this.hidePageView();
    }

    fillTd(cards) {
        let nums = [];
        cards.forEach(card => {
            for (let num of card) {
                nums.push(num);
            }
        });
        document.querySelectorAll('.num').forEach((item, i) => {
            item.textContent = nums[i].num;
            item.dataset.done = nums[i].done;
            item.dataset.num = nums[i].num;
            if (nums[i].done) {
                item.classList.add('done');
            }
        });
    }

    redrawTd(users) {
        let nums = [];
        users.forEach((item, i) => {
            item.cards.forEach((item, i) => {
                item.forEach((item, i) => {
                    nums.push(item);
                });
            });
        });
        document.querySelectorAll('.num').forEach((item, i) => {
            item.textContent = nums[i].num;
            item.dataset.done = nums[i].done;
            item.dataset.num = nums[i].num;
            if (nums[i].done) {
                item.classList.add('done');
            } else {
                item.classList.remove('done');
            }
        });
    }

    showNum(number) {
        if (this.stop) {
            let str = document.getElementById('number').innerHTML;
            console.log(str.split(','));
            let b = str.split(',');
            let a = b.splice(-1, 1);
            document.getElementById('number').innerHTML = b;
        } else {
            document.getElementById('number').innerHTML += `${number}, `;
        }
    }

    createTr(cards) {
        let html = '';
        for (let i = 0; i < 5; i++) {
            html += `
                <tr class="line">
                `;
            for (let i = 0; i < 5; i++) {
                html += ` 
                    <td class="num" ></td>`;
            }
            html += ` </tr > `;
        }
        return html;
    }
    showStartPage() {
        document.getElementById('form').style.display = 'flex';
        document.querySelector('.cards-view').style.display = 'none';
        document.querySelector('.box').style.display = "none";
        document.querySelector('.box').innerHTML = '';
    }
    hidePageView() {
        document.getElementById('form').style.display = 'none';
        document.querySelector('.cards-view').style.display = 'flex';
        document.querySelector('.box').style.display = "flex";
    }
    showPageView() {
        document.getElementById('form').style.display = 'flex';
        document.querySelector('.cards-view').style.display = 'none';
        document.querySelector('.box').style.display = "none";
    }
    showGameView() {
        document.querySelector('.cards-view').style.display = 'none';
        document.querySelector('.game-view').style.display = "flex";
        this.showRestart();
    }
    hideGameView() {
        document.querySelector('.cards-view').style.display = 'flex';
        document.querySelector('.game-view').style.display = "none";
    }

    showNewGame() {
        document.querySelector('#restart-game').style.display = 'block';
        document.querySelector('#stop-game').style.display = 'none';
    }
    showRestart() {
        document.querySelector('#restart-game').style.display = 'none';
        document.querySelector('#stop-game').style.display = 'block';
    }

    checkLines() {
        if (!this.stop) {
            let cards = document.querySelectorAll('.nums-list');
            for (let i = 0; i < cards.length; i++) {
                const lines = cards[i].children;
                for (let j = 0; j < lines.length; j++) {
                    const line = lines[j];

                    if (!line.classList.contains('checked-horizont')) {
                        if (line.children[0].classList.contains('done') && line.children[1].classList.contains('done') && line.children[2].classList.contains('done') && line.children[3].classList.contains('done') && line.children[4].classList.contains('done')) {
                            line.classList.add('checked-horizont');
                            this.showBingo(this.users[cards[i].dataset.user]);
                        }
                    }

                    switch (j) {
                        case 0:
                            if (!lines[j].children[j].classList.contains('checked-vertical') &&
                                !lines[j + 1].children[j].classList.contains('checked-vertical') &&
                                !lines[j + 2].children[j].classList.contains('checked-vertical') &&
                                !lines[j + 3].children[j].classList.contains('checked-vertical') &&
                                !lines[j + 4].children[j].classList.contains('checked-vertical')
                            ) {
                                if (
                                    lines[j].children[0].classList.contains('done') &&
                                    lines[j + 1].children[0].classList.contains('done') &&
                                    lines[j + 2].children[0].classList.contains('done') &&
                                    lines[j + 3].children[0].classList.contains('done') &&
                                    lines[j + 4].children[0].classList.contains('done')) {
                                    lines[j].children[0].classList.add('checked-vertical');
                                    lines[j + 1].children[0].classList.add('checked-vertical');
                                    lines[j + 2].children[0].classList.add('checked-vertical');
                                    lines[j + 3].children[0].classList.add('checked-vertical');
                                    lines[j + 4].children[0].classList.add('checked-vertical');
                                    this.showBingo(this.users[cards[i].dataset.user]);
                                }
                            }
                            break;
                        case 1:
                            if (!lines[j - 1].children[1].classList.contains('checked-vertical') &&
                                !lines[j].children[1].classList.contains('checked-vertical') &&
                                !lines[j + 1].children[1].classList.contains('checked-vertical') &&
                                !lines[j + 2].children[1].classList.contains('checked-vertical') &&
                                !lines[j + 3].children[1].classList.contains('checked-vertical')) {
                                if (
                                    lines[j - 1].children[1].classList.contains('done') &&
                                    lines[j].children[1].classList.contains('done') &&
                                    lines[j + 1].children[1].classList.contains('done') &&
                                    lines[j + 2].children[1].classList.contains('done') &&
                                    lines[j + 3].children[1].classList.contains('done')) {
                                    lines[j - 1].children[1].classList.add('checked-vertical');
                                    lines[j].children[1].classList.add('checked-vertical');
                                    lines[j + 1].children[1].classList.add('checked-vertical');
                                    lines[j + 2].children[1].classList.add('checked-vertical');
                                    lines[j + 3].children[1].classList.add('checked-vertical');
                                    this.showBingo(this.users[cards[i].dataset.user]);
                                }
                            }
                            break;
                        case 2:
                            if (!lines[j - 2].children[2].classList.contains('checked-vertical') &&
                                !lines[j - 1].children[2].classList.contains('checked-vertical') &&
                                !lines[j].children[2].classList.contains('checked-vertical') &&
                                !lines[j + 1].children[2].classList.contains('checked-vertical') &&
                                !lines[j + 2].children[2].classList.contains('checked-vertical')) {
                                if (
                                    lines[j - 2].children[2].classList.contains('done') &&
                                    lines[j - 1].children[2].classList.contains('done') &&
                                    lines[j].children[2].classList.contains('done') &&
                                    lines[j + 1].children[2].classList.contains('done') &&
                                    lines[j + 2].children[2].classList.contains('done')) {
                                    lines[j - 2].children[2].classList.add('checked-vertical');
                                    lines[j - 1].children[2].classList.add('checked-vertical');
                                    lines[j].children[2].classList.add('checked-vertical');
                                    lines[j + 1].children[2].classList.add('checked-vertical');
                                    lines[j + 2].children[2].classList.add('checked-vertical');
                                    this.showBingo(this.users[cards[i].dataset.user]);
                                }
                            }
                            break;
                        case 3:
                            if (!lines[j - 3].children[3].classList.contains('checked-vertical') &&
                                !lines[j - 2].children[3].classList.contains('checked-vertical') &&
                                !lines[j - 1].children[3].classList.contains('checked-vertical') &&
                                !lines[j].children[3].classList.contains('checked-vertical') &&
                                !lines[j + 1].children[3].classList.contains('checked-vertical')) {
                                if (
                                    lines[j - 3].children[3].classList.contains('done') &&
                                    lines[j - 2].children[3].classList.contains('done') &&
                                    lines[j - 1].children[3].classList.contains('done') &&
                                    lines[j].children[3].classList.contains('done') &&
                                    lines[j + 1].children[3].classList.contains('done')) {
                                    lines[j - 3].children[3].classList.add('checked-vertical');
                                    lines[j - 2].children[3].classList.add('checked-vertical');
                                    lines[j - 1].children[3].classList.add('checked-vertical');
                                    lines[j].children[3].classList.add('checked-vertical');
                                    lines[j + 1].children[3].classList.add('checked-vertical');
                                    this.showBingo(this.users[cards[i].dataset.user]);
                                }
                            }
                            break;
                        case 4:
                            if (!lines[j - 4].children[4].classList.contains('checked-vertical') &&
                                !lines[j - 3].children[4].classList.contains('checked-vertical') &&
                                !lines[j - 2].children[4].classList.contains('checked-vertical') &&
                                !lines[j - 1].children[4].classList.contains('checked-vertical') &&
                                !lines[j].children[4].classList.contains('checked-vertical')) {

                                if (
                                    lines[j - 4].children[4].classList.contains('done') &&
                                    lines[j - 3].children[4].classList.contains('done') &&
                                    lines[j - 2].children[4].classList.contains('done') &&
                                    lines[j - 1].children[4].classList.contains('done') &&
                                    lines[j].children[4].classList.contains('done')) {
                                    lines[j - 4].children[4].classList.add('checked-vertical');
                                    lines[j - 3].children[4].classList.add('checked-vertical');
                                    lines[j - 2].children[4].classList.add('checked-vertical');
                                    lines[j - 1].children[4].classList.add('checked-vertical');
                                    lines[j].children[4].classList.add('checked-vertical');
                                    this.showBingo(this.users[cards[i].dataset.user]);
                                }
                            }
                    }
                    switch (j) {
                        case 0:
                            if (!lines[j].children[j].classList.contains('checked-diagonal') &&
                                !lines[j + 1].children[j + 1].classList.contains('checked-diagonal') &&
                                !lines[j + 2].children[j + 2].classList.contains('checked-diagonal') &&
                                !lines[j + 3].children[j + 3].classList.contains('checked-diagonal') &&
                                !lines[j + 4].children[j + 4].classList.contains('checked-diagonal')
                            ) {
                                if (
                                    lines[j].children[j].classList.contains('done') &&
                                    lines[j + 1].children[j + 1].classList.contains('done') &&
                                    lines[j + 2].children[j + 2].classList.contains('done') &&
                                    lines[j + 3].children[j + 3].classList.contains('done') &&
                                    lines[j + 4].children[j + 4].classList.contains('done')) {
                                    lines[j].children[j].classList.add('checked-diagonal');
                                    lines[j + 1].children[j + 1].classList.add('checked-diagonal');
                                    lines[j + 2].children[j + 2].classList.add('checked-diagonal');
                                    lines[j + 3].children[j + 3].classList.add('checked-diagonal');
                                    lines[j + 4].children[j + 4].classList.add('checked-diagonal');
                                    this.showBingo(this.users[cards[i].dataset.user]);
                                }
                            }
                            break;
                        case 1:
                            if (!lines[j - 1].children[j + 3].classList.contains('checked-diagonal') &&
                                !lines[j].children[j + 2].classList.contains('checked-diagonal') &&
                                !lines[j + 1].children[j + 1].classList.contains('checked-diagonal') &&
                                !lines[j + 2].children[j].classList.contains('checked-diagonal') &&
                                !lines[j + 3].children[j - 1].classList.contains('checked-diagonal')) {
                                if (
                                    lines[j - 1].children[j + 3].classList.contains('done') &&
                                    lines[j].children[j + 2].classList.contains('done') &&
                                    lines[j + 1].children[j + 1].classList.contains('done') &&
                                    lines[j + 2].children[j].classList.contains('done') &&
                                    lines[j + 3].children[j - 1].classList.contains('done')) {
                                    lines[j - 1].children[j + 3].classList.add('checked-diagonal');
                                    lines[j].children[j + 2].classList.add('checked-diagonal');
                                    lines[j + 1].children[j + 1].classList.add('checked-diagonal');
                                    lines[j + 2].children[j].classList.add('checked-diagonal');
                                    lines[j + 3].children[j - 1].classList.add('checked-diagonal');
                                    this.showBingo(this.users[cards[i].dataset.user]);
                                }
                            }
                            break;
                    }
                }
            }
        }

    }

    showBingo(user) {
        user.lineCrosed++;
        if (user.lineCrosed >= 3) {
            let li = document.createElement('li');
            li.textContent = `Player ${user.id + 1} has crossed the ${user.lineCrosed} line BINGOO”`;
            document.getElementById('ul').appendChild(li);
            this.stop = true;
            this.showNewGame();
            return;
        } else {
            let li = document.createElement('li');
            li.textContent = `Player ${user.id + 1} has crossed the ${user.lineCrosed} line`;
            document.getElementById('ul').appendChild(li);
        }
    }

    removeChacked() {
        const lines = document.querySelectorAll('.line');
        const num = document.querySelectorAll('.num');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            line.classList.remove('checked-horizont');
        }
        for (let i = 0; i < num.length; i++) {
            const number = num[i];
            number.classList.remove('checked-vertical');
            number.classList.remove('checked-diagonal');
        }
    }

    clearFilds() {
        document.getElementById('number').innerHTML = '';
        document.getElementById('ul').innerHTML = 'Section Winners';
    }

    resetLineCrosed() {
        this.users.forEach(user => {
            user.lineCrosed = 0;
        });
    }
    //////////////////////////////////////////////////////////////////////////////
    gameSettings = {
        users: {
            current: 0,
            min: 2,
            max: 5
        },
        cards: {
            current: 0,
            min: 1,
            max: 3
        },
        numbers: {
            current: 0,
            min: 25,
            max: 100
        },

    }
    users = [];
    random;
    numbersArr;
    count = 0;
    nums = [];
    stop = false;

    User(id, cards, lineCrosed) {
        this.id = id;
        this.lineCrosed = lineCrosed;
        this.cards = cards;
    }
    setSettings(settings) {
        if (settings.users < this.gameSettings.users.min || settings.users > this.gameSettings.users.max) {
            return {
                item: settings.users,
                type: 'users',
                min: this.gameSettings.users.min,
                max: this.gameSettings.users.max
            }
        } else {
            this.gameSettings.users.current = parseInt(settings.users);
        }
        if (settings.cards < this.gameSettings.cards.min || settings.cards > this.gameSettings.cards.max) {
            return {
                item: settings.cards,
                type: 'cards',
                min: this.gameSettings.cards.min,
                max: this.gameSettings.cards.max
            }
        } else {
            this.gameSettings.cards.current = parseInt(settings.cards);
        }
        if (settings.numbers < this.gameSettings.numbers.min || settings.numbers > this.gameSettings.numbers.max) {
            return {
                item: settings.numbers,
                type: 'numbers',
                min: this.gameSettings.numbers.min,
                max: this.gameSettings.numbers.max
            }
        } else {
            this.gameSettings.numbers.current = parseInt(settings.numbers);
        }
    }

    createUsers() {
        for (let i = 0; i < this.gameSettings.users.current; i++) {
            this.users.push(new this.User(i, this.setCards(), 0))
        }
        console.log(this.users);
        this.numbersArr = this.getAllNumbers();
        return this.users
    }

    setCards() {
        const cards = [];
        for (let i = 0; i < this.gameSettings.cards.current; i++) {
            cards.push(this.generateRandBox())
        }
        return cards

    }
    generateRandBox() {
        this.random = this.generateRan()
        this.random.splice(0, (this.gameSettings.numbers.current - this.gameSettings.numbers.min))
        let arr = this.random.map(e => {
            return {
                num: e,
                done: false
            }
        });
        this.nums.push(...arr)
        return arr
    }

    generateRan() {
        const max = this.gameSettings.numbers.current;
        const random = [];
        for (let i = 0; i < max; i++) {
            let temp = Math.floor(Math.random() * (max - 1 + 1)) + 1;
            if (random.indexOf(temp) == -1) {
                random.push(temp);
            } else
                i--;
        }
        return random
    }
    
    getAllNumbers() {
        const max = this.gameSettings.numbers.current
        const arr = []
        for (let i = 0; i < max; i++) {
            arr.push(i + 1);
        }
        return arr.sort(this.compareRandom)
    }

    compareRandom(a, b) {
        return Math.random() - 0.5;
    }

    setAllFalse() {
        this.nums.forEach((item, i) => {
            item.done = false;
        })
    }

    resetCount() {
        this.count = 0;
    }
    resetUsers() {
        this.users = [];
    }
    resetTimer() {
        this.stop = false;
    }
    returnUsers() {
        return this.users;
    }
    setFirstNumber() {
        return this.numbersArr[this.count]
    }
    startCount() {
        if (!this.stop) {
            this.nums.forEach((item, i) => {
                if (item.num === this.numbersArr[this.count]) {
                    item.done = true;
                }
            })

            this.count++
            if (this.count < this.gameSettings.numbers.current) {
                return {
                    users: this.users,
                    number: this.numbersArr[this.count],
                    off: this.stop
                }
            }
        } else {
            return {
                users: this.users,
                number: 'Game is Over',
                off: this.stop
            }
        }
    };

    resetData() {
        this.users = [];
        this.gameSettings.users.current = 0
        this.gameSettings.cards.current = 0
        this.gameSettings.numbers.current = 0
        this.random = [];
    }
};

export default Bingo