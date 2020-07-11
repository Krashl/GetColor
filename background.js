let che = false;
let colorPallet = [];
for (let i = 0; i < 8; i++) {
  colorPallet[i] = 'rgb(255, 255, 255)';
}

chrome.runtime.onMessage.addListener(
  function(request, sender, response) {
    switch (request.test) {
      case 'START':
        // alert('Нажмите ОК и кликайте по элементам для выбора цвета');
        response({otvet: true});
        che = true;                     //разрешаем скрипту
        break;
      case 'GDE':
        // alert('Пипетку выключили');
        if(colorPallet) {
          response({pallet: colorPallet});
        }
        break;
      case 'NAJALImmm':
        // alert('Скрипт спрашивает разрешение');
        response({otvet: che});
        che = false; 
        break;
      default:

        break;
    }
    if (request.pallet) {
      colorPallet = request.pallet;
      // alert(request.pallet);
    }
  }
);