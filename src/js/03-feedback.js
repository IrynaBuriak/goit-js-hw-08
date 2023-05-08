import { throttle } from 'lodash';
import Notiflix from 'notiflix';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const dataState = JSON.parse(localStorage.getItem('feedback-form-state'));

form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onFormSubmit);

let formData = {};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(e) {
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  e.preventDefault();
  if (e.target.email.value === '' || e.target.message.value === '') {
    Notiflix.Notify.warning('Please, enter email and message');
    return;
  }

  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  formData = {};
}

(function dataFromLocalStorage() {
  if (dataState) {
    formData.email = dataState.email || '';
    formData.message = dataState.message || '';
  }
})();
