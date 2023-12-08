
let message = document.querySelector('[message]').value;
let name = document.querySelector('[submission3]').value;
let email = document.querySelector('[email]').value;
let submitBTN = document.querySelector('[send]');

submitBTN.addEventListener('click', function () {
  // Delay the execution of clearFRM by 1 milliseconds
  setTimeout(clearFRM, 1);
});

function clearFRM() {
  document.querySelector('[message]').value = '';
  document.querySelector('[submission3]').value = '';
  document.querySelector('[email]').value = '';
}
