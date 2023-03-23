import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Get HTML elements
const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

startButton.disabled = true;

// Initialize flatpickr date picker
flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
});

let countdownIntervalId = null;

// Helper function to add leading zero
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Countdown function
function countdown(endDate) {
  const ms = endDate - new Date().getTime();
  if (ms < 0) {
    clearInterval(countdownIntervalId);
    Notify.success('Timer finished');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(ms);
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

// Event listener for start button
startButton.addEventListener('click', () => {
  const endDate = new Date(datePicker.value).getTime();
  countdownIntervalId = setInterval(() => {
    countdown(endDate);
  }, 1000);
  startButton.disabled = true;
  startButton.style.cursor = 'not-allowed';
  startButton.style.backgroundColor = 'red';
  datePicker.disabled = true;
  datePicker.style.cursor = 'not-allowed';
});

// Function to convert milliseconds to days, hours, minutes, and seconds
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
