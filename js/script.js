'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    let start = document.querySelector('#start'),
        reset = document.querySelector('#reset'),
        input = document.querySelector('.timer__input');

    let deadLine,
        index;

    function setTimeRemaining(endtime){
        let total = Date.parse(endtime) - Date.parse(new Date()),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / (1000 * 60)) % 60),
            seconds = Math.floor((total / 1000) % 60);

        return {
            total,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else{
            return num;
        }
    }

    function setTime(endtime){
        const hour = document.querySelector('#hours'),
            min = document.querySelector('#minutes'),
            sec = document.querySelector('#seconds'),
            intId = setInterval(setClock, 500);

        setClock();
        
        function setClock(){
            let { total, hours, minutes, seconds} = setTimeRemaining(endtime);

            hour.textContent = getZero(hours);
            min.textContent = getZero(minutes);
            sec.textContent = getZero(seconds);

            if(total < 0 || index > 0 || !deadLine){
                clearInterval(intId);
                hour.textContent = '00';
                min.textContent = '00';
                sec.textContent = '00';
                reset.click();
            }
        }
    }

    setTime(deadLine);


    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/,'');
    });

    function sendTime(){
        input = document.querySelector('.timer__input');

        if(input.value){
            index = 0;
            deadLine = new Date(Date.parse(new Date()) + (1000 * 60 * +input.value));
            setTime(deadLine);
            input.value = '';
            input.disabled = true;
            input.classList.add('timer__input_disabled');
        } else{
            input.classList.add('timer__input_empty');
            setTimeout(() => input.classList.remove('timer__input_empty'),2000);
        }
    }

    function clearInput(){
        index++;
        input.value = '';
        input.disabled = false;
        input.classList.remove('timer__input_disabled');
    }

    start.addEventListener('click', sendTime);

    reset.addEventListener('click', () => {
        clearInput();
    });

    window.addEventListener('keyup', (e) => {
        if(e.key === "Enter"){
            sendTime();
        }
    });

    window.addEventListener('keyup', (e) => {
        if(e.key === "Escape"){
            clearInput();
        }
    });


//-------------------------------------------------------MODAL

(function(){
    const modal = document.querySelector('.modal'),
      input = document.querySelector('.modal__input'),
      btn = document.querySelector('.modal__btn'),
      parent = document.querySelector('.timer__wrapper');

    modal.addEventListener("click", (e) => {
        if(e.target && e.target.matches('.modal__close') || e.target.matches('.modal')){
            modal.classList.add('modal_hide');
            blurLoading('.timer');
        }
    });

    function crateUserName(content, parent) {
        const userName = document.createElement('div');
        userName.classList.add('modal__name');
        userName.textContent = `${content}`;
        parent.prepend(userName);
    }

    btn.addEventListener('click', () => {
        crateUserName(input.value,parent);
        modal.classList.add('modal_hide');
        blurLoading('.timer');
    });


    function blurLoading(parent){
        const elem = document.querySelector(parent);
        const style = window.getComputedStyle(elem).filter;

        let value = +style.slice(5,(style.length - 3));

        let intID = setInterval(updateBlurValue, 20);

        console.log(elem);

        function updateBlurValue(){
            if(value <= 0){
                clearInterval(intID);
            }
            value -= (+style.slice(5,(style.length - 3)) / 100);
            elem.style.filter = `blur(${value.toFixed(2)}px)`;
        }
    }



}());









});