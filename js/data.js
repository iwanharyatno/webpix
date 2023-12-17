const historyStore = {
    init() {
        this.pixelHistory = [];
        this.historyIndex = -1;
    },
    addCheckpoint(pixels) {
        if (this.pixelHistory.length >= 50) {
            this.pixelHistory.shift();
        }

        if (this.historyIndex < this.pixelHistory.length - 1) {
            this.pixelHistory.splice(this.historyIndex + 1);
        }

        // Prevent reference copy
        const checkpoint = pixels.map(a => a.slice());
        this.pixelHistory.push(checkpoint);
        this.historyIndex += 1;
    },
    getCurrentCheckpoint() {
        return this.pixelHistory[this.historyIndex];
    },
    undo() {
        if (this.historyIndex == 0) return;
        this.historyIndex -= 1;
    },
    redo() {
        if (this.historyIndex == this.pixelHistory.length - 1) return;
        this.historyIndex += 1;
    }
}