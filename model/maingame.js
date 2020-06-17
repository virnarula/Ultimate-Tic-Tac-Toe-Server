const subgame = require("./subgame");
const BOARD_SIZE = subgame.BOARD_SIZE;

class maingame {
    constructor() {
        this.winner = ' ';
        this.board = [
            [subgame(), subgame(), subgame()],
            [subgame(), subgame(), subgame()],
            [subgame(), subgame(), subgame()]
        ];
        this.prev_x = -1;
        this.prev_y = -1;
    }

    playMove(board_x, board_y, rel_x, rel_y, player) {
        if(this.winner === ' ') {
            return false;
        }

        if(this.prev_x != -1 && this.prev_x != -1) {
            if(board_x !== this.prev_x || board_y !== this.prev_y) {
                return false;
            }
        }
        
        if(this.board[board_x][board_y].playMove(rel_x, rel_y, player)) {
            this.prev_x = board_x;
            this.prev_y = board_y;
            return true;
        } else {
            return false;
        }
    }
    
    checkWinner() {
        return verticalWinner() || horizontalWinner() || diagonalWinner();
    }

    verticalWinner() {
        for(i = 0; i < BOARD_SIZE; i++) {
            isWinner = true;
            firstBox = this.board[i][j].getWinner();
            for(j = 0; j < BOARD_SIZE; j++) {
                curr = this.board[i][j].getWinner();
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
            firstBox = this.board[i][j].getWinner();
            for(j = 0; j < BOARD_SIZE; j++) {
                curr = this.board[j][i].getWinner();
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
        firstBox = this.board[0][0].getWinner()
        for(i = 0; i < BOARD_SIZE; i++) {
            curr = this.board[i][i].getWinner();
            if(curr === " " || firstBox !== curr) {
                diagonalWinner = false;
            }
        }
        if(diagonalWinner) {
            this.winner = firstBox;
        }

        diagonalWinner = true;
        firstBox = this.board[BOARD_SIZE - 1][0].getWinner();
        for(i = 0; i < BOARD_SIZE; i++) {
            curr = this.board[i][i].getWinner();
            if(curr === " " || curr !== firstBox) {
                diagonalWinner = false;
            }
        }
        if(diagonalWinner) {
            this.winner = firstBox;
        }
    }
}