// main.js
const btn = document.querySelector('#magicBtn');
btn.addEventListener('click', () => {
  const randomColor = '#' + Math.random().toString(16).slice(2, 8);
  document.body.style.backgroundColor = randomColor;
});