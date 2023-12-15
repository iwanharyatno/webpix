const colorPicker = {
    init(rootFormElement, inputElement) {
        this.rootFormElement = rootFormElement;
        this.inputElement = inputElement;

        this.rootFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.hide();

            if (e.submitter.getAttribute('data-cancel')) {
                return;
            }

            if (this.onComplete) this.onComplete(this.inputElement.value);
        }); 
    },
    show() {
        this.rootFormElement.removeAttribute('hidden');
    },
    hide() {
        this.rootFormElement.setAttribute('hidden', true);
    },
    pick(onComplete) {
        this.show();
        this.onComplete = onComplete;
    }
}