const rollAndPlay = document.getElementById('start');

class Game {
    constructor(start) {
        this.stats = new Statistics();
        this.wallet = new Wallet(start);

        rollAndPlay.addEventListener("click", this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boardsColor = [...document.querySelectorAll('div.color')];
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanGames = document.querySelector('.score span.number');
        this.spanWins = document.querySelector('.score span.win');
        this.SpanLosses = document.querySelector('.score span.loss');

        this.render()
    }
    render(colors = ['gray', 'gray', 'gray'], money = this.wallet.getWalletValue(), result = '', stats = [0,0,0], bid, wonMoney = 0) {
        this.boardsColor.forEach((board, index) => {
            board.style.backgroundColor = colors[index]
        })
        this.spanWallet.textContent = money;
        if(result) result = `Wygrałeś ${wonMoney}$`
        else if (!result && result !== "") result = `Przegrałeś ${bid}$`
        this.spanResult.textContent = result;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.SpanLosses.textContent = stats[2];
        this.inputBid.value = ''
    }
    startGame() {

        if(this.inputBid.value < 1) return alert("Za mało środków")
        const bid = Math.floor(this.inputBid.value)
        if(!this.wallet.checkCanPlay(bid)) return alert("Masz za mało środków lub podano nei prawidłową wartość")
        this.wallet.changeWallet(bid, '-')

        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.checkWinner(colors)
        const wonMoney = Result.moneyWinInGame(win, bid)
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStatistics(win, bid);

        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney);
    }
}