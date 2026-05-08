// ===== GİRİŞ SAYFASI JS =====

const ADMIN_USER = 'scorpion';
const ADMIN_PASS = 'scorpion2026';

// If already logged in, redirect
if (sessionStorage.getItem('scorpion_admin') === 'true') {
  window.location.href = 'admin.html';
}

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem('scorpion_admin', 'true');
    window.location.href = 'admin.html';
  } else {
    loginError.style.display = 'block';
    loginError.textContent = 'Kullanıcı adı veya şifre hatalı!';
    // Shake animation
    loginError.style.animation = 'none';
    setTimeout(() => { loginError.style.animation = 'shake 0.5s ease'; }, 10);
  }
});

// Add shake keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
  }
`;
document.head.appendChild(style);
