const canvas = document.querySelector('#drawingBoard');
const paletteContainer = document.querySelector('.colors-container');
const colorPickerContainer = document.querySelector('#formPickColor');
const colorInput = document.querySelector('#colorInput');

colorPicker.init(colorPickerContainer, colorInput);
colorPicker.hide();

colorPalette.init(paletteContainer, ['aqua', 'blue', 'blueviolet', 'brown', 'chocolate', 'crimson']);

drawingBoard.init(canvas);
drawingBoard.setCellSize(60);

drawingBoard.draw();