//variables globales
var velocidad = 80;
var tamano = 10;
var canvas = document.getElementById('canvas');
// canvas.width = screen.width;
// canvas.height = screen.height;

class Objeto {
	constructor(tamano){
		this.tamano = tamano;
	}
	choque(obj){
		var difx = Math.abs(this.x - obj.x);
		var dify = Math.abs(this.y - obj.y);
		if (difx >= 0 && difx < tamano && dify >= 0 && dify < tamano){
			return true;
		}else{
			return false;
		}
	}
}

class Cola extends Objeto{
	constructor(tamano, x, y){
		super(tamano);
		this.x = x;
		this.y = y;
		this.siguiente = null;
	}
	dibujar(ctx){
		if (this.siguiente != null){
			this.siguiente.dibujar(ctx);
		}
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
	setxy(x, y){
		if(this.siguiente != null){
			this.siguiente.setxy(this.x, this.y);
		}
		this.x = x;
		this.y = y;
	}
	meter(){
		if(this.siguiente == null){
			this.siguiente = new Cola(this.tamano, this.x, this.y);
		}else{
			this.siguiente.meter();
		}
	}
	colisiona(obj){
		if(this.choque(obj)){
			return true;
		}else if(this.siguiente != null){
			return this.siguiente.colisiona(obj);
		}else{
			return false;
		}
	}
	revision(){
		if(this.siguiente != null){
			return this.siguiente.colisiona(this);
		}else{
			return false;
		}
	}
}

class Comida extends Objeto{
	constructor(tamano){
		super(tamano);
		this.x = this.generarx();
		this.y = this.generary();
	}
	colocar(){
		this.x = this.generarx();
		this.y = this.generary();
	}
	dibujar(ctx){
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
	generarx(){
		//entre 0 y 500
		var tamx = canvas.width / 10;
		var num = Math.floor(Math.random() * tamx) * 10;
		return num;
	}
	generary(){
		//entre 0 y 500
		var tamy = canvas.height / 10;
		var num = Math.floor(Math.random() * tamy) * 10;
		return num;
	}
}

class Pantalla{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.height = canvas.height;
		this.width = canvas.width;
	}
	mantenerx(snake){
		if(snake.x < 0){
			snake.x = this.width - tamano;
		}else if(snake.x > this.width - tamano){
			snake.x = 0;
		}
	}
	mantenery(snake){
		if(snake.y < 0){
			snake.y = this.height - tamano;
		}else if(snake.y > this.height - tamano){
			snake.y = 0;
		}
	}
}

//objetos del juego
var cabeza = new Cola(tamano, 20, 20);
var comida = new Comida(tamano);
var pantalla = new Pantalla();
var ejex = true;
var ejey = true;
var xdir = 0;
var ydir = 0;

function movimiento(){
	var nx = cabeza.x + xdir;
	var ny = cabeza.y + ydir;
	cabeza.setxy(nx, ny);
	if(cabeza.choque(comida)){
		comida.colocar();
		cabeza.meter();
	}
	if(cabeza.revision()){
		console.log("toco");
	}
	if(xdir != 0){
		pantalla.mantenerx(cabeza);
	}
	if(ydir != 0){
		pantalla.mantenery(cabeza);
	}
}

var body = document.getElementById('body');
body.addEventListener("keydown",function(event){
	var cod = event.keyCode;
	//arriba 38
	//abajo 40
	//izquierda 37
	//derecha 39
	//console.log(cod);
	if(ejex){
		switch(cod){
			case 37:
				xdir = -tamano;
				ydir = 0;
				ejex = false;
				ejey = true;
				break;
			case 39:
				xdir = tamano;
				ydir = 0;
				ejex = false;
				ejey = true;
				break;
			default:
				break;
		}
	}
	if(ejey){
		switch(cod){
		case 38:
			ydir = -tamano;
			xdir = 0;
			ejey = false;
			ejex = true;
			break;
		case 40:
			ydir = tamano;
			xdir = 0;
			ejey = false;
			ejex = true;
			break;
		default:
			break;
		}
	}
});

function dibujar(){
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//aquí abajo va todo el dibujo
	cabeza.dibujar(ctx);
	comida.dibujar(ctx);
}

function main(){
	dibujar();
	movimiento();
}

//cada 80 milisegundos
setInterval(main, velocidad);