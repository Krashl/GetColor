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
  alert('qw');
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    if (!response) {
      console.log(chrome.runtime.lastError);
      return;
    }
    if (response.info == 'ok') {
      alert(response.info);
    }
  });
}