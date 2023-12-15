const drawingBoard = {
    set downloading(value) {
        this._downloading = value;
        this.draw();
    },
    get downloading() {
        return this._downloading;
    },
    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.shiftDown = false;
        this.ctrlDown = false;
        this.pixels = [];

        this.canvas.addEventListener('mousedown', (e) => {
            if (!this.shiftDown) this.shiftDown = e.which == 3;
            this.ctrlDown = e.which == 1;
        });

        this.canvas.addEventListener('mouseup', (e) => {
            this.ctrlDown = false;
            if (deleteModeMobile.value) return;
            this.shiftDown = false;
        });

        this.canvas.addEventListener('mousedown', (e) => {
            const [xIndex, yIndex] = this._getIndicesFromClickEvent(e);

            console.log(this.shiftDown);

            if (this.shiftDown) {
                this._clearPixel(xIndex, yIndex);
            } else {
                this._changePixel(xIndex, yIndex, colorPalette.currentColor);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const [xIndex, yIndex] = this._getIndicesFromClickEvent(e);
            
            if (this.ctrlDown) {
                this._changePixel(xIndex, yIndex, colorPalette.currentColor);
            }
            
            if (this.shiftDown) {
                this._clearPixel(xIndex, yIndex);
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            const [xIndex, yIndex] = this._getIndicesFromClickEvent(e.changedTouches[0]);

            if (this.shiftDown) {
                this._clearPixel(xIndex, yIndex);
            } else {
                this._changePixel(xIndex, yIndex, colorPalette.currentColor);
            }
        });

        deleteModeMobile.element.addEventListener('change', (e) => {
            this.shiftDown = e.target.checked;
        });

        showGrid.element.addEventListener('change', (e) => {
            this.draw();
        });

        window.addEventListener('keydown', (e) => {
            this.ctrlDown = e.ctrlKey;
            this.shiftDown = e.shiftKey;
        });
        window.addEventListener('keyup', (e) => {
            this.ctrlDown = e.ctrlKey;
            this.shiftDown = e.shiftKey;
        });
    },
    setCellSize(cellSize) {
        this.cellSize = cellSize;
        this.pixels = new Array(cellSize).fill(null).map(_ => new Array(cellSize).fill(null));
    },
    _getIndicesFromClickEvent(e) {
        let displayX = e.clientX - e.target.offsetLeft;
        let displayY = e.clientY - e.target.offsetTop;
        const [x, y] = this._screenCoordToCanvasCoord(displayX, displayY);

        const xIndex = Math.floor(x / this.cellSize);
        const yIndex = Math.floor(y / this.cellSize);

        return [xIndex, yIndex]
    },
    _drawGrid(ctx) {
        const w = this.canvas.width;
        const h = this.canvas.height;

        const cellSize = this.cellSize;

        const xCells = Math.round(w / cellSize);
        const yCells = Math.round(h / cellSize);

        ctx.strokeStyle = '#00000044';
        ctx.lineWidth = 2;
        for (let i = 1; i < xCells; i++) {
            ctx.beginPath();
            ctx.moveTo(i*cellSize, 0);
            ctx.lineTo(i*cellSize, h);
            ctx.stroke();
        }
        for (let i = 1; i < yCells; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i*cellSize);
            ctx.lineTo(w, i*cellSize);
            ctx.stroke();
        }
    },
    _drawPixels(ctx) {
        for (let x = 0; x < this.pixels.length; x++) {
            for (let y = 0; y < this.pixels[0].length; y++) {
                const color = this.pixels[x][y];
                if (color) {
                    this._fillCell(ctx, x, y, color);
                } else {
                    this._clearCell(ctx, x, y);
                }
            }
        }
    },
    _screenCoordToCanvasCoord(x, y) {
        const borderWidth = +window.getComputedStyle(this.canvas).borderBlockWidth.replaceAll(/px$/g, '');

        const xRatio = this.canvas.width / (this.canvas.clientWidth - borderWidth);
        const yRatio = this.canvas.height / (this.canvas.clientHeight - borderWidth);

        return [x * xRatio, y * yRatio];
    },
    _fillCell(ctx, xIndex, yIndex, color) {
        const x = xIndex * this.cellSize;
        const y = yIndex * this.cellSize;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.cellSize, this.cellSize);
    },
    _clearCell(ctx, xIndex, yIndex) {
        const x = xIndex * this.cellSize;
        const y = yIndex * this.cellSize;

        ctx.fillStyle = '#a0a0a022'
        ctx.fillRect(x, y, this.cellSize, this.cellSize);
    },
    _changePixel(xIndex, yIndex, color) {
        this.pixels[xIndex][yIndex] = color;
        this.draw();
    },
    _clearPixel(xIndex, yIndex) {
        this.pixels[xIndex][yIndex] = null;
        this.draw();
    },
    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._drawPixels(ctx);
        if (showGrid.value && !this.downloading) this._drawGrid(ctx);
    },
    download() {
        this.downloading = true;

        const link = document.createElement('a');
        link.href = canvas.toDataURL('png');
        link.download = 'pixels - ' + +new Date() + '.png';
        link.click();

        this.downloading = false;
    }
}