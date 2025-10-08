const mobileBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('primary-nav');

if (mobileBtn && nav) {
  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('aria-hidden', String(expanded));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileBtn.contains(e.target)) {
      if (mobileBtn.getAttribute('aria-expanded') === 'true') {
        mobileBtn.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
      }
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileBtn.getAttribute('aria-expanded') === 'true') {
      mobileBtn.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      mobileBtn.focus();
    }
  });
}
