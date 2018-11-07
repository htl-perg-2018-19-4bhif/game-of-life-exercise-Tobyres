window.onload = () => {
    const cells = 200;
    const boardSize = cells * 4;

    class cell {
        x: number;
        y: number;
        id: number;
        alive: boolean;
    }

    let cellArr: cell[] = [];
    for (let i = 0; i < cells * cells; i++) {
        cellArr.push(new cell);
        cellArr[i].alive = false;
    }

    console.log(cellArr);

    // Get reference to canvas
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    canvas.width = canvas.height = boardSize;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
/*
    cellArr[0].alive = true;
    cellArr[1].alive = true;
    cellArr[200].alive = true;
    cellArr[201].alive = true;
    console.log(getNeighbourCount(0,0));
*/
    initBoard();

    // Call 'draw' function whenever browser renders a frame on the screen
    //window.requestAnimationFrame(draw);

    function draw() {
        // Demo code showing how to draw in the canvas
        ctx.clearRect(0, 0, boardSize, boardSize);

        for (let i = 0; i < cellArr.length; i++) {
            let neighbours = getNeighbourCount(cellArr[i].x, cellArr[i].y);
            if (cellArr[i].alive) {
                if (neighbours < 2) {
                    cellArr[i].alive = false;
                } else if (neighbours > 3) {
                    cellArr[i].alive = false;
                }
            } else if (neighbours == 3) {
                cellArr[i].alive = true;
            }
        }
        drawCells();
        console.log(cellArr);
        //window.requestAnimationFrame(draw);
    }

    function initBoard() {
        for (let i = 0; i < Math.floor((cells * cells) * 0.03); i++) {
            let x = Math.floor(Math.random() * (cells));
            let y = Math.floor(Math.random() * (cells));
            let index = x + (y * cells);
            cellArr[index].x = x;
            cellArr[index].y = y;
            cellArr[index].alive = true;
        }

        drawCells();
    }

    function drawCells() {
        for (let i = 0; i < cellArr.length; i++) {
            if (cellArr[i].alive) {
                ctx.fillRect(cellArr[i].x * 4, cellArr[i].y * 4, 4, 4);
            }
        }
    }

    function getNeighbourCount(x, y) {
        let count = 0;
        let index;

        for (let i = y - 1; i < y + 2; i++) {
            for (let j = x - 1; j < x + 2; j++) {
                if((i >= 0 && i < cells) && (j >= 0 && j < cells)) {
                    index = i + (j * cells);
                    if (cellArr[index].alive && (x + (y * cells) != index)) {
                        count++;
                    }
                }
            }
        }

        return count;
    }
}
