// ===== Mobile hamburger menu =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    if (isOpen) {
      item.classList.remove('open');
      a.style.maxHeight = null;
    } else {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ===== Booking form -> WhatsApp message =====
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const deviceType = document.getElementById('deviceType').value;
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value.trim();
  const problem = document.getElementById('problem').value.trim();

  let encodedMessage = `Hi Alan Tech Solutions, I'd like to book a repair.%0A%0A`;
  encodedMessage += `*Name:* ${name}%0A`;
  encodedMessage += `*Phone:* ${phone}%0A`;
  encodedMessage += `*Device Type:* ${deviceType}%0A`;
  encodedMessage += `*Device Brand:* ${brand}%0A`;
  if (model) encodedMessage += `*Device Model:* ${model}%0A`;
  encodedMessage += `*Problem:* ${problem}%0A%0A`;
  encodedMessage += `📷 If available, please send photos of your device or the issue after sending this message.`;

  const waLink = `https://wa.me/917977102964?text=${encodedMessage}`;
  window.open(waLink, '_blank');
});
