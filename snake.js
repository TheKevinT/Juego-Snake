const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');


//crear la unidad
const box = 32;

//cargar imagenes
const ground = new Image();
ground.src = "./img/canvas.png";

const foodImg = new Image();
foodImg.src = "./img/manzana.png";


//cargar audio
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "./audio/dead.mp3";
eat.src = "./audio/eat.mp3";
up.src = "./audio/up.mp3";
right.src = "./audio/right.mp3";
left.src = "./audio/left.mp3";
down.src = "./audio/down.mp3";




//crear la serpiente *****como objetos

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//crear la comida

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//crear el puntaje 

let score = 0;


//crear el control para la snake
let d;

document.addEventListener('keydown', direction);

function direction(e) {

    let key = e.keyCode;

    if (key == 37 && d != "RIGHT") {
        //cargar sonido
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        up.play();
        d = "UP";

    } else if (key == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT";

    } else if (key == 40 && d != "UP") {
        down.play();
        d = "DOWN";
    }


}

//revisar colision

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}



//dibujar todo el canvas

function draw() {
    ctx.drawImage(ground, 0, 0);

    //hacer un cuadrito 

    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    // hacer asomar la manzana ****al refrescar cambia de posicio
    ctx.drawImage(foodImg, food.x, food.y);

    //la antigua posición de la cabeza
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    //cada direccion

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //si la serpiente come pues se incrementa su cola

    if (snakeX == food.x && snakeY == food.y) {

        //aumenta puntaje 
        score++;
        eat.play();
        //genera mas comida

        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }

        //no se elimina la cola
    } else {
        //quitar la cola 
        snake.pop();

    }

    //añadir una nueva cabeza

    let newHead = {
        x: snakeX,
        y: snakeY
    }


    //regla para perder el juego 

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();


        //mensaje emergente si deseas volver a jugar 
        const respuesta = confirm("!!PERDISTE\nQuires volver a jugar ?");

        //Detectamos si el usuario acepto el mensaje
        if (respuesta) {

            location.reload();
        }
        //Detectamos si el usuario denegó el mensaje
        else {
            alert("¡Gracias por jugar!");
        }
    }


    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";

    //mostrar la caja de puntaje 
    ctx.fillText(score, 2 * box, 1.6 * box);

}

//llamar a la funcion dibujar todo los 100ms

let game = setInterval(draw, 100);