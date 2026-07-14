// EDITA esta fecha con el horario oficial confirmado del partido (hora de España peninsular).
// Formato: 'YYYY-MM-DDTHH:mm:ss+02:00'
const MATCH_DATETIME = '2026-07-15T21:00:00+02:00';

const target = new Date(MATCH_DATETIME).getTime();

const els = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
};

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    els.days.textContent = '00';
    els.hours.textContent = '00';
    els.minutes.textContent = '00';
    els.seconds.textContent = '00';
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.minutes.textContent = pad(minutes);
  els.seconds.textContent = pad(seconds);
}

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Madrid'
});
const timeFormatter = new Intl.DateTimeFormat('es-ES', {
  hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid'
});

const matchDate = new Date(MATCH_DATETIME);
document.getElementById('kickoff-text').textContent =
  dateFormatter.format(matchDate) + ' a las ' + timeFormatter.format(matchDate);

tick();
const timer = setInterval(tick, 1000);

const clockFormatter = new Intl.DateTimeFormat('es-ES', {
  hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Madrid'
});
const clockEl = document.getElementById('reloj-es');
function tickClock() {
  clockEl.textContent = clockFormatter.format(new Date()) + ' (España)';
}
tickClock();
setInterval(tickClock, 1000);
