function monsterBigger(monster) {
    monster.w += 0.1;
    monster.h += 0.1;
}

function monsterFireArrow(monster) {
    monster.arrow.x += (monster.arrow.vector.nx) * monster.arrow.speed;
    monster.arrow.y += (monster.arrow.vector.ny) * monster.arrow.speed;

    if (!utilities.outOfBounds(monster.arrow.x, monster.arrow.y)) {
        utilities.drawSquare(monster.arrow.x, monster.arrow.y, monster.arrow.w, monster.arrow.h, monster.c);

    } else {
        monster.arrow.vector = utilities.unitVector(monster, player);
        monster.arrow.x = monster.x;
        monster.arrow.y = monster.y;
    }
}

function monsterMovement(monster) {
    let vector = utilities.unitVector(player, monster)

    if (vector.mag) {
        monster.x += (vector.nx * -1) * monster.speed;
        monster.y += (vector.ny * -1) * monster.speed;
    }
}