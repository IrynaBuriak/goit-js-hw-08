import { throttle } from 'lodash';
import Notiflix from 'notiflix';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const dataState = JSON.parse(localStorage.getItem('feedback-form-state'));

form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onFormSubmit);

const formData = {};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (e.target.email.value === '' || e.target.message.value === '') {
    Notiflix.Notify.warning('Please, enter email and message');
    return;
  }

  e.currentTarget.reset();
  console.log(dataState);

  localStorage.removeItem('feedback-form-state');
}

(function dataFromLocalStorage() {
  if (dataState) {
    dataState.email
      ? (formData.email = dataState.email)
      : (formData.email = '');
    dataState.message
      ? (formData.message = dataState.message)
      : (formData.message = '');
  }
  email.value = formData.email;
  message.value = formData.message;
})();
