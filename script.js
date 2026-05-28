/* ==============================
   HAPPY BIRTHDAY LEWIS — script.js
   ============================== */

/* ---- Custom Cursor ---- */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left  = mouseX + 'px';
  dot.style.top   = mouseY + 'px';
});
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('button, a, .polaroid, .song-item').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.opacity = '0.9'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.opacity = '0.5'; });
});


/* ---- Scroll Reveal ---- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


/* ---- Floating Hearts ---- */
setInterval(() => {
  const h = document.createElement('div');
  h.className = 'heart-float';
  h.innerHTML = ['🖤', '♥', '✦', '·'][Math.floor(Math.random()*4)];
  h.style.cssText = `left:${Math.random()*100}vw; animation-delay:${Math.random()*2}s; font-size:${10+Math.random()*10}px;`;
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6500);
}, 900);


/* ---- Confetti Burst ---- */
function celebrate() {
  confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 }, colors: ['#c9a84c','#e07a8f','#f3f4f6','#a78bfa'] });
  const end = Date.now() + 3000;
  (function frame() {
    confetti({ particleCount: 5, angle:  60, spread: 55, origin: { x: 0 }, colors: ['#c9a84c','#e07a8f'] });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#c9a84c','#e07a8f'] });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
document.getElementById('celebrateBtn').addEventListener('click', celebrate);


/* ---- Countdown ---- */
function updateCountdown() {
  const target = new Date('May 29, 2026 00:00:00').getTime();
  const gap    = target - Date.now();

  const d = Math.max(0, Math.floor(gap / 86400000));
  const h = Math.max(0, Math.floor((gap % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((gap %  3600000) /   60000));
  const s = Math.max(0, Math.floor((gap %    60000) /    1000));

  document.getElementById('days').textContent  = String(d).padStart(2,'0');
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('mins').textContent  = String(m).padStart(2,'0');
  document.getElementById('secs').textContent  = String(s).padStart(2,'0');
}
setInterval(updateCountdown, 1000);
updateCountdown();


/* ---- Music Player ---- */
const SONGS = [
  {
    id: 'song1',
    title: 'After Hours',
    artist: 'The Weeknd',
    src: 'The_Weeknd_-_After_Hours__Audio___ygTZZpVkmKg_.mp3'
  },
  {
    id: 'song2',
    title: 'You & Me (Flume Remix)',
    artist: 'Disclosure',
    src: 'Disclosure_-_You___Me__Flume_Remix___Official_Video___8x-M7AkTvrQ_.mp3'
  },
  {
    id: 'song3',
    title: 'Language',
    artist: 'Porter Robinson',
    src: 'Porter_Robinson_-_Language__Vsy1URDYK88_.mp3'
  }
];

let currentSong = null;
let currentAudio = null;

function formatTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60);
  return `${m}:${String(s).padStart(2,'0')}`;
}

const progressFill = document.getElementById('progressFill');
const currentTime  = document.getElementById('currentTime');
const totalTime    = document.getElementById('totalTime');
const nowTitle     = document.getElementById('nowTitle');
const nowArtist    = document.getElementById('nowArtist');
const waveBars     = document.querySelectorAll('.wave-bar');

function setWave(playing) {
  waveBars.forEach((b, i) => {
    b.classList.toggle('active', playing);
    b.style.animationDelay = (i * 0.06) + 's';
    b.style.animationDuration = (0.4 + Math.random()*0.4) + 's';
  });
}

function playSong(idx) {
  if (currentAudio) { currentAudio.pause(); }

  // Remove playing class from all items
  document.querySelectorAll('.song-item').forEach(el => el.classList.remove('playing'));

  const song = SONGS[idx];
  currentSong = idx;

  // Create fresh audio element
  currentAudio = new Audio(song.src);
  currentAudio.volume = 0.85;

  // Update now-playing panel
  nowTitle.textContent  = song.title;
  nowArtist.textContent = song.artist;

  // Highlight active row
  const row = document.querySelector(`.song-item[data-idx="${idx}"]`);
  if (row) row.classList.add('playing');

  // Update icons
  document.querySelectorAll('.play-icon').forEach((ic, i) => {
    ic.textContent = i === idx ? '⏸' : '▶';
  });

  currentAudio.play().catch(() => {});
  setWave(true);

  currentAudio.addEventListener('timeupdate', () => {
    const pct = (currentAudio.currentTime / currentAudio.duration) * 100 || 0;
    progressFill.style.width = pct + '%';
    currentTime.textContent  = formatTime(currentAudio.currentTime);
    totalTime.textContent    = formatTime(currentAudio.duration);
  });

  currentAudio.addEventListener('ended', () => {
    setWave(false);
    document.querySelectorAll('.play-icon').forEach(ic => ic.textContent = '▶');
    document.querySelectorAll('.song-item').forEach(el => el.classList.remove('playing'));
    // Auto-advance
    const next = (idx + 1) % SONGS.length;
    playSong(next);
  });
}

// Toggle if same song, otherwise play new
document.querySelectorAll('.song-item').forEach(el => {
  const idx = parseInt(el.dataset.idx);
  el.addEventListener('click', () => {
    if (currentSong === idx && currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      setWave(false);
      el.querySelector('.play-icon').textContent = '▶';
    } else {
      playSong(idx);
    }
  });
});

// Progress bar click to seek
document.querySelector('.progress-wrap').addEventListener('click', function(e) {
  if (!currentAudio || !isFinite(currentAudio.duration)) return;
  const rect = this.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  currentAudio.currentTime = pct * currentAudio.duration;
});


/* ---- Secret Letters ---- */
document.querySelectorAll('.secret-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.secret-card');
    const msg  = card.querySelector('.secret-message');
    card.classList.toggle('open-card');
    msg.style.maxHeight = card.classList.contains('open-card') ? msg.scrollHeight + 'px' : null;
  });
});


/* ---- Archive Chapters ---- */
document.querySelectorAll('.open-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const isOpen  = !!content.style.maxHeight;
    content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
    const icon = btn.querySelector('.btn-icon');
    if (icon) icon.textContent = isOpen ? '📁' : '✕';
  });
});


/* ---- Typing Terminal Letter ---- */
const letter = `System Input Log: 26 Years of Lewis.

Sometimes I wonder how someone can feel both like total peace and raw electric chaos at the same exact time.

You slipped into my matrix so naturally, yet you managed to shift every frequency completely.

Thank you for every late-night conversation, every unprompted laugh, every soft drop in the music, and every time you stayed exactly where you were.

I hope this year routes you directly to everything your heart secretly processes.

And if the volume of life ever gets too loud to handle, just remember that somewhere under these exact stars, there is a heart sync-locked to yours completely.

Happy Birthday, Lewis. ❤️`;

let charIdx = 0;
const typingEl = document.getElementById('typingText');

function typeLetter() {
  if (charIdx < letter.length) {
    typingEl.textContent += letter.charAt(charIdx);
    charIdx++;
    setTimeout(typeLetter, charIdx < 3 ? 0 : 28);
  }
}
window.addEventListener('DOMContentLoaded', () => setTimeout(typeLetter, 600));


/* ---- Lightbox Gallery ---- */
const GALLERY_PHOTOS = [
  { src: 'LEWIS_PIC_2.jpeg',  caption: 'Golden Hour // Style' },
  { src: 'LEWIS_PIC_3.jpeg',  caption: 'Focus // In The Zone' },
  { src: 'LEWIS_PIC_4.jpeg',  caption: 'City Stride // Presence' },
  { src: 'LEWIS_PIC_5.jpeg',  caption: 'Peace // Good Vibes' },
  { src: 'LEWIS_PIC_6.jpeg',  caption: 'Elevation // Above It All' },
  { src: 'lewis_photo_1.jpeg', caption: 'Deep // Creative Mind' },
  { src: 'lewis_photo_2.jpeg', caption: 'Horizon // New Lands' },
  { src: 'lewis_photo_3.jpeg', caption: 'Origins // Where It Began' },
  { src: 'lewis_photo_4.jpeg', caption: 'Artist // In Flow' },
  { src: 'lewis_photo_5.jpeg', caption: 'Milestones // Pure Joy' },
];

const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxCap   = document.getElementById('lightboxCap');
let   lightboxIdx   = 0;

function openLightbox(idx) {
  lightboxIdx = idx;
  lightboxImg.src = GALLERY_PHOTOS[idx].src;
  lightboxCap.textContent = GALLERY_PHOTOS[idx].caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function lightboxNav(dir) {
  lightboxIdx = (lightboxIdx + dir + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = GALLERY_PHOTOS[lightboxIdx].src;
    lightboxCap.textContent = GALLERY_PHOTOS[lightboxIdx].caption;
    lightboxImg.style.opacity = '1';
  }, 200);
}
lightboxImg.style.transition = 'opacity 0.2s';

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => lightboxNav(-1));
document.getElementById('lightboxNext').addEventListener('click', () => lightboxNav(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

document.querySelectorAll('.polaroid').forEach((el, i) => {
  el.addEventListener('click', () => openLightbox(i));
});


/* ---- Birthday Candles ---- */
let blown = 0;
document.querySelectorAll('.candle').forEach(c => {
  c.addEventListener('click', () => {
    const flame = c.querySelector('.flame');
    if (flame && flame.style.display !== 'none') {
      flame.style.display = 'none';
      blown++;
      confetti({ particleCount: 40, scalar: 1.2, origin: { y: 0.7 }, colors: ['#c9a84c','#e07a8f','#f3f4f6'] });
      if (blown === 3) {
        document.getElementById('final-msg').style.display = 'block';
        setTimeout(celebrate, 300);
      }
    }
  });
});
