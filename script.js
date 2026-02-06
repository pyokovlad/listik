let yesScale = 1.0;
let noScale = 1.0;

function updateButtonSizes() {
  const clampedNoScale = Math.max(noScale, 0.6);
  document.querySelectorAll('.btn-yes').forEach(btn => {
    btn.style.transform = `scale(${yesScale})`;
  });
  document.querySelectorAll('.btn-no').forEach(btn => {
    btn.style.transform = `scale(${clampedNoScale})`;
  });
}

function vibrate() {
  if (navigator.vibrate) navigator.vibrate(100);
}

function shakeScreen() {
  document.body.style.animation = 'shake 0.5s';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 500);
}

function handleNoClick(currentScreenId) {
  vibrate();
  shakeScreen();

  yesScale += 0.12;
  noScale -= 0.12;
  updateButtonSizes();

  if (currentScreenId === 'screen1') {
    goToScreen2();
  } else if (currentScreenId === 'screen2') {
    goToScreen3();
  } else if (currentScreenId === 'screen3') {
    const noBtn = event.target;
    noBtn.style.opacity = '0';
    noBtn.disabled = true;
    setTimeout(() => {
      if (noBtn.parentNode) noBtn.parentNode.removeChild(noBtn);
      document.getElementById('screen3').classList.add('hidden');
      document.getElementById('screen4').classList.remove('hidden');
    }, 300);
  }
}

function goToScreen1() {
  document.getElementById('screen0').classList.add('hidden');
  document.getElementById('screen1').classList.remove('hidden');
}

function goToScreen2() {
  document.getElementById('screen1').classList.add('hidden');
  document.getElementById('screen2').classList.remove('hidden');
}

function goToScreen3() {
  document.getElementById('screen2').classList.add('hidden');
  document.getElementById('screen3').classList.remove('hidden');
}

function startYesSequence() {
  document.getElementById('rickScreen').classList.remove('hidden');
  const video = document.getElementById('rickVideo');

  video.play().catch(e => {
    console.warn("Звук рикролла заблокирован:", e);
    video.muted = true;
    video.play();
  });

  setTimeout(() => {
    video.pause();
    document.getElementById('rickScreen').classList.add('hidden');
    document.getElementById('jokeScreen').classList.remove('hidden');

    setTimeout(() => {
      document.getElementById('jokeScreen').classList.add('hidden');
      showFinal();
    }, 1500);
  }, 4000);
}

function showFinal() {
  document.querySelectorAll('.screen:not(#finalScreen)').forEach(el => el.classList.add('hidden'));
  document.getElementById('finalScreen').classList.remove('hidden');

  const audio = document.getElementById('finalAudio');
  audio.play().catch(e => console.log("Финальная музыка не проигралась:", e));

  createBackgroundHearts();
}

function createBackgroundHearts() {
  const colors = ['#ff4da6', '#a040ff', '#ffffff', '#ff6ec7', '#8a2be2'];
  const heartCount = 30;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart-bg';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    heart.style.left = `${x}vw`;
    heart.style.top = `${y}vh`;
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 16 + Math.random() * 20;
    heart.style.color = color;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDelay = `${Math.random() * 4}s`;

    document.body.appendChild(heart);
  }
}