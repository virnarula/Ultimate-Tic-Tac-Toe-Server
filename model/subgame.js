const BOARD_SIZE = 3;
class subgame {
    constructor() {
        this.winner = ' ';
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }
    
    playMove(x, y, player) {
        if(this.winner === ' ' || this.board[x][y] !== ' ') {
            return false;
        }
        this.board[x][y] = player;
        this.checkWinner();
        return true;
    }

    checkWinner() {
        this.verticalWinner();
        this.horizontalWinner();
        this.diagonalWinner();
    }

    verticalWinner() {
        for(i = 0; i < BOARD_SIZE; i++) {
            isWinner = true;
            firstBox = this.board[i][j];
            for(j = 0; j < BOARD_SIZE; j++) {
                curr = this.board[i][j];
                if(curr === ' ' || curr !== isWinner) {
                    isWinner = false;
                    break;
                }
            }
            if(isWinner) {
                this.winner = firstBox;
                return true;
            }
        }
        return false;
    }

    horizontalWinner() {
        for(i = 0; i < BOARD_SIZE; i++) {
            isWinner = true;
            firstBox = this.board[i][j];
            for(j = 0; j < BOARD_SIZE; j++) {
                curr = this.board[j][i];
                if(curr === ' ' || curr !== isWinner) {
                    isWinner = false;
                    break;
                }
            }
            if(isWinner) {
                this.winner = firstBox;
            }
        }
    }

    diagonalWinner() {
        diagonalWinner = true;
        firstBox = this.board[0][0]
        for(i = 0; i < BOARD_SIZE; i++) {
            if(curr === " " || this.board[i][i] !== curr) {
                diagonalWinner = false;
            }
        }
        if(diagonalWinner) {
            this.winner = firstBox;
        }

        diagonalWinner = true;
        firstBox = this.board[BOARD_SIZE - 1][0];
        for(i = 0; i < BOARD_SIZE; i++) {
            if(curr === " " || this.board[BOARD_SIZE - 1 - i][i] !== curr) {
                diagonalWinner = false;
            }
        }
        if(diagonalWinner) {
            this.winner = firstBox;
        }
    }

    getWinner() {
        return this.winner;
    }
    
}

// export default subgame;