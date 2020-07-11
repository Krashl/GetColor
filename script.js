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
    z-index: 100000;
    position: absolute;
`;                                                          //задаём стиль пипетке

const colorPallet = [];                                 //массив с глобальной палитрой цветов


allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
    item.addEventListener('click', activButton);           //вызфваем функцию при клике на любой элемент 
});

function activButton() {

    chrome.runtime.sendMessage({test: 'NAJALImmm'},
    
    function(response) {
        // console.log(response.otvet);
        if (response.otvet) {
            allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
                item.removeEventListener('click', activButton);           //вызфваем функцию при клике на любой элемент 
            });
            allElements.forEach( item => {                              //назначаем всем элементам страницы прослушивание события
            item.addEventListener('click', getColor)});           //вызфваем функцию при клике на любой элемент 
            getColor();
        }
    }
    );

}

function getColor (event) {
        event.preventDefault(); //отключаем возможность перехода на другие страницы
        pipette.innerHTML = ''; //очищаем пипетку
        let pageColors = []; //пустой массив в котором будут хранится полученые цвета
        let chekType = 0;
        const styleElement = getComputedStyle(event.target); //объявляем переменную, в которую помещаем весь стиль нажатого элемента

        if (chekType == 0) {
            for (let item of textTags) {
                if (event.target.nodeName == item.toUpperCase()) {
                    if (!(styleElement.color == 'rgba(0, 0, 0, 0)')) {
                        pageColors[pageColors.length] = styleElement.color;
                        // console.log(styleElement.color);
                    }
                    chekType++; //изменяем проверку, чтобы не пойти в следующий массив
                    break;
                }
            }
        }
        if (chekType == 0) {
            if (!(styleElement.background.slice(0, styleElement.background.indexOf(')') + 1) == 'rgba(0, 0, 0, 0)')) {
                pageColors[pageColors.length] = styleElement.background.slice(0, styleElement.background.indexOf(')') + 1);
                // console.log(styleElement.background.slice(0, styleElement.background.indexOf(')') + 1));
            }
            if (!(styleElement.backgroundColor == 'rgba(0, 0, 0, 0)' || styleElement.backgroundColor == pageColors[pageColors.length - 1] + '')) {
                pageColors[pageColors.length] = styleElement.backgroundColor;
                // console.log(styleElement.backgroundColor);
            }
            if (!(styleElement.color == 'rgba(0, 0, 0, 0)')) {
                pageColors[pageColors.length] = styleElement.color;
                // console.log(styleElement.color);
            }
        }

        pipette.style.cssText += `                             
        top: ${event.pageY}px;
        left: ${event.pageX}px;
    `; //Динамически изменяем положение пипетки

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
            pipette.append(colorDiv); //добавляем в пипетку
            colorDiv.addEventListener('click', palletColor); //добавляем прослушивание
        });

        // console.log(event);

        document.body.append(pipette); //Добавляем пипетку на страницу
        event.stopPropagation(); //запрещаем всплытие событий

}

function palletColor(event) {
    let seleColor = event.target.style.backgroundColor;
    let ectVpalitre = false;
    let paltNaOtprav = [];
    ////////////////////////передаём в палитру
    if (colorPallet.length < 8) {
        for(let item of colorPallet) {
            if(item == seleColor) {
                ectVpalitre = true;
                break;
            }
        }
        if (!ectVpalitre) {
            colorPallet[colorPallet.length] = seleColor;
            console.log(colorPallet);


            for(let i = 0; i < 8; i++){
                if (!colorPallet[i]) {
                    paltNaOtprav[i] = 'rgb(255, 255, 255)';        //цвет по умолчанию
                } else {
                    paltNaOtprav[i] = colorPallet[i];
                } 
            }
            chrome.runtime.sendMessage({pallet: paltNaOtprav}, () => {});

        }
    }
    /////////////////////////////////

    chrome.runtime.sendMessage({test: 'NAJALImmm'},
    
    function(response) {
        // console.log(response.otvet);
        if (response.otvet) {
            allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
                item.removeEventListener('click', activButton);           //вызфваем функцию при клике на любой элемент 
            });
            allElements.forEach( item => {                              //назначаем всем элементам страницы прослушивание события
            item.addEventListener('click', getColor)});           //вызфваем функцию при клике на любой элемент 
            getColor();
        }
    }
    );

    /////////////////////////
    allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
        item.removeEventListener('click', getColor);           //вызфваем функцию при клике на любой элемент 
    });
    allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
        item.addEventListener('click', activButton);           //вызфваем функцию при клике на любой элемент 
    });
    if (prompt('скопируйте код цвета', seleColor)){
        function funk (callback) {pipette.remove();}
        funk(function() {
            allElements.forEach( item => {                          //назначаем всем элементам страницы прослушивание события
                item.addEventListener('click', getColor);           //вызфваем функцию при клике на любой элемент 
            });  
            
        });
    }
}