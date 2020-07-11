'use strict';

function test () {
  console.log(window.storage.globalVar);
}

const pipetBtn = document.querySelector('#pipet');
const pall = document.querySelector('#pallet');

pipetBtn.addEventListener('mouseover', activElement);
pipetBtn.addEventListener('mouseout', passElement);
pipetBtn.addEventListener('click', runPipet);

function activElement(event) {
  event.target.style.filter = `blur(2px) opacity(50%)`;
}

function passElement(event) {
  event.target.style.filter = `blur(0px) opacity(100%)`;
}

let response = 123;

function runPipet(event) {

  chrome.runtime.sendMessage({test: 'START'}, 
  function(response) {
      if(response.otvet != undefined) {
        // alert('Knopka Started');
      }
  }
  );
}

setInterval(chekPallet, 200);

function chekPallet() {
  chrome.runtime.sendMessage({test: 'GDE'}, 
  function(response) {
      if(response.pallet != undefined) {
        // console.log(response.pallet);
        rebildDiv(response.pallet);
      }
  }
  );
}

function rebildDiv(mas){
  pall.innerHTML = "";
  mas.forEach((item, i) => {
    pall.innerHTML += `<div class="divi" style="width: 29px; height: 29px; margin-top: 3px; border-radius:7px; background-color:${item}; border-radius:10px; border: 2px solid rgb(200, 200, 200);"></div>`;
    // document.querySelectorAll('.divi')[i].addEventListener('click', palletColor); //добавляем прослушивание
    if (document.querySelectorAll('.divi').length == 8) addLis();
  });
}

function addLis() {
  // console.log('asdas');
  document.querySelectorAll('.divi').forEach(item => {
    item.addEventListener('mouseover', activElement);
    item.addEventListener('mouseout', passElement);
    item.addEventListener('click', palletColor);
  });
}

function palletColor(event) {
  prompt('Copy color', event.target.style.backgroundColor);
}

// console.log(mas);
// pall.innerHTML += `<div style="width: 29px; height: 29px; margin-top: 3px; border-radius:7px;  border-radius:10px; border: 2px solid rgb(200, 200, 200);"></div>`;
// pall.querySelectorAll('*')[i].addEventListener('click', palletColor); //добавляем прослушивание
// pall.querySelectorAll('*')[i]('mouseover', activElement);
// pall.querySelectorAll('*')[i]('mouseout', passElement);


