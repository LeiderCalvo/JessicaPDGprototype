new p5(function (app) {

    let preguntas;
    let slides = [];
    let seleccionada;
    let string = [];

    app.preload = function () {
        preguntas = app.loadJSON("./src/preguntas.json");
        app.fontRegular = app.loadFont('./src/Roboto-Regular.ttf');
        app.fontBold = app.loadFont('./src/Roboto-Bold.ttf');
    }

    app.setup = function () {
        app.frameRate(60);
        app.createCanvas(1280, 800);
            //console.log(preguntas);

        for (const prop in preguntas) {
            slides.push(new Pregunta(app, preguntas[prop], prop));
        }
        app.smooth();

        seleccionada = slides[0];
    }

    app.draw = function () {
        app.background(255);
        seleccionada.pintar();
    }
    
    app.keyPressed = function () {
       let a =  seleccionada.keyboard();
       if (a !== undefined) {
           seleccionada = slides[a.val];

           if(a.val === 0) {
                app.saveStrings(string, (Math.random()*100) +'usuario.txt');
           } else if (a.respuesta !== ""){
                string.push(a.titulo);
                string.push(a.respuesta);
           }
       }
    }

});