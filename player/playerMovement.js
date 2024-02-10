PlayerModel.prototype.playerMovement = function () {
    if (player.W && player.y > 0) { player.y -= player.s; }
    if (player.S && player.y < (HEIGHT - player.h)) { player.y += player.s; }
    if (player.A && player.x > 0) { player.x -= player.s; }
    if (player.D && player.x < (WIDTH - player.w)) { player.x += player.s; }
}

PlayerModel.prototype.playerEventMovement = function (e, flag) {
    if (e.key == "w") { player.W = flag; }
    if (e.key == "s") { player.S = flag; }
    if (e.key == "a") { player.A = flag; }
    if (e.key == "d") { player.D = flag; }
}