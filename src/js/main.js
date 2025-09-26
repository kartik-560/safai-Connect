
window.addEventListener('DOMContentLoaded', () => {

  const loginScreen = document.getElementById('loginScreen');
  const navHeader = document.getElementById('navHeader');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const notifications = document.getElementById('notifications');
  const modalOverlay = document.getElementById('modalOverlay');

  function showScreen(screen) {
    [loginScreen, navHeader, sidebar, mainContent].forEach(el => {
      if (!el) return;
      if (el === screen) {
        el.classList.remove('hidden');
        el.classList.add('active');
      } else {
        el.classList.add('hidden');
        el.classList.remove('active');
      }
    });
  }


  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const role = document.getElementById('userRole').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (window.authSystem && window.authSystem.login(email, password, role)) {
 
        window.Utils?.storage.set('currentUser', { email, role });
        showScreen(mainContent);
        navHeader.classList.remove('hidden');
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('hidden');
  
        loadDashboard(role);
    
  window.navigation?.init(role);
      } else {
        window.Notifications?.show('Invalid credentials', 'error');
      }
    });
  }

  // Logout logic
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.authSystem?.logout();
      window.Utils?.storage.remove('currentUser');
      showScreen(loginScreen);
      navHeader.classList.add('hidden');
      sidebar.classList.add('hidden');
      mainContent.classList.add('hidden');
    });
  }

  // Load dashboard by role
  function loadDashboard(role) {
    if (!mainContent) return;
    mainContent.innerHTML = '';
    switch (role) {
      case 'superadmin':
        window.SuperadminDashboard?.loadSection?.('dashboard');
        break;
      case 'admin':
        window.AdminDashboard?.loadSection?.('dashboard');
        break;
      case 'green-champion':
        window.GreenChampionDashboard?.loadSection?.('dashboard');
        break;
      case 'worker':
        window.WorkerDashboard?.loadSection?.('dashboard');
        break;
      case 'citizen':
        window.CitizenDashboard?.loadSection?.('dashboard');
        break;
      default:
        mainContent.innerHTML = '<p>Unknown role</p>';
    }
  }

  // Auto-login if user is already stored
  const storedUser = window.Utils?.storage.get('currentUser');
  if (storedUser && storedUser.role) {
    showScreen(mainContent);
    navHeader.classList.remove('hidden');
    sidebar.classList.remove('hidden');
    mainContent.classList.remove('hidden');
    loadDashboard(storedUser.role);
  window.navigation?.init(storedUser.role);
  } else {
    showScreen(loginScreen);
  }
});