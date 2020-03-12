import yall from 'yall-js';

const loadYall = () => {
  yall({
    observeChanges: true,
  });
};

if (document.readyState !== 'loading') {
  loadYall();
} else {
  document.addEventListener('DOMContentLoaded', loadYall);
}
