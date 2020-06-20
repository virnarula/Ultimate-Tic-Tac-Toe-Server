class move {
    constructor(board_x, board_y, rel_x, rel_y, player) {
        this.board_x = board_x;
        this.board_y = board_y;
        this.rel_x = rel_x;
        this.rel_y = rel_y;
        this.player = player;
    }
    getPlayer() {
        return this.player;
    }
    getBoardX() {
        return this.board_x;
    }
    getBoardY() {
        return this.board_y;
    }
    getRelX() {
        this.rel_x;
    }
    getRelY() {
        this.rel_y;
    }
}