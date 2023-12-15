const canvas = document.querySelector('#drawingBoard');
const paletteContainer = document.querySelector('.colors-container');
const colorPickerContainer = document.querySelector('#formPickColor');
const colorInput = document.querySelector('#colorInput');
const checkDeleteMode = document.querySelector('#deleteModeCheck');
const checkShowGrid = document.querySelector('#showGridCheck');
const quickDownloadButton = document.querySelector('#downloadButton');

colorPicker.init(colorPickerContainer, colorInput);
colorPicker.hide();

colorPalette.init(paletteContainer, ['blue', 'blueviolet', 'brown', 'chocolate', 'crimson']);

deleteModeMobile.init(checkDeleteMode);
showGrid.init(checkShowGrid);

drawingBoard.init(canvas);
drawingBoard.setCellSize(30);

drawingBoard.draw();

quickDownloadButton.addEventListener('click', () => {
    drawingBoard.download();
});