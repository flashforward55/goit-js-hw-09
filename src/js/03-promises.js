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

// function to handle form submission and create promises
function handleFormSubmit(event) {
  event.preventDefault();

  // get user inputs from form fields
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const firstDelay = Number(delay.value);
  const delaySteep = Number(step.value);
  const amountInput = Number(amount.value);

  // create and display a notification to the user
  Notify.info(`Creating ${amountInput} promises...`);

  // create promises and handle fulfillment/rejection
  for (let i = 0; i < amountInput; i++) {
    const position = i + 1;
    const delay = firstDelay + i * delaySteep;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => form.reset());
  }
}

// add event listener to form submit event
const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);
