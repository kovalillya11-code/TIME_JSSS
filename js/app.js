// 1
(function () {
  const startBtn = document.getElementById('startCountdown');
  const display = document.getElementById('countdown');
  let timerId = null;

  startBtn.addEventListener('click', () => {
    // Зупинка попереднього відлік, якщо він ще працює (щоб не було дублів)
    clearInterval(timerId);

    let n = 10;
    display.textContent = n;

    timerId = setInterval(() => {
      n--;

      if (n >= 1) {
        display.textContent = n;
      } else {
        // Наступна секунда після цифри 1
        display.textContent = 'Час вийшов!';
        clearInterval(timerId); // Відлік завершено, таймер зупиняється
        timerId = null;
      }
    }, 1000);
  });
})();


// 2
(function () {
  const submitBtn = document.getElementById('submitBtn');
  const status = document.getElementById('submitStatus');

  submitBtn.addEventListener('click', () => {
    if (submitBtn.disabled) return; // Додатковий захист

    submitBtn.disabled = true;
    submitBtn.textContent = 'Зачекайте 3 секунди...';
    status.textContent = 'Форму надіслано!';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Надіслати';
      status.textContent = '';
    }, 3000);
  });
})();


// 3 
(function () {
  const slider = document.getElementById('slider');
  const pauseBtn = document.getElementById('pauseBtn');
  const resumeBtn = document.getElementById('resumeBtn');

  const slides = [
    { text: 'Зображення 1', color: '#f28b82' },
    { text: 'Зображення 2', color: '#fbbc04' },
    { text: 'Зображення 3', color: '#34a853' }
  ];

  let index = 0;
  let intervalId = null;

  function showSlide(i) {

    slider.style.background = slides[i].color;
  }

  function start() {
    if (intervalId !== null) return; // Не запускаємо другий інтервал
    intervalId = setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 2000);
  }

  function stop() {
    clearInterval(intervalId);
    intervalId = null;
  }

  pauseBtn.addEventListener('click', stop);
  resumeBtn.addEventListener('click', start);

  showSlide(index);
  start();
})();


// 4
(function () {
  const currentColorEl = document.getElementById('currentColor');

  // Червоний 4с Жовтий 1с Зелений 3с Жовтий 1с ч
  const states = [
    { id: 'red',    name: 'Червоний', duration: 4000 },
    { id: 'yellow', name: 'Жовтий',   duration: 1000 },
    { id: 'green',  name: 'Зелений',  duration: 3000 },
    { id: 'yellow', name: 'Жовтий',   duration: 1000 }
  ];

  let step = 0;

  function setLight(state) {
    ['red', 'yellow', 'green'].forEach(id => {
      document.getElementById(id).classList.remove('on');
    });
    document.getElementById(state.id).classList.add('on');
    currentColorEl.textContent = state.name;
  }

  function next() {
    const state = states[step];
    setLight(state);

    // Наступний крок — через тривалість поточного кольору
    step = (step + 1) % states.length;
    setTimeout(next, state.duration);
  }

  next();
})();


// 5
(function () {
  const clockEl = document.getElementById('clock');
  const toggleBtn = document.getElementById('toggleClock');
  let timerId = null;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateClock() {
    const d = new Date();
    clockEl.textContent =
      pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }

  function startClock() {
    if (timerId !== null) return; // Уже працює — новий таймер не створюєця
    updateClock();
    timerId = setInterval(updateClock, 1000);
    toggleBtn.textContent = 'Зупинити годинник';
  }

  function stopClock() {
    if (timerId === null) return; // Повторне натиск нічого не ламає
    clearInterval(timerId);
    timerId = null;
    toggleBtn.textContent = 'Запустити годинник';
  }

  toggleBtn.addEventListener('click', () => {
    if (timerId === null) {
      startClock();
    } else {
      stopClock();
    }
  });

  startClock();
})();