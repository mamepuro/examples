function Bullet() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.isAlive = false;
    this.texture = null;
    this.sprite = null;
}

Bullet.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.isAlive = true
    this.texture = new PIXI.Texture.from('examples/assets/bunny.png');
    this.sprite = new PIXI.Sprite(bunnyT);
}

Bullet.prototype.move = function () {
    moveX = destinationPointX - this.x;
    moveY = destinationPointY - this.y;
    length = Math.sqrt(moveX * moveX + moveY * moveY);
    moveX = moveX / length * 3;
    moveY = moveY / length * 3;
    this.x += moveX;
    this.y += moveY;
    this.z += 1;
}
const app = new PIXI.Application({
    width: 480, height: 270, backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

app.loader.add('background', 'examples/assets/3.png');
//app.loader.load(setup);
const UP = 0;
const RIGHT = 1;
const LEFT = 2;
const DOWN = 3;
const BULLET_COUNT = 60;
const BULLET_MOVE_VELOCITY = 3;
const INTERVAL_TIME = 30;
const BULLET_VISIBLE_INTERVAL = 2;
const ENEMY_SPAWN_1 =

    keyState = [];
keyState[UP] = false;
keyState[RIGHT] = false;
keyState[LEFT] = false;
keyState[DOWN] = false;
rightMax = 450;
leftMax = 50;
Time = 0;
destinationPointX = app.screen.width / 2;
destinationPointY = app.screen.height / 2 - 80;
aliveBullet = false;
bulletZ = 0;
isInterval = false;
count = 0;
var cbullet = new Array(BULLET_COUNT);
var alive = new Array(BULLET_COUNT);
var enemys = new Array(BULLET_COUNT);
let bunnyT = new PIXI.Texture.from('examples/assets/bunny.png');
for (i = 0; i < BULLET_COUNT; i++) {
    cbullet[i] = new PIXI.Sprite(bunnyT);
    cbullet[i].x = 0;
    cbullet[i].y = 0;
    cbullet[i].count = 0;
    cbullet[i].isVisibleInterval = false;
    cbullet[i].intervalCount = 0;
    enemys[i] = new PIXI.Sprite(bunnyT);
    enemys[i].x = 0;
    enemys[i].y = 0;
    enemys[i].z = 0;
    enemys[i].anchor.x = 0.5;
    enemys[i].anchor.y = 0.5;
    enemys[i].destinationX = 0;
    enemys[i].count = 0;
    enemys[i].isAlive = false;
    alive[i] = false;
}



const container = new PIXI.Container();

app.stage.addChild(container);

let backT = new PIXI.Texture.from('examples/assets/3.png');
let backS = new PIXI.Sprite(backT);
let texture = new PIXI.Texture.from('examples/assets/chara01.png');
let sprite = new PIXI.Sprite(texture);
//let bunnyT = new PIXI.Texture.from('examples/assets/bunny.png');
let bullet = new PIXI.Sprite(bunnyT);


backS.x = 0;
backS.y = 0;
backS.zIndex = 0;
app.stage.addChild(backS);

sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;
sprite.x = app.screen.width / 2;
sprite.y = 220;
app.stage.addChild(sprite);
const basicText = new PIXI.Text('Score:', { fontFamily: 'Arial', fontSize: 16, fill: 0xff1010, align: 'center' });
basicText.x = 0;
basicText.y = 0;

app.stage.addChild(basicText);

window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        keyState[RIGHT] = true;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        keyState[LEFT] = true;
    }
    if (e.key === 'Enter') {
        keyState[UP] = true;
    }
})

window.addEventListener('keyup', e => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        keyState[RIGHT] = false;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        keyState[LEFT] = false;
    }
    if (e.key === 'Enter') {
        keyState[UP] = false;
    }
})

function move() {
    for (i = 0; i < BULLET_COUNT; i++) {
        if (alive[i]) {
            moveX = destinationPointX - cbullet[i].x;
            moveY = destinationPointY - cbullet[i].y;
            length = Math.sqrt(moveX * moveX + moveY * moveY);
            moveX = moveX / length * BULLET_MOVE_VELOCITY;
            moveY = moveY / length * BULLET_MOVE_VELOCITY;
            cbullet[i].x += moveX;
            cbullet[i].y += moveY;
            cbullet[i].z += 1;
            if (cbullet[i].intervalCount > BULLET_VISIBLE_INTERVAL) {
                cbullet[i].isVisibleInterval = false;
                cbullet[i].intervalCount = 0;
            }
            if (cbullet[i].isVisibleInterval) {
                cbullet[i].visible = true;
                cbullet[i].intervalCount++;
            }
            else {
                cbullet[i].visible = false;
            }
            if (cbullet[i].z % 12 == 0) {
                cbullet[i].count += 1;
                cbullet[i].scale.set((0.7 ** cbullet[i].count));
                cbullet[i].visible = true;
                cbullet[i].isVisibleInterval = true;
            }
            if (length < 10) {
                alive[i] = false;
                cbullet[i].visible = false;
                cbullet[i].z = 0;
                cbullet[i].count = 0;
            }
        }
    }
}

function EnemyMove() {
    for (i = 0; i < BULLET_COUNT; i++) {
        if (enemys[i].isAlive) {
            if (Time % 5 == 0) {
                moveX = enemys[i].destinationX - enemys[i].x;
                moveY = 270 - enemys[i].y;
                length = Math.sqrt(moveX * moveX + moveY * moveY);
                moveX = moveX / length * 1;
                moveY = moveY / length * 1;
                enemys[i].x += moveX;
                enemys[i].y += moveY;
                enemys[i].z += 1;
                enemys[i].count++;
            }
            if (enemys[i].count % 15) {
                enemys[i].scale.set(enemys[i].z * 0.01);
            }
            if (enemys[i].y >= sprite.y) {
                enemys[i].visible = false;
                enemys[i].isAlive = false;
            }
            if (enemys[i].z < 40) {
                //enemys[i].visible = false;
            }
        }
    }
}

function CalcEnemiesDestinationX(spawnX) {
    //240 = window.width / 2
    let diff = spawnX - 240;
    return diff * 24 + 240;
}

function UpdateIntervalTimer() {
    if (isInterval) {
        count++;
        if (count > INTERVAL_TIME) {
            isInterval = false;
        }
    }
}

app.ticker.add((delta) => {
    if (keyState[RIGHT] && sprite.x < rightMax) {
        sprite.x += 2;
        destinationPointX += 0.05;
    }
    if (keyState[LEFT] && sprite.x > leftMax) {
        sprite.x -= 2;
        destinationPointX -= 0.05;
    }
    if (sprite.x < leftMax) {
        sprite.x = leftMax;
    }
    if (sprite.x > rightMax) {
        sprite.x = rightMax;
    }
    if (keyState[UP] && !aliveBullet) {
        fireBullet();
    }
    move();
    if (!isInterval) {
        for (i = 0; i < BULLET_COUNT; i++) {
            if (!alive[i]) {
                alive[i] = true;
                cbullet[i].x = sprite.x;
                cbullet[i].y = sprite.y;
                cbullet[i].z = 0;
                cbullet[i].visible = true;
                app.stage.addChild(cbullet[i]);
                isInterval = true;
                count = 0;
                break;
            }
        }
    }
    if (Time % 180 == 0) {
        for (i = 0; i < BULLET_COUNT; i++) {
            if (!enemys[i].isAlive) {
                enemys[i].isAlive = true;
                spwanX = Math.random() * (250 - 230) + 230;
                enemys[i].x = spwanX;
                enemys[i].destinationX = CalcEnemiesDestinationX(enemys[i].x);
                enemys[i].y = 68;
                enemys[i].z = 0;
                enemys[i].visible = true;
                app.stage.addChild(enemys[i]);
                break;
            }
        }
        Time = 0;
    }
    EnemyMove();
    UpdateIntervalTimer();
    Time++;
    basicText.text = "Score:" + Time;
})