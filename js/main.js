// 1. Typed.js Animation
document.addEventListener("DOMContentLoaded", function () {
  const typed = new Typed(".typing-text", {
    strings: ["Aerospace Engineer", "VTOL Designer", "UAV Developer", "AI Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
    showCursor: false
  });

  const synth = window.speechSynthesis;
  const cursorText = document.querySelector('.cursorText');
  const contactForm = document.querySelector("#page9 form");
  let hasSpoken = false;

  // 2. Smooth Scrolling for Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // 3. Floating Text Visibility on Enter/Leave
  window.addEventListener('mouseenter', () => {
    if (!hasSpoken && cursorText) {
      cursorText.style.opacity = '1';
    }
  });
  window.addEventListener('mouseleave', () => {
    if (!hasSpoken && cursorText) {
      cursorText.style.opacity = '0';
    }
  });

  // 4. Floating Text Follow Cursor
  document.addEventListener('mousemove', (e) => {
    if (!hasSpoken && cursorText) {
      cursorText.style.left = `${e.clientX + 2}px`;
      cursorText.style.top = `${e.clientY + 2}px`;
    }
  });

  // 5. Hide floating cursor hint by default
  document.body.classList.add('cursor-hidden');

  // 6. Load voices safely
  function waitForVoices() {
    return new Promise((resolve) => {
      let voices = synth.getVoices();
      if (!voices.length) {
    console.log("Voices not loaded yet. Waiting...");
    speechSynthesis.onvoiceschanged = () => speakIntro();
    return;
  }
      if (voices.length) return resolve(voices);
      synth.onvoiceschanged = () => resolve(synth.getVoices());
    });
  }

  // 7. Speak Introduction
  function speakIntro(voices) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning." : hour < 18 ? "Good afternoon." : "Good evening.";

    const message = `${greeting} You are about to enter the world of Aajay Sundaran. ` +
      `An aerospace innovator with a mission to redefine the skies. ` +
      `A master of V-TOL aircraft, intelligent U-A-V systems, and advanced flight engineering. ` +
      `Also an AI developer and programmer, blending code with control to build the future of flight.`+
      `Where precision meets passion, and innovation takes flight. ` +
      `Welcome to the future of aerospace — welcome to his legacy.`;

    const utterance = new SpeechSynthesisUtterance(message);
    const preferred = voices.find(v => v.name === "Google UK English Female" && v.lang === "en-GB");
    const fallback = voices.find(v => v.lang.startsWith("en")) || voices[0];

    utterance.voice = preferred || fallback;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    synth.cancel();
    synth.speak(utterance);
  }

  // 8. Trigger speech on click
  waitForVoices().then((voices) => {
    document.addEventListener('click', () => {
      if (hasSpoken) return;
      hasSpoken = true;
      if (cursorText) cursorText.style.display = 'none';
      document.body.classList.remove('cursor-hidden');
      speakIntro(voices);
    }, { once: true });
  });

  // 9. Reset contact form
  if (contactForm) {
    contactForm.reset();
  }

  // 10. Scroll to top on load
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  // 11. Set arrow cursor (default)
  document.body.style.cursor = "default";
});

// 12. Prevent scroll restoration on reload
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// 13. Mobile Sidebar Toggle
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("mobile-visible");
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (window.innerWidth <= 768) {
    sidebar.classList.remove("mobile-visible");
  }
}
