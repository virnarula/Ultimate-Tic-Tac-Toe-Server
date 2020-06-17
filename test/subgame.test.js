const subgame = require("./../model/subgame");

test("intializes game correctly", () => {
    var game = new subgame();
    expect(game.getWinner()).toBe(' ');
});