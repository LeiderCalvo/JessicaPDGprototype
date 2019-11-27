class Pregunta {
    constructor(app, pregunta, id, contWhite, contPurple, selec) {
        this.app = app;
        this.pregunta = pregunta;
        this.id = parseInt(id);
        this.respSelc = 0;
        this.selected = this.pregunta.tipo === "intro" || this.pregunta.tipo === "subintro"? true : false;

        this.marginLeft = 50;
        this.marginTop = 80;
        this.img;
        this.selec = selec;

        this.pregunta.tipo === "intro"? this.img = contWhite : this.img = contPurple;
    }

    pintar(){
        this.app.textSize(40);
        this.app.fill("#8373FF");

        let textWidth = 1150;
        if (this.pregunta.tipo === "intro"){
            this.app.background("#8373FF");
            this.app.fill(255);
            this.app.textSize(80);
            this.marginTop = 123;
            textWidth = 500;

        }


        
        if(this.app.frameCount % 20 === 0){
            this.app.image(this.selected ? this.img : this.selec, 945, 650);
        }else {
            this.app.image(this.selected ? this.img : this.selec, 955, 650);
        }
        
        this.app.text(this.pregunta.titulo, this.marginLeft,this.marginTop, textWidth);
        /*this.app.rect(40, 80, 900, 50);
        console.log(title);
        console.log(this.app.textWidth(this.pregunta.titulo)/1000);
        */
        this.app.textFont(this.app.fontRegular);
        this.app.textSize(30);
        this.app.fill(0);

        if (this.pregunta.tipo === "subintro") {
                this.app.text(this.pregunta.descripcion, this.marginLeft, 200, textWidth-400);
                return;
        }else if (this.pregunta.tipo === "intro"){

            return;
        }

        for (let i = 0; i < this.pregunta.opciones.length; i++) {
            let  elem = this.pregunta.opciones[i];
            
            if(this.pregunta.tipo === "pregunta bifurcada") {
                elem = this.pregunta.opciones[i].respuesta;
            }

            this.app.noFill();
            this.app.stroke("#8373FF");
            this.app.strokeWeight(4);

            let dist = (this.app.textWidth(this.pregunta.titulo)/1000)*50 + this.marginTop + 80;

            if(this.respSelc == i){
                this.app.rect(this.marginLeft-15, dist-48 +(i*95), 900, 70);
            }

            this.app.rect(this.marginLeft, dist-40 +(i*95), 55, 55);

            if (this.selected && this.respSelc == i) {
                this.app.fill('#8373FF');
                this.app.noStroke();
                this.app.rect(this.marginLeft, dist-40 +(i*95), 55, 55);
            }

            this.app.fill(0);
            this.app.noStroke();

            this.app.text(elem, this.marginLeft + 90,dist +(i*95), 1150);
        }
    }

    keyboard(){
        if (this.app.keyCode === this.app.UP_ARROW) {
            if(this.pregunta.tipo.includes("pregunta") && this.selected === false){
                if(this.respSelc -1 >= 0) this.respSelc --;
            }
        } else if (this.app.keyCode === this.app.DOWN_ARROW) {
            if(this.pregunta.tipo.includes("pregunta") && this.selected === false){
                if(this.respSelc + 1 < this.pregunta.opciones.length)this.respSelc ++;
            }
        } else if (this.app.keyCode === this.app.RIGHT_ARROW) {

            if (this.selected) {
                let obj = {
                    val: "",
                    titulo: this.pregunta.titulo+"\r\n",
                    respuesta: ""
                };
    
                if (this.pregunta.tipo === "pregunta bifurcada") {
                    obj.val = parseInt(this.pregunta.opciones[this.respSelc].direccion);
                    obj.respuesta = this.pregunta.opciones[this.respSelc].respuesta +"\r\n";
                } else if (this.pregunta.tipo === "pregunta final") {
                    obj.val = 6;
                    obj.respuesta = this.pregunta.opciones[this.respSelc] +"\r\n";
                } else if (this.id === 6) {
                    obj.val = 0;
                    obj.respuesta = "";
                }else {
                    obj.val = this.id + 1;
                    obj.respuesta = this.pregunta.opciones === undefined? "" : this.pregunta.opciones[this.respSelc] +"\r\n";
                }
    
                return obj;    
            }else {
                this.selected = true;
            }
        }
    }
}