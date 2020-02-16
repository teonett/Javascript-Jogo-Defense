var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var mouse = controls.captureMouse(canvas);

var turrets = [];
var turretCooldown = 5;
var turretCount = 0;

var bullets = [];

var enemies = [];
var enemySpawnDelayMs = 550;
var canSpawnEnemies = true;
var enemiesHit = 0;

var points = 50;
var score = 0;
var accuracy = 0;
var shotsFired = 0;
var enemiesSpawned = 0;

function Turret (x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.rotation = 0;
    this.size = 40;
    this.color = "#808080";
    this.isFiring = true;
    this.cooldown = 50;
    this.count = 31;
    this.cannonWidth = 15;
    this.cannonHeight = 50;
}

Turret.prototype.draw = function () {

    context.save();

    context.beginPath();
    context.arc(this.x, this.y, 45, 0, 4*Math.PI, true);
    context.fillStyle = "#b3b3b3";
    context.stroke();
    context.fill();
    
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2*Math.PI, true);
    context.fillStyle = "#737373";
    context.stroke();
    context.fill();

    context.beginPath();
    context.arc(this.x, this.y, 32, 0, 2*Math.PI, true);
    context.fillStyle = "#4d4d4d";
    context.stroke();
    context.fill();

    context.beginPath();
    context.arc(this.x, this.y, 25, 0, 2*Math.PI, true);
    context.fillStyle = "#333333";
    context.stroke();
    context.fill();

    context.beginPath();
    context.arc(this.x, this.y, 15, 0, 2*Math.PI, true);
    context.fillStyle = "#262626";
    context.stroke();
    context.fill();
    
    context.beginPath();
    context.translate(this.x, this.y);
    context.rotate(this.rotation + Math.PI / 2);
    context.fillStyle = this.color;
    context.fillRect(-this.cannonWidth / 2, 0, this.cannonWidth, -this.cannonHeight);
    context.strokeRect(-this.cannonWidth / 2, 0, this.cannonWidth, -this.cannonHeight);
    context.restore();		
}

function Bullet(x, y, targetx, targety) {
    this.x = x;
    this.y = y;
    this.damage = 1;
    this.velocity = 7;
    this.radius = 7;
    this.color = "linear-gradient(to top, #000000 0%, #ffffff 100%)";
    this.targetx = targetx;
    this.targety = targety;
    this.angle = 0;
}

Bullet.prototype.draw = function () {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
    context.fillStyle = this.color;
    context.stroke();
    context.fill();
    context.restore();
}

function Enemy(x, y) {
    this.hp = 5;
    this.x = x;
    this.y = y;
    this.color = "blue";
    this.radius = 17;
    this.velocity = 2;
    this.eyeRadius = 5;
}

Enemy.prototype.draw = function () {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
    context.fillStyle = "#4169E1";
    context.stroke();
    context.fill();
    
    context.restore();
    
    context.save();
    context.beginPath();
    
    min = 1;
    max = 9;

    switch (this.hp) {

        case 1:
            context.save();
            
            context.strokeStyle = "#FFFFFF";
            context.fillStyle = "#FFFFFF";
            context.arc(this.x, this.y, this.radius, 3, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.beginPath();
            context.strokeStyle = "blue";
            context.fillStyle = "#4169E1";
            context.arc(this.x, this.y + (this.radius / 2), this.eyeRadius + 1, 0, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.restore();
            
            break;

        case 2:
            context.save();
            
            context.strokeStyle = "#ff00ff";
            context.fillStyle = "#ff00ff";
            context.arc(this.x, this.y, this.radius, 3, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.beginPath();
            context.strokeStyle = "gray";
            context.fillStyle = "#4169E1";
            context.arc(this.x, this.y + (this.radius / 2), this.eyeRadius + 1, 0, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.restore();
                    
            break;            

        case 3:
            context.save();
            
            context.strokeStyle = "#ff0000";
            context.fillStyle = "#ff0000";
            context.arc(this.x, this.y, this.radius, 3, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.beginPath();
            context.strokeStyle = "purple";
            context.fillStyle = "#4169E1";
            context.arc(this.x, this.y + (this.radius / 2), this.eyeRadius + 1, 0, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.restore();

            break;

        case 4:
            context.save();
            
            context.strokeStyle = "#FFFFFF";
            context.fillStyle = "#FFFFFF";
            context.arc(this.x, this.y, this.radius, 3, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.beginPath();
            context.strokeStyle = "yellow";
            context.fillStyle = "#4169E1";
            context.arc(this.x, this.y + (this.radius / 2), this.eyeRadius + 1, 0, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.restore();

            break;            

        case 5:
            context.save();
            
            context.strokeStyle = "#FFFFFF";
            context.fillStyle = "#FFFFFF";
            context.arc(this.x, this.y, this.radius, 3, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.beginPath();
            context.strokeStyle = "pink";
            context.fillStyle = "#4169E1";
            context.arc(this.x, this.y + (this.radius / 2), this.eyeRadius + 1, 0, 2*Math.PI, true);
            context.stroke();
            context.fill();
            context.restore();
            context.restore();

            break;

            default: 
                this.hp--;   //bug fix
    }
    
    context.restore();
    context.restore();
}

function drawBackground() {
    context.save();
    context.fillStyle = "#000080";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = "#4169E1";
    context.fillRect(canvas.width / 4, 0, canvas.width / 2, canvas.height);

    context.fillStyle = "#FFFFFF";
    context.font="30px Consolas";
    context.fillText("Limite: ", 11, 40); 
    context.restore();

    context.fillStyle = "#FFFFFF";
    context.font="40px Consolas";
    context.fillText(points, 11, 80); 
    context.restore();
    
    context.fillStyle = "#FFFFFF";
    context.font="30px Consolas";
    context.fillText("Disparos: ", 11, 150); 
    context.restore();

    context.fillStyle = "#FFFFFF";
    context.font="40px Consolas";
    context.fillText(shotsFired, 11, 190); 
    context.restore();

    context.fillStyle = "#FFFFFF";
    context.font="30px Consolas";
    context.fillText("Total Inimigos: ", 755, 40); 
    context.restore();

    context.fillStyle = "#FFFFFF";
    context.font="40px Consolas";
    context.fillText(enemiesSpawned, 755, 80); 
    context.restore();
    
    context.fillStyle = "#FFFFFF";
    context.font="30px Consolas";
    context.fillText("Abatidos: " , 755, 150); 
    context.restore();

    context.fillStyle = "#FFFFFF";
    context.font="40px Consolas";
    context.fillText(score, 755, 190); 
    context.restore();

    context.fillStyle = "#FFFFFF";
    context.font="30px Consolas";
    context.fillText("Precisão: " , 755, 550); 
    context.restore();

    var precisao = (enemiesHit / shotsFired) * 100;
    context.fillStyle = "#FFFFFF";
    context.font="40px Consolas";
    context.fillText(precisao.toFixed(2) + "%", 755, 590); 
    context.restore();

}

function setBulletAngle(bullet) {
    var dx = mouse.x - bullet.x;
    var dy = mouse.y - bullet.y;
    bullet.angle = Math.atan2(dy, dx);
    return bullet.angle;
}

function setTurretAngle(turret) {
    var dx = mouse.x - turret.x;
    var dy = mouse.y - turret.y;
    turret.angle = Math.atan2(dy, dx);
    return turret.angle;
}

function checkCollision(bullet) {
    var dx = 0;
    var dy = 0;
    var distance;
    
    for (var i = 0; i < enemies.length; i++) {
        dx = bullet.x - enemies[i].x;
        dy = bullet.y - enemies[i].y;
        distance = Math.sqrt(dx * dx + dy * dy);    //find hypotenuse
        if (distance < (bullet.radius + enemies[i].radius)) {  //Hit!
            enemies[i].hp--;
            enemiesHit++;
            console.log("hits:" + enemiesHit);
            return true;
        }
    }
    return false;
}

function youLose(){
    accuracy = (enemiesHit / shotsFired) * 100;
    context.save();
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2.5);
    context.fill();
    context.stroke();
    context.strokeStyle = "#FFFFF";
    context.fillStyle = "#FFFFFF";
    context.font = "35px Courier";
    context.fillText("Que pena, você perdeu!", (canvas.width / 4) + 26, (canvas.height / 4) + 65);
    context.fill();
    context.stroke();
    context.font = "20px Verdana";
    context.fillText("Total de Inimigos : " + enemiesSpawned, 280, 260);
    context.fillText("Inimigos Abatidos: " + score, 280, 300);
    context.fillText("Precisão: " + accuracy.toFixed(2) + "%", 280, 340);
    
    context.fill();
    context.stroke();
    context.font = "25px Verdana";
    window.setTimeout( function() { 
    context.fillText("(Clique para tentar novamente)", 280, 420);
    canvas.addEventListener('mousedown', function () {
        location.reload();
    }, false);
     }, 2000);
}

var turret1 = new Turret(200, 425);
turrets.push(turret1);

var turret2 = new Turret(200, 325);
turrets.push(turret2);

var turret3  = new Turret(800, 425);
turrets.push(turret3);

var turret4 = new Turret(800, 325);
turrets.push(turret4);

(function update() {
    if (points >= 0){
        window.requestAnimationFrame(update, canvas);
        drawBackground();
         
        if (canSpawnEnemies) {
            var enemy = new Enemy(controls.getRandomInt((canvas.width / 4) + 30, (canvas.width / 4) * 3) - 15, 0);
            enemies.push(enemy);
            enemiesSpawned++;
            canSpawnEnemies = false;
            window.setTimeout( function() { canSpawnEnemies = true; }, enemySpawnDelayMs);
        }
        
        canvas.addEventListener('mousedown', function () {
            
            if (turretCount > turretCooldown) {
            for (var i = 0; i < turrets.length; i++) {
                
                var turret = turrets[i];
                
                    var bullet = new Bullet(turret.x,turret.y, mouse.x, mouse.y);
                    bullets.push(bullet);
                    shotsFired++;
                    console.log("shots:" + shotsFired);
                    setBulletAngle(bullet);
                    var bulletStart = bullet.radius + turret.cannonHeight;

                    bullet.y = (turret.y + (Math.sin(bullet.angle) * bulletStart));
                    bullet.x = (turret.x + (Math.cos(bullet.angle) * bulletStart));
                    
                }
                    
                    turretCount = 0;
                    
                }
            
        }, false);
        
        turretCount++;
        
        for (var i = 0; i < turrets.length; i++) {
            turrets[i].rotation = setTurretAngle(turrets[i]);
            turrets[i].draw();
        }
        
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].hp <= 0) {
                enemies.splice(i, 1);
                score++;
                if (score === 20) {
                    enemySpawnDelayMs *= 3/4;
                } else if (score === 50) {
                    enemySpawnDelayMs *= 3/4;
                } else if (score === 100) {
                    enemySpawnDelayMs *= 1/2;
                }
            } else {
                if (enemies[i].y > canvas.height) {
                    enemies[i].y = 0;
                    enemies[i].x = controls.getRandomInt((canvas.width / 4) + 30, (canvas.width / 4) * 3) - 15
                    enemies[i].velocity += 0.5;
                    points--;
                        
                } else {
                    enemies[i].y += enemies[i].velocity;
                }
                enemies[i].draw();
            }
        }

        for (var i = 0; i < bullets.length; i++) {
            var bullet = bullets[i];
            
            bullet.x += Math.cos(bullet.angle) * bullet.velocity;
            bullet.y += Math.sin(bullet.angle) * bullet.velocity;
                            
            if (bullet.x > canvas.width || bullet.x < 0 || bullet.y > canvas.height || bullet.y < 0) {  //remove bullet from arry if it reaches border of canvas
                bullets.splice(i, 1);
            } else if (checkCollision(bullet)) {
                bullets.splice(i, 1);
                
            } else {
                bullet.draw();
            }
        }	
    } else {
        youLose();
    }
}());