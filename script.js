const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicGate = document.getElementById('musicGate');
const openInvitation = document.getElementById('openInvitation');

async function startMusic(){
  try {
    await bgMusic.play();
    musicToggle.classList.add('playing');
    musicToggle.setAttribute('aria-pressed','true');
    musicToggle.querySelector('span').textContent = 'Music On';
  } catch (error) {
    // Browser autoplay restrictions can prevent playback until another tap.
  }
}

openInvitation.addEventListener('click', async () => {
  musicGate.classList.add('hidden');
  await startMusic();
});

musicToggle.addEventListener('click', async () => {
  if (bgMusic.paused) {
    await startMusic();
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    musicToggle.setAttribute('aria-pressed','false');
    musicToggle.querySelector('span').textContent = 'Music Off';
  }
});

const modal = document.getElementById('modal');
const yesButton = document.getElementById('yesButton');
const closeModal = document.getElementById('closeModal');
const closeMain = document.getElementById('closeMain');

yesButton.addEventListener('click', () => {
  modal.classList.add('show');
  burstHearts();
});
[closeModal, closeMain].forEach(btn => btn.addEventListener('click', () => modal.classList.remove('show')));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });

function burstHearts(){
  for(let i=0;i<22;i++){
    const h=document.createElement('span');
    h.textContent='♡';
    h.style.position='fixed';
    h.style.left='50%'; h.style.top='58%';
    h.style.zIndex='60';
    h.style.color='#d86f8d';
    h.style.fontSize=(14+Math.random()*20)+'px';
    h.style.pointerEvents='none';
    const x=(Math.random()*2-1)*420, y=-(80+Math.random()*420);
    h.animate([
      {transform:'translate(-50%,-50%) scale(.5)',opacity:1},
      {transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${Math.random()*360}deg)`,opacity:0}
    ],{duration:1100+Math.random()*700,easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish=()=>h.remove();
    document.body.appendChild(h);
  }
}

const petalLayer=document.querySelector('.petals');
function makePetal(){
  const p=document.createElement('span');
  p.className='petal';
  p.style.left=Math.random()*100+'vw';
  p.style.setProperty('--drift',(Math.random()*220-110)+'px');
  p.style.animationDuration=(7+Math.random()*7)+'s';
  p.style.animationDelay=(Math.random()*2)+'s';
  petalLayer.appendChild(p);
  setTimeout(()=>p.remove(),16000);
}
setInterval(makePetal,650);
