const actionUndo = {
    init(element) {
        this.element = element;
        
        this.element.addEventListener('click', () => {
            window.dispatchEvent(new Event(EVENT_UNDO));
        });
        window.addEventListener('keydown', (e) => {
            if (e.key == 'z' && e.ctrlKey) {
                window.dispatchEvent(new Event(EVENT_UNDO));
            }
        });
    },
};

const actionRedo = {
    init(element) {
        this.element = element;
        
        this.element.addEventListener('click', () => {
            window.dispatchEvent(new Event(EVENT_REDO));
        });
        window.addEventListener('keydown', (e) => {
            if (e.key == 'y' && e.ctrlKey) {
                window.dispatchEvent(new Event(EVENT_REDO));
            }
        });
    },
};