const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const moneyText = document.getElementById("money");
const fuelText = document.getElementById("fuel");
const deliveriesText = document.getElementById("deliveries");

let money = 0;
let fuel = 100;
let deliveries = 0;

const keys = {};

const player = {
    x:100,
    y:100,
    width:30,
    height:50,
    speed:4
};

let delivery = generateDelivery();

function generateDelivery(){
    return {
        x:Math.random()*900+50,
        y:Math.random()*500+50
    };
}

window.addEventListener("keydown", e=>{
    keys[e.key] = true;
});

window.addEventListener("keyup", e=>{
    keys[e.key] = false;
});

function update(){

    if(fuel > 0){

        if(keys["ArrowUp"] || keys["w"]) player.y -= player.speed;
        if(keys["ArrowDown"] || keys["s"]) player.y += player.speed;
        if(keys["ArrowLeft"] || keys["a"]) player.x -= player.speed;
        if(keys["ArrowRight"] || keys["d"]) player.x += player.speed;

        if(
            keys["ArrowUp"] ||
            keys["ArrowDown"] ||
            keys["ArrowLeft"] ||
            keys["ArrowRight"] ||
            keys["w"] ||
            keys["a"] ||
            keys["s"] ||
            keys["d"]
        ){
            fuel -= 0.02;
        }
    }

    const dx = player.x - delivery.x;
    const dy = player.y - delivery.y;
    const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < 40){
        deliveries++;
        money += 50;
        fuel = Math.min(100, fuel + 10);

        delivery = generateDelivery();
    }

    moneyText.textContent = money;
    fuelText.textContent = fuel.toFixed(0);
    deliveriesText.textContent = deliveries;
}

function drawRoads(){

    ctx.fillStyle = "#666";

    ctx.fillRect(150,0,80,600);
    ctx.fillRect(450,0,80,600);
    ctx.fillRect(750,0,80,600);

    ctx.fillRect(0,150,1000,80);
    ctx.fillRect(0,350,1000,80);
}

function drawDelivery(){
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(delivery.x, delivery.y, 20, 0, Math.PI*2);
    ctx.fill();
}

function drawPlayer(){
    ctx.fillStyle = "red";
    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

function render(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#5fa85f";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    drawRoads();
    drawDelivery();
    drawPlayer();
}

function gameLoop(){
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();