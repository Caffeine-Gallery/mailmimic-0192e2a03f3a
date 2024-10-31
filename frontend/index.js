import { backend } from 'declarations/backend';

const loginForm = document.getElementById('login_form');
const loginStatus = document.getElementById('login-status');
const loginStatusMessage = document.getElementById('login-status-message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    try {
        const result = await backend.login(username, password);
        if (result) {
            showLoginStatus('Login successful. Redirecting...', 'success');
            // Redirect to main application page (you'll need to implement this)
            // window.location.href = '/dashboard';
        } else {
            showLoginStatus('Invalid login credentials.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showLoginStatus('An error occurred during login. Please try again.', 'error');
    }
});

function showLoginStatus(message, type) {
    loginStatusMessage.textContent = message;
    loginStatus.className = `${type}-notice`;
    loginStatus.style.visibility = 'visible';
}

// Implement locale switching functionality
window.toggle_locales = function(show) {
    const localeContainer = document.getElementById('locale-container');
    localeContainer.style.visibility = show ? 'visible' : 'hidden';
};

// You may want to implement additional functionality for timezone detection and handling
// using the provided CPTimezone object and related functions

document.addEventListener('DOMContentLoaded', () => {
    CPTimezone.reset_timezone();
    CPTimezone.show_cookie_timezone_mismatch_nodes();
});
