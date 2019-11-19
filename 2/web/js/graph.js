const drawGraph = function () {
    const plot_canvas = document.getElementById("plot");
    const plot_context = plot_canvas.getContext("2d");
    let canvWidth = plot_canvas.width;
    //ДУГА
    plot_context.beginPath();
    plot_context.moveTo(canvWidth / 2, canvWidth / 2);
    plot_context.lineTo(canvWidth / 2, canvWidth / 6);
    plot_context.arc(canvWidth / 2, canvWidth / 2, canvWidth / 3, 3 * Math.PI / 2, 2 * Math.PI);
    plot_context.lineTo(canvWidth / 2, canvWidth / 2);
    plot_context.closePath();
    plot_context.strokeStyle = "#ff0012";
    plot_context.fillStyle = "#12ff27";
    plot_context.fill();
    plot_context.stroke();
    //Прямоугольник
    plot_context.beginPath();
    plot_context.moveTo(canvWidth / 2, canvWidth / 2);
    plot_context.rect(canvWidth / 2, canvWidth / 2, canvWidth / 6, canvWidth / 3);
    plot_context.closePath();
    plot_context.strokeStyle = "#ff0012";
    plot_context.fillStyle = "#8713ff";
    plot_context.fill();
    plot_context.stroke();
    //Триугольник
    plot_context.beginPath();
    plot_context.moveTo(canvWidth / 2, canvWidth / 2);
    plot_context.lineTo(canvWidth / 3, canvWidth / 2);
    plot_context.lineTo(canvWidth / 2, 5 * canvWidth / 6);
    plot_context.lineTo(canvWidth / 2, canvWidth / 2);
    plot_context.closePath();
    plot_context.strokeStyle = "#ff0012";
    plot_context.fillStyle = "#10e9ff";
    plot_context.fill();
    plot_context.stroke();
    //Ox
    plot_context.beginPath();
    plot_context.moveTo(canvWidth / 10, canvWidth / 2);
    plot_context.lineTo(canvWidth * 0.9, canvWidth / 2);
    plot_context.lineTo(9 * canvWidth / 10 - 5, canvWidth / 2 - 5);
    plot_context.moveTo(9 * canvWidth / 10, canvWidth / 2);
    plot_context.lineTo(9 * canvWidth / 10 - 5, canvWidth / 2 + 5);
    //Oy
    plot_context.moveTo(canvWidth / 2, canvWidth / 10);
    plot_context.lineTo(canvWidth / 2 - 5, canvWidth / 10 + 5);
    plot_context.moveTo(canvWidth / 2, canvWidth / 10);
    plot_context.lineTo(canvWidth / 2 + 5, canvWidth / 10 + 5);
    plot_context.moveTo(canvWidth / 2, canvWidth / 10);
    plot_context.lineTo(canvWidth / 2, 9 * canvWidth / 10);
    plot_context.moveTo(canvWidth / 10, canvWidth / 2);
    //r
    plot_context.moveTo(canvWidth / 6, canvWidth / 2 + 5);
    plot_context.lineTo(canvWidth / 6, canvWidth / 2 - 5);
    plot_context.moveTo(5 * canvWidth / 6, canvWidth / 2 + 5);
    plot_context.lineTo(5 * canvWidth / 6, canvWidth / 2 - 5);
    plot_context.moveTo(canvWidth / 2 + 5, canvWidth / 6);
    plot_context.lineTo(canvWidth / 2 - 5, canvWidth / 6);
    plot_context.moveTo(canvWidth / 2 + 5, 5 * canvWidth / 6);
    plot_context.lineTo(canvWidth / 2 - 5, 5 * canvWidth / 6);
    plot_context.fillStyle = "#000";
    plot_context.fillText("-R", canvWidth / 6, canvWidth / 2 + 15);
    plot_context.fillText("R", 5 * canvWidth / 6, canvWidth / 2 + 15);
    plot_context.fillText("R", canvWidth / 2 - 15, canvWidth / 6);
    plot_context.fillText("-R", canvWidth / 2 - 17, 5 * canvWidth / 6);
    plot_context.closePath();
    plot_context.stroke();
}

function getCursorPosition(e) {
    let x;
    let y;
    const plot_canvas = document.getElementById("plot");
    if (e.pageX !== undefined && e.pageY !== undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    return {
        x: x - plot_canvas.getBoundingClientRect().left,
        y: y - plot_canvas.getBoundingClientRect().top
    }
}

function drawPointByCursor(e) {
    const r = $('input[name=r_value]:checked', '#form').val();

    if (r === undefined || r === '') {
        document.querySelector('#error-log').textContent =
            "Выберите значение R!";
    } else {
        const point = getCursorPosition(e);
        const plot_canvas = document.getElementById("plot");
        const plot_context = plot_canvas.getContext("2d");
        plot_context.beginPath();
        plot_context.arc(point.x,point.y,3,0,2*Math.PI);
        point.x = (point.x - 150) / 100 * r;
        point.y = (-point.y + 150) / 100 * r;
        $.ajax({
            type: "POST",
            url: "controller",
            data:
                {
                    x_value: point.x.toFixed(2),
                    y_value: point.y.toFixed(2),
                    r_value: r
                },
            success: data => {
                document.querySelector('#ans').innerHTML = data;
                plot_context.fillStyle = '#000000';
                plot_context.fill();

            },
            error: (jqXHR, textStatus, errorThrown) =>
                document.querySelector('#error-log').innerHTML = "Ошибка HTTP: " + errorThrown + "<br>" + "Статус-" + jqXHR.status + "<br>" + "(Курсор вне зоны ОДЗ)",
            dataType: "html"
        });
    }
}

function drawPointBySubmit(x, y, r) {
    let NewX = (100 * x / r + 150);
    let NewY = (-y * 100 / r + 150);
    const plot_canvas = document.getElementById("plot");
    const plot_context = plot_canvas.getContext("2d");
    plot_context.beginPath();
    plot_context.arc(NewX,NewY,3,0,2*Math.PI);
    plot_context.closePath();
    plot_context.fillStyle = '#000000';
    plot_context.fill();
}

function ChangeR() {
    const canvas = document.getElementById("plot");
    const canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawGraph();
    let r = $('input[name=r_value]:checked', '#form').val();
    PointHistory(r);
}

function PointHistory(currR) {
    const table = document.getElementsByClassName("table-row");
    for (let i = 0; i < table.length; i++) {

        let xDIV = document.getElementsByClassName('table-data');
        let yDIV = document.getElementsByClassName('table-data');
        let rDIV = document.getElementsByClassName('table-data');
        let x = parseFloat(xDIV[6*i].innerHTML);
        let y = parseFloat(yDIV[6*i+1].innerHTML);
        let r = parseFloat(rDIV[6*i+2].innerHTML);
        let pointX = (100 * x / r) * r / currR + 150;
        let pointY = 150 - ((100 * y / r) * r / currR);
        const plot_canvas = document.getElementById("plot");
        const plot_context = plot_canvas.getContext("2d");
        plot_context.beginPath();
        plot_context.arc(pointX,pointY,2,0,2*Math.PI);
        plot_context.closePath();
        plot_context.stroke();
    }

}
