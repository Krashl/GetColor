let che = false;
chrome.runtime.onMessage.addListener(
  function(request, sender, response) {
    switch (request.test) {
      case 'START':
        alert('Выбирите любой элемент на странице, после нажатия ОК');
        response({otvet: true});
        che = true;                     //разрешаем скрипту
        break;
      case 'STOP':
        alert('Пипетку выключили');
        response({otvet: false});
        break;
      case 'NAJALImmm':
        // alert('Скрипт спрашивает разрешение');
        response({otvet: che});
        che = false; 
        break;
    }
  }
);


// let flag = false;

// chrome.runtime.onMessage.addListener(       //создаем слушалку
// function(request, sender, response) {       //в него функцию(запрос, отправитель, ответ)
//   if (request.greeting == "hello"){     //если запрос.приветсвие "hello"
//     // flag = true;                        //задаём переменной истину
//     response({info: true});             //отправлем сообщение "ok"
//   } else {                                //иначе
//     response({info: false});             //отправлем сообщение Ложь
//     // flag = false;                       //отправлем сообщение Переменную в обратное состояние
//   }
//   // response({info: true});               //ответ истина
//   // alert(request.greeting);
// });