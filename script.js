const petalsContainer = document.getElementById('petals');
for(let i=0;i<14;i++){
  const p = document.createElement('div');
  p.className = 'petal';
  const left = Math.random()*100;
  const duration = 9 + Math.random()*8;
  const delay = Math.random()*-14;
  const swayDur = 3 + Math.random()*3;
  const size = 7 + Math.random()*9;
  p.style.left = left+'vw';
  p.style.width = size+'px';
  p.style.height = size+'px';
  p.style.animationDuration = duration+'s, '+swayDur+'s';
  p.style.animationDelay = delay+'s, '+delay+'s';
  petalsContainer.appendChild(p);
}

const arena = document.getElementById('arena');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const result = document.getElementById('result');

const messages = [
  'deixa eu pensar',
  'depois de 7 meses? sério?',
  'nem quero, chapo!',
  'nada a ver isso ai!',
  'aceita ai namoral 👀'
];
let dodgeCount = 0;
const MAX_DODGES = 5;

function dodge(){
  if(dodgeCount >= MAX_DODGES){ arena.classList.add('settled'); return; }
  dodgeCount++;
  noBtn.textContent = messages[Math.min(dodgeCount, messages.length-1)];
  const rect = arena.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxLeft = rect.width - btnRect.width;
  const maxTop = rect.height - btnRect.height;
  const newLeft = Math.random()*Math.max(maxLeft, 60);
  const newTop = 40 + Math.random()*Math.max(maxTop-150, 150);
  noBtn.style.transform = 'none';
  noBtn.style.left = newLeft+'px';
  noBtn.style.top = newTop+'px';
  if(dodgeCount >= MAX_DODGES){
    arena.classList.add('settled');
    yesBtn.classList.add('grow');
  }
}

noBtn.addEventListener('pointerenter', (e)=>{ if(e.pointerType==='mouse'){ dodge(); } });
noBtn.addEventListener('pointerdown', (e)=>{
  if(e.pointerType !== 'mouse' && dodgeCount < MAX_DODGES){ e.preventDefault(); dodge(); }
});

yesBtn.addEventListener('click', ()=>{
  arena.style.display='none';
  document.querySelector('.sub').style.display='none';
  result.classList.add('show');

  const heading = document.getElementById('mainHeading');
  heading.textContent = 'Eu te amo, Vitória';

  petalsContainer.innerHTML = '';
  startHeartRain();
});

function startHeartRain(){
  setInterval(spawnHeart, 260);
}

function spawnHeart(){
  const p = document.createElement('div');
  p.className = 'petal heart';
  p.textContent = ['💕','❤️','💖'][Math.floor(Math.random()*3)];
  const left = Math.random()*100;
  const duration = 6 + Math.random()*5;
  const swayDur = 2.5 + Math.random()*2.5;
  const size = 14 + Math.random()*10;
  p.style.left = left+'vw';
  p.style.fontSize = size+'px';
  p.style.animationDuration = duration+'s, '+swayDur+'s';
  petalsContainer.appendChild(p);
  setTimeout(()=>p.remove(), duration*1000+400);
}