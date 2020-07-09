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
      if(response.otvet) {
        // alert('Knopka Started');
      }
  }
  );

}