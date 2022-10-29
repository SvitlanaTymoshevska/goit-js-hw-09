import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dateSelection: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

console.log(refs);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      onSelectedDate(selectedDates[0]);
  },
};

const nowDate = Date.now();
let finalDate = null;

refs.startBtn.setAttribute('disabled', 'disabled');
refs.startBtn.addEventListener('click', onStartClick);

flatpickr(refs.dateSelection, options);

function onSelectedDate(selectedDate) {
    if (selectedDate <= nowDate) {
        alert("Please choose a date in the future");
    } else {
        refs.startBtn.removeAttribute('disabled');
        finalDate = selectedDate;
    }
}

function onStartClick (e) {
    refs.startBtn.setAttribute('disabled', 'disabled');
    setInterval(() => {
        const startDate = Date.now();
        const deltaTime = finalDate - startDate;
    
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;

    }, 1000)

    
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    if (value.toString().length >= 2) {
        return value.toString();
    }
    return value.toString().padStart(2, "0");
}