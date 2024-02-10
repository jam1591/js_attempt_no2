const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = 1000;
const HEIGHT = canvas.height = 1000;

const monsterActive = [];
const bullets = [];

let utilities = new Utilities();
let player = new PlayerModel( 
            utilities.relativeSquareCenter(0, WIDTH, 25), 
            utilities.relativeSquareCenter(0, HEIGHT, 25),
            25, 
            25, 
            "lightgray", 
            1);


// Monsters are added iteratively using setTimeout to push to [monsterActive] array.
monsterAdd(monsterDatabase[0]); // Swarm
monsterAdd(monsterDatabase[1]); // Archer
monsterAdd(monsterDatabase[2]); // Tank
monsterAdd(monsterDatabase[3]); // Boss

function monsterAdd(database,) {
    setInterval(function () {
        if (monsterActive.filter(x => x.id == database.id).length < database.limit) {
            let monster = monsterModel(database);
            monsterActive.push(monster);
        }
    }, database.rate);
}

function monsterCollision() {
    monsterActive.forEach(monster => {
        bullets.forEach(bullet => {
            if(utilities.overlapObjects(monster,bullet)){
                utilities.removeObject(bullet, bullets);
                utilities.removeObject(monster, monsterActive);
            }
        });
    });
}

function monsterRender() {
    monsterActive.forEach(function (monster) { 
        for (let i = 0; i < monsterActive.length; i++) {

            if (monster.name != monsterActive[i].name) {
                if (utilities.overlapObjects(monster, monsterActive[i])) {

                    const vector = utilities.unitVector(monster, monsterActive[i]);

                    //Adjust the gap between monsters
                    if (vector.mag < monster.w) {
                        const angle = Math.atan2(vector.dy, vector.dx);
                        const targetX = monsterActive[i].x + Math.cos(angle) * monster.w;
                        const targetY = monsterActive[i].y + Math.sin(angle) * monster.h;

                        monster.x = targetX;
                        monster.y = targetY;
                    }
                }
            }
        }

        for (let i = 0; i < monster.func.length; i++) {
            monster.func[i](monster);
        }

        utilities.drawSquare(monster.x, monster.y, monster.w, monster.h, monster.c, true);
    })
}

function bulletsRender(){
    
    bullets.forEach(bullet => {
        if      (bullet.d == "ArrowUp") { bullet.y -= bullet.s;}
        else if (bullet.d == "ArrowDown") { bullet.y += bullet.s;}
        else if (bullet.d == "ArrowLeft") { bullet.x -= bullet.s;}
        else if (bullet.d == "ArrowRight") { bullet.x += bullet.s;}
        
        if(utilities.outOfBounds(bullet.x, bullet.y)){
            utilities.removeObject(bullet,bullets);
        }

        utilities.drawSquare(
            bullet.x,
            bullet.y, 
            bullet.w, 
            bullet.h, 
            player.c);
    });    
}

function playerRender() {
    player.playerMovement();
    utilities.drawSquare(player.x, player.y, player.w, player.h, player.c, true);
}

function renderCanvas() {
    utilities.drawSquare(0, 0, canvas.width, canvas.height,"black");
}

function animate() {
    renderCanvas();
    bulletsRender();
    monsterRender();
    monsterCollision();
    playerRender();
    requestAnimationFrame(animate);
}

animate();

document.addEventListener('keydown', function(e) {
    if(e.key == 'ArrowUp'){ bullets.push(new Bullet(player.x, player.y, "ArrowUp"))}
    else if(e.key == 'ArrowDown'){ bullets.push(new Bullet(player.x, player.y, "ArrowDown"))}
    else if(e.key == 'ArrowLeft'){ bullets.push(new Bullet(player.x, player.y, "ArrowLeft"))}
    else if(e.key == 'ArrowRight'){ bullets.push(new Bullet(player.x, player.y, "ArrowRight"))}
})

document.addEventListener("keydown", function (e) {
    player.playerEventMovement(e, true);
});

document.addEventListener("keyup", function (e) {
    player.playerEventMovement(e, false);
});
