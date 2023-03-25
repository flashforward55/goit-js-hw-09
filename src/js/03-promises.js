import { Notify } from 'notiflix/build/notiflix-notify-aio';
// function to create a promise with random success or failure
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const firstDelay = Number(delayInput.value);
const delayStep = Number(stepInput.value);
const amount = Number(amountInput.value);
