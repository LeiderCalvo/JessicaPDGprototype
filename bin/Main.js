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

        let img0 = app.loadImage("./src/gif1.gif");
        let img1 = app.loadImage("./src/gif0.gif");
        let img2 = app.loadImage("./src/Seleccionar.png");

        for (const prop in preguntas) {
            slides.push(new Pregunta(app, preguntas[prop], prop, img0, img1, img2));
        }
        app.smooth();
        seleccionada = slides[0];
    }

    app.draw = function () {
        app.background(255);
        app.textFont(app.fontBold);
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