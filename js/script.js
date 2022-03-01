'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    // let deadLine = '2022-02-27';
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

            if(total < 0 || index > 0){
                clearInterval(intId);
                hour.textContent = '00';
                min.textContent = '00';
                sec.textContent = '00';
            }
        }
    }

    // setTime(deadLine);

    //------------------------------------------------------

    let start = document.querySelector('#start'),
        reset = document.querySelector('#reset');
    let input = document.querySelector('.timer__input');
    // console.dir();

    input.addEventListener('input', (e) => {
        if (e.target.value.search(/\d/)){
            e.target.value = '';
            e.target.style.borderColor = "red";
        } else{
            e.target.style.borderColor = "";

        }

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

    start.addEventListener('click', sendTime);

    reset.addEventListener('click', () => {
        index++;
        input.value = '';
        input.disabled = false;
        input.classList.remove('timer__input_disabled');
    });

    window.addEventListener('keyup', (e) => {
        if(e.key === "Enter"){
            sendTime();
        }
    });
});