const canvas = document.querySelector('#drawingBoard');
const paletteContainer = document.querySelector('.colors-container');
const colorPickerContainer = document.querySelector('#formPickColor');
const colorInput = document.querySelector('#colorInput');
const checkDeleteMode = document.querySelector('#deleteModeCheck');
const checkShowGrid = document.querySelector('#showGridCheck');
const quickDownloadButton = document.querySelector('#downloadButton');
const undoButton = document.querySelector('#undoButton');
const redoButton = document.querySelector('#redoButton');

historyStore.init();

colorPicker.init(colorPickerContainer, colorInput);
colorPicker.hide();

colorPalette.init(paletteContainer, ['blue', 'blueviolet', 'brown', 'chocolate', 'crimson']);

deleteModeMobile.init(checkDeleteMode);
showGrid.init(checkShowGrid);

actionUndo.init(undoButton);
actionRedo.init(redoButton);

drawingBoard.init(canvas);
drawingBoard.setCellSize(120);

drawingBoard.draw();

quickDownloadButton.addEventListener('click', () => {
    drawingBoard.download();
});