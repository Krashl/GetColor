"use strict";

const allElements = document.querySelectorAll('*');     //выбрали все элеменеты на странице

const textTags = ['a', 'abbr', 'address', 'area', 'article', 
              'b', 'bdi', 'bdo', 'p', 'h1', 'h2', 'h3', 'h4', 'h5',
              'h6', 'span', 'ul', 'ol', 'li'];          //массив текстовых элементов страницы

const blokTags = ['input', 'div', 'table', 'tr', 'tb', 'th',
              'textarea', 'form'];                      //массив блочных элементов страницы

const pipette = document.createElement('div');              //создаём пипетку, в которой будут цвета
pipette.style.cssText = `                             
    width: 60px;
    padding: 0;
    background: rgb(255, 255, 255);
    border: 2px solid rgb(200, 200, 200);
    border-radius: 8px;
    z-index: 10000;
    position: absolute;
`;                                                          //задаём стиль пипетке

allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
    item.addEventListener('click', getColor);           //вызфваем функцию при клике на любой элемент 
});

function getColor(event) {   //функция получения цвета
    event.preventDefault();  //отключаем возможность перехода на другие страницы
    pipette.innerHTML = '';  //очищаем пипетку
    let pageColors = [];     //пустой массив в котором будут хранится полученые цвета
    let chekType = 0;
    const styleElement = getComputedStyle(event.target);  //объявляем переменную, в которую помещаем весь стиль нажатого элемента
    
    if (chekType == 0) {
        for (let item of textTags) {
            if (event.target.nodeName == item.toUpperCase()) {
                if (!(styleElement.color == 'rgba(0, 0, 0, 0)')) {
                    pageColors[pageColors.length] = styleElement.color;
                    console.log(styleElement.color);
                }
                chekType++; //изменяем проверку, чтобы не пойти в следующий массив
                break;
            }
        }
    }
    if (chekType == 0) {
        if (!(styleElement.background.slice(0, styleElement.background.indexOf(')') + 1) == 'rgba(0, 0, 0, 0)')) {
            pageColors[pageColors.length] = styleElement.background.slice(0, styleElement.background.indexOf(')') + 1);
            console.log(styleElement.background.slice(0, styleElement.background.indexOf(')') + 1));
        }
        if (!(styleElement.backgroundColor == 'rgba(0, 0, 0, 0)' || styleElement.backgroundColor == pageColors[pageColors.length-1]+'')) {
            pageColors[pageColors.length] = styleElement.backgroundColor;
            console.log(styleElement.backgroundColor);
        }
        if (!(styleElement.color == 'rgba(0, 0, 0, 0)')) {
            pageColors[pageColors.length] = styleElement.color;
            console.log(styleElement.color);
        }
    }

    pipette.style.cssText += `                             
        top: ${event.pageY}px;
        left: ${event.pageX}px;
    `;                      //Динамически изменяем положение пипетки

    pageColors.forEach(item => {
        const colorDiv = document.createElement('div');
        colorDiv.style.cssText = `
        height: ${30}px;
        width: ${30}px;
        margin: ${15}px;
        display: flex;
        align-items: center;
        border: 2px solid rgb(200, 200, 200);
        border-radius: ${100}%;
        background-color: ${item};
        `;
        pipette.append(colorDiv);   //добавляем в пипетку
        colorDiv.addEventListener('click', palletColor);    //добавляем прослушивание
    });

    console.log(event);

    document.body.append(pipette);  //Добавляем пипетку на страницу
    event.stopPropagation(); //запрещаем всплытие событий
}

function palletColor(event) {
    allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
        item.removeEventListener('click', getColor);           //вызфваем функцию при клике на любой элемент 
    });
    if (prompt('', event.target.style.backgroundColor)){
        function funk (callback) {pipette.remove();}
        funk(function() {
            allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
                item.addEventListener('click', getColor);           //вызфваем функцию при клике на любой элемент 
            }); 
        });
    }
}





//38пкс - круг
//60 - ширина  8,65 кругление


// function chekType(element, property, arrTegs, colors, popitka) {
//     for(let item of arrTegs) {                                      //проходим по массиву ассоциаций
//         if (element.nodeName == item.toUpperCase()) {               //ищим соответсвия со ассоциацией
//             if (element.property.slice(0, element.property.indexOf(')')+1) != 'rgba(0, 0, 0, 0)') {     //проверяем, есть цвет у элемента
//                 colors[colors.length] = element.property;           //примваиваем элемент
//                 colors[colors.length] = '1';                        //засчитываем попытку
//                 return(colors);
//             }
//             colors[colors.length] = '0';                            //не засчитываем попытку
//             return(colors);
//         }
//     }
// }

// pageColors = chekType(styleElement, 'color', textTags, pageColors, 0);      //Если это текст
// if (!(pageColors.pop() == '1')) {                                           //проверка,
//     pageColors = chekType(styleElement, 'color', textTags, pageColors, pageColors.pop());
//     pageColors = chekType(styleElement, 'backgroundColor', textTags, pageColors, pageColors.pop());
//     pageColors = chekType(styleElement, 'background', textTags, pageColors, pageColors.pop());
// }




// "name": "Get Color",               
// "description": "Позволяет скопировать цветовой код элемента страницы",  
// "version": "1.0",                
// "manifest_version":2,            
// "page_action" : { "default_popup" : "popup.html" },
// "icons": {
//   "16": "img/GeCo16.png",
//   "32": "img/GeCo32.png",
//   "48": "img/GeCo48.png",
//   "128": "img/GeCo128.png"
// },
// "permissions": ["declarativeContent", "storage"],
// "background": {
//   "scripts": ["background.js"],
//   "persistent": false
// },
// "content_scripts": [
//   {
//     "matches": ["<all_urls>"],   
//     "js": ["script.js"],          
//     "run_at": "document_end"      
//   }
// ]
// }





























// const allElements = document.querySelectorAll('*'),     //выбрали все элеменеты на странице
//       text = ['a', 'abbr', 'address', 'area', 'article', 
//       'b', 'bdi', 'bdo', 'p', 'h1', 'h2', 'h3', 'h4', 'h5',
//       'h6', 'span', 'ul', 'ol', 'li'],
//       blok = ['input', 'div', 'table', 'tr', 'tb', 'th',
//       'textarea', 'form'];



// function getColor(event) {                              //событие для выбора цвете при клике на элемент
//     let pageColors = [];                                //массив в котором будут хранится цвета 
//     div.innerHTML = '';
//     event.preventDefault();                             //отключаем возможность перехода на другие страницы при клике
//     let styleElement = getComputedStyle(event.target);  //объявляем переменную, в которую помещаем весь стиль нажатого элемента
    
//     //проверки на пустой результат
//     // if (event.backgroundColor) {

//     // }
//     // pageColors[0] = styleElement.backgroundColor;
//     // console.log((event.target.nodeName));
//     let index = 0;
//     let chekType = 0;                                   //проверка выполнения условий
//     if (chekType == 0) {
//         for (let item of text) {
//             if (event.target.nodeName == item.toUpperCase()) {
//                 if (!(styleElement.color == 'rgba(0, 0, 0, 0)')) {
//                     pageColors[index] = styleElement.color;
//                     index++;
//                     console.log(styleElement.color);
//                 }
//                 chekType++;         //изменяем проверку, чтобы не пойти в следующий массив
//                 break;
//             }
//         }
//     }
//     if (chekType == 0) {
//         for (let item of blok) {
//             if (event.target.nodeName == item.toUpperCase()) {
//                 if (!(styleElement.backgroundColor == 'rgba(0, 0, 0, 0)')) {
//                     pageColors[index] = styleElement.backgroundColor;
//                     index++;
//                     console.log(styleElement.backgroundColor);
//                 }
//                 if (!(styleElement.background.slice(0, styleElement.background.indexOf(')')+1) == 'rgba(0, 0, 0, 0)')) {
//                     pageColors[index] = styleElement.background.slice(0, styleElement.background.indexOf(')')+1);
//                     index++;
//                     console.log(styleElement.background.slice(0, styleElement.background.indexOf(')')+1));
//                 }
//                 if (!(styleElement.color == 'rgba(0, 0, 0, 0)')) {
//                     pageColors[index] = styleElement.color;
//                     index++;
//                     console.log(styleElement.color);
//                 }
//                 chekType++;         //изменяем проверку, чтобы не пойти в следующий массив
//                 break;
//             }
//         }
//     }
//     if (chekType == 0) {
//             if (!(styleElement.backgroundColor == 'rgba(0, 0, 0, 0)')) {
//                 pageColors[index] = styleElement.backgroundColor;
//                 index++;
//                 console.log(styleElement.backgroundColor);
//             }
//             if (!(styleElement.background.slice(0, styleElement.background.indexOf(')')+1) == 'rgba(0, 0, 0, 0)')) {
//                 pageColors[index] = styleElement.background.slice(0, styleElement.background.indexOf(')')+1);
//                 index++;
//                 console.log(styleElement.background.slice(0, styleElement.background.indexOf(')')+1));
//             }
//             if (!(styleElement.color == 'rgba(0, 0, 0, 0)')) {
//                 pageColors[index] = styleElement.color;
//                 index++;
//                 console.log(styleElement.color);
//             }
//         }
//     chekType = 0;


//     pageColors.forEach( item => {
//         const colorDiv = document.createElement('div');
//         colorDiv.style.height = `10px`;
//         colorDiv.style.width = `10px`;
//         colorDiv.style.margin = `5px`;
//         colorDiv.style.backgroundColor = item;
//         // colorDiv.textContent =  item;
//         div.append(colorDiv);
//     });
//     div.style.top = `${event.clientY}px`;
//     div.style.left = `${event.clientX}px`;
//     document.body.append(div);

//     event.stopPropagation();                          //запрещаем всплытие событий
//     console.log(event);
// }

// const div = document.createElement('div');
// div.id = 'leooPopov';
// div.style.backgroundColor = `red`;
// // div.style.margin = `7px`;
// // div.style.width = `10px`;
// // div.style.height = `10px`;
// // div.style.padding = `10px`;
// div.style.border = `4px solid black`;
// div.style.background = `#fc0`;
// div.style.position = `absolute`;
// div.style.top = `82px`;
// div.style.zIndex = `1000000`;
// // div.textContent =  '123';
// // document.body.append(div);
// // div.remove();

// allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
//     item.addEventListener('click', getColor);           //вызфваем функцию при клике на любой элемент 
// });


// "brawser_action": "popup.html"


















