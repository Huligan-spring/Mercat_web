/**
 * Mercat Asistent - Interactividad Landing Page
 * 1. Navegación Móvil
 * 2. Sintetizador de Audio Web Audio API (Pitido 1800 Hz)
 * 3. Reproductor de Vídeo Real en Smartphone Mockup
 * 4. Simulador Interactivo de Escáner y Semáforo de Presupuesto
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. NAVEGACIÓN MÓVIL
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuIcon = document.getElementById('mobileMenuIcon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isClosed = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isClosed);
      if (mobileMenuIcon) {
        mobileMenuIcon.textContent = isClosed ? 'close' : 'menu';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
      });
    });
  }

  // =========================================================================
  // 2. SINTETIZADOR DE AUDIO BEEP (Web Audio API a 1800 Hz)
  // =========================================================================
  function playScannerBeep() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.warn('[Audio] No se pudo emitir pitido de escáner:', e);
    }
  }

  // =========================================================================
  // 3. CONTROL DEL VÍDEO REAL DENTRO DEL SMARTPHONE MOCKUP
  // =========================================================================
  const phoneVideo = document.getElementById('phoneVideo');
  const phonePlayBtn = document.getElementById('phonePlayBtn');
  const videoControlsBar = document.getElementById('videoControlsBar');
  const togglePlayPauseBtn = document.getElementById('togglePlayPauseBtn');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const playPauseText = document.getElementById('playPauseText');
  const closeVideoBtn = document.getElementById('closeVideoBtn');
  const videoProgressBar = document.getElementById('videoProgressBar');
  const tabRealVideo = document.getElementById('tabRealVideo');
  const tabSimulateScan = document.getElementById('tabSimulateScan');

  function startVideoPlayback() {
    if (!phoneVideo) return;
    phoneVideo.classList.remove('hidden');
    if (videoControlsBar) videoControlsBar.classList.remove('hidden');

    // Actualizar estilo visual de las pestañas inferiores
    if (tabRealVideo && tabSimulateScan) {
      tabRealVideo.className = "flex-1 py-1.5 rounded-xl bg-primary text-white text-center transition-all flex items-center justify-center gap-1 cursor-pointer";
      tabSimulateScan.className = "flex-1 py-1.5 rounded-xl text-slate-300 hover:text-white text-center transition-all flex items-center justify-center gap-1 cursor-pointer";
    }

    phoneVideo.play().then(() => {
      if (playPauseIcon) playPauseIcon.textContent = 'pause';
      if (playPauseText) playPauseText.textContent = 'Pausar';
    }).catch(() => {
      // Si el navegador bloquea autoplay con sonido, reproducir silenciado
      phoneVideo.muted = true;
      phoneVideo.play();
    });
  }

  function stopVideoPlayback() {
    if (!phoneVideo) return;
    phoneVideo.pause();
    phoneVideo.classList.add('hidden');
    if (videoControlsBar) videoControlsBar.classList.add('hidden');
    if (tabRealVideo && tabSimulateScan) {
      tabRealVideo.className = "flex-1 py-1.5 rounded-xl text-slate-300 hover:text-white text-center transition-all flex items-center justify-center gap-1 cursor-pointer";
      tabSimulateScan.className = "flex-1 py-1.5 rounded-xl bg-primary text-white text-center transition-all flex items-center justify-center gap-1 cursor-pointer";
    }
  }

  phonePlayBtn?.addEventListener('click', startVideoPlayback);
  tabRealVideo?.addEventListener('click', startVideoPlayback);
  tabSimulateScan?.addEventListener('click', stopVideoPlayback);
  closeVideoBtn?.addEventListener('click', stopVideoPlayback);

  togglePlayPauseBtn?.addEventListener('click', () => {
    if (!phoneVideo) return;
    if (phoneVideo.paused) {
      phoneVideo.play();
      if (playPauseIcon) playPauseIcon.textContent = 'pause';
      if (playPauseText) playPauseText.textContent = 'Pausar';
    } else {
      phoneVideo.pause();
      if (playPauseIcon) playPauseIcon.textContent = 'play_arrow';
      if (playPauseText) playPauseText.textContent = 'Reanudar';
    }
  });

  phoneVideo?.addEventListener('timeupdate', () => {
    if (phoneVideo.duration && videoProgressBar) {
      const pct = (phoneVideo.currentTime / phoneVideo.duration) * 100;
      videoProgressBar.style.width = `${pct}%`;
    }
  });

  phoneVideo?.addEventListener('ended', () => {
    if (playPauseIcon) playPauseIcon.textContent = 'replay';
    if (playPauseText) playPauseText.textContent = 'Repetir';
  });

  // =========================================================================
  // 4. SIMULADOR INTERACTIVO DE ESCÁNER EN LA PORTADA DEL MOCKUP
  // =========================================================================
  let currentScanIndex = 0;
  const demoProducts = [
    { name: "Pechuga de Pollo al Peso (QR)", price: "4,68 €", total: "20,08 €", pct: "50%", barGreen: "50%", barAmber: "0%" },
    { name: "Aceite de Oliva Virgen 1L", price: "7,95 €", total: "28,03 €", pct: "70%", barGreen: "70%", barAmber: "0%" },
    { name: "Detergente Lavadora 30 lav", price: "4,20 €", total: "32,23 €", pct: "81%", barGreen: "75%", barAmber: "6%" },
    { name: "Leche Desnatada 1L", price: "1,25 €", total: "15,40 €", pct: "38%", barGreen: "38%", barAmber: "0%" }
  ];

  const simulatedToast = document.getElementById('simulatedToast');
  const toastProdName = document.getElementById('toastProdName');
  const toastProdPrice = document.getElementById('toastProdPrice');
  const phoneBudgetPct = document.getElementById('phoneBudgetPct');
  const budgetBarGreen = document.getElementById('budgetBarGreen');
  const budgetBarAmber = document.getElementById('budgetBarAmber');
  const scannerLaser = document.getElementById('scannerLaser');

  window.triggerScanSimulation = function() {
    stopVideoPlayback();
    playScannerBeep();

    // Animar láser con pulso verde intenso
    if (scannerLaser) {
      scannerLaser.classList.remove('laser-scan-anim');
      scannerLaser.style.backgroundColor = '#6ee7b7';
      scannerLaser.style.boxShadow = '0 0 16px #34d399';
      setTimeout(() => {
        scannerLaser.classList.add('laser-scan-anim');
        scannerLaser.style.backgroundColor = '';
        scannerLaser.style.boxShadow = '';
      }, 350);
    }

    const prod = demoProducts[currentScanIndex];
    currentScanIndex = (currentScanIndex + 1) % demoProducts.length;

    if (toastProdName) toastProdName.textContent = prod.name;
    if (toastProdPrice) toastProdPrice.textContent = prod.price;
    if (phoneBudgetPct) phoneBudgetPct.textContent = `${prod.total} (${prod.pct})`;
    if (budgetBarGreen) budgetBarGreen.style.width = prod.barGreen;
    if (budgetBarAmber) budgetBarAmber.style.width = prod.barAmber;

    if (simulatedToast) {
      simulatedToast.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
      simulatedToast.classList.add('opacity-100', 'translate-y-0');

      setTimeout(() => {
        simulatedToast.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
        simulatedToast.classList.remove('opacity-100', 'translate-y-0');
      }, 2600);
    }
  };

  // Si se pulsa en la pestaña "Probar escáner" mientras el vídeo está cerrado, simula una lectura
  tabSimulateScan?.addEventListener('click', () => {
    window.triggerScanSimulation();
  });
});
