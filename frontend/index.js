import { backend } from 'declarations/backend';

const loginForm = document.getElementById('loginForm');
const mailbox = document.getElementById('mailbox');
const emailList = document.getElementById('emailList');
const inboxView = document.getElementById('inboxView');
const composeView = document.getElementById('composeView');
const inboxLink = document.getElementById('inboxLink');
const composeLink = document.getElementById('composeLink');
const logoutBtn = document.getElementById('logoutBtn');
const composeForm = document.getElementById('composeForm');
const loadingSpinner = document.getElementById('loadingSpinner');

let currentUser = null;

function showLoading() {
    loadingSpinner.classList.remove('d-none');
}

function hideLoading() {
    loadingSpinner.classList.add('d-none');
}

document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    showLoading();
    try {
        const result = await backend.login(email, password);
        if (result) {
            currentUser = email;
            loginForm.classList.add('d-none');
            mailbox.classList.remove('d-none');
            loadEmails();
        } else {
            alert('Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    } finally {
        hideLoading();
    }
});

async function loadEmails() {
    showLoading();
    try {
        const emails = await backend.getEmails(currentUser);
        emailList.innerHTML = '';
        emails.forEach(email => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${email.from}</td>
                <td>${email.subject}</td>
                <td>${email.date}</td>
            `;
            emailList.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading emails:', error);
        alert('An error occurred while loading emails. Please try again.');
    } finally {
        hideLoading();
    }
}

inboxLink.addEventListener('click', (e) => {
    e.preventDefault();
    inboxView.classList.remove('d-none');
    composeView.classList.add('d-none');
    inboxLink.classList.add('active');
    composeLink.classList.remove('active');
});

composeLink.addEventListener('click', (e) => {
    e.preventDefault();
    inboxView.classList.add('d-none');
    composeView.classList.remove('d-none');
    inboxLink.classList.remove('active');
    composeLink.classList.add('active');
});

logoutBtn.addEventListener('click', () => {
    currentUser = null;
    loginForm.classList.remove('d-none');
    mailbox.classList.add('d-none');
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
});

composeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    showLoading();
    try {
        await backend.sendEmail(currentUser, to, subject, message);
        alert('Email sent successfully!');
        composeForm.reset();
        inboxLink.click();
        loadEmails();
    } catch (error) {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the email. Please try again.');
    } finally {
        hideLoading();
    }
});
