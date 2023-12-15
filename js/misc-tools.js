const deleteModeMobile = {
    init(element) {
        this.value = element.checked;
        this.element = element;

        this.element.addEventListener('change', (e) => {
            this.value = e.target.checked;
        });
    },
}

const showGrid = {
    init(element) {
        this.value = element.checked;
        this.element = element;

        this.element.addEventListener('change', (e) => {
            this.value = e.target.checked;
        });
    },
}