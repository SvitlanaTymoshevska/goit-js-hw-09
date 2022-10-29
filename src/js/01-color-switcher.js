const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.stopBtn.setAttribute('disabled', 'disabled');

refs.startBtn.addEventListener("click", () => {
  timerId = setInterval(() => ChangeBgc(), 1000);
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.stopBtn.removeAttribute('disabled');
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', 'disabled');
});

function ChangeBgc() {
  const color = getRandomHexColor();
  refs.body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}