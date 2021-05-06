var canavs;
var database;

var drawing = []

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent('canvascontainer');
    database = firebase.database()
    background(51)
    var clearbutton = select('#clearbutton');

    clearbutton.mousePressed(clearDrawing)

}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }

}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}

 function clearDrawing() {
     db_drawing = []
     var drawingRef = database.ref('drawing')
     drawingRef.set({
        "d": []
    })
 }

/*function clearDrawing() {
    db_drawing = [];
    var adaRef = database.ref('drawing');
    adaRef.remove()
}

/*
    <script src="https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-database.js"></script>


    <script>
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDetv11z5alLQk1Hxn_OLQexAJAwVbfizY",
            authDomain: "drawing-527dc.firebaseapp.com",
            databaseURL: "https://drawing-527dc.firebaseio.com",
            projectId: "drawing-527dc",
            storageBucket: "drawing-527dc.appspot.com",
            messagingSenderId: "524701590876",
            appId: "1:524701590876:web:f06cb97fab24c9346c8d99",
            measurementId: "G-WG79E28TJE"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    </script>


*/