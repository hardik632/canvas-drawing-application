    var dataURL;
    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var col = "black",
        y = 2;
    
    function init() {
        canvas = document.getElementById('can');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
    
        canvas.addEventListener("mousemove", function (e) {
            coordinates('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            coordinates('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            coordinates('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            coordinates('out', e)
        }, false);
    }
    
    function color(obj) {
        switch (obj.id) {
            case "red":
                col = "red";
                break;
            case "green":
                col = "green";
                break;
            case "yellow":
                col = "yellow";
                break;
            case "blue":
                col = "blue";
                break;
        }    
    }
    
    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = col;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
    
    
    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        
        // document.getElementById("canvasimg").src = dataURL;
        // document.getElementById("canvasimg").style.display = "inline";
    }
    
    function coordinates(res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
    
            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = col;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }

   
function download(){
    var pdf = new jsPDF();
    dataURL = canvas.toDataURL();
    console.log(dataURL);
    pdf.addImage(dataURL, 'JPEG', 15, 40, 180, 160);
    pdf.save('drawing.pdf');
}
