const colorPalette = {
    init(container, colors=['#000000', '#ffffff']) {
        this.container = container;
        this.colors = colors;
        this.currentColor = colors[0];

        this._updateContainer();
    },
    addColor(color) {
        this.colors.push(color);
        this._updateContainer();
    },
    _updateContainer() {
        this.container.innerHTML = '';

        const addColorButton = document.createElement('button');
        addColorButton.classList.add('color', 'plus');
        addColorButton.innerText = '+';
        this.container.prepend(addColorButton);

        this.colors.forEach(c => {
            const colorButton = document.createElement('button');
            colorButton.classList.add('color');
            colorButton.style.backgroundColor = c;
            colorButton.innerText = '+';
            colorButton.addEventListener('click', () => {
                this.currentColor = c;
                this._updateContainer();
            });

            if (this.currentColor === c) {
                colorButton.classList.add('selected');
            }

            this.container.prepend(colorButton);
        });
    }
}