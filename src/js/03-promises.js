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
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');
  const firstDelay = Number(delayInput.value);
  const delayStep = Number(stepInput.value);
  const amount = Number(amountInput.value);

  // create and display a notification to the user
  Notify.info(`Creating ${amount} promises...`);

  // create promises and handle fulfillment/rejection
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + i * delayStep;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.currentTarget.reset();
  // reset the form inputs
  delayInput.value = '';
  stepInput.value = '';
  amountInput.value = '';
}
