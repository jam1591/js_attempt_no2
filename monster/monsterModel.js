const monsterDatabase = [
    {
        id: 0,
        label: "Swarm",
        speed: 1.1,
        c: "red",
        w: 20,
        h: 20,
        rate: 700,
        func: [
            monsterMovement],
        limit: 50
    },
    {
        id: 1,
        label: "Archer",
        speed: 0,
        c: "blue",
        w: 40,
        h: 40,
        rate: 500,
        func: [monsterFireArrow],
        limit: 1
    },
    {
        id: 2,
        label: "Tank",
        speed: 0.15,
        c: "green",
        w: 70,
        h: 70,
        rate: 5000,
        func: [monsterBigger, monsterMovement],
        limit: 2
    },
    {
        id: 3,
        label: "Boss",
        speed: 1.5,
        c: "purple",
        w: 150,
        h: 150,
        rate: 10000,
        func: [monsterFireArrow,monsterBigger,monsterMovement],
        limit: 1
    }
]

function monsterModel(database) {
    let monster = {
        id: database.id,
        func: database.func,
        name: Math.random(),
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
        w: database.w,
        h: database.h,
        c: database.c,
        speed: database.speed
    };

    function addArrowModel(){
        for (let i = 0; i < monster.func.length; i++) {
            if (monster.func[i].name == "monsterFireArrow") {
                monster.arrow = {
                    x: monster.x,
                    y: monster.y,
                    w: 7,
                    h: 7,
                    vector: utilities.unitVector(monster, player),
                    speed: 4
                };
            }
        }
    }

    addArrowModel();

    return monster;
}