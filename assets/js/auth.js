const SUPABASE_URL = 'https://evfkosjabuxwrbqswkjc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Zmtvc2phYnV4d3JicXN3a2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNDM2OTAsImV4cCI6MjA5MjgxOTY5MH0.lg6lsVp_JTXqo8thFiq6RTQYuIkDzv3hKFX5ZGhfAZM';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const msgBox = document.getElementById('login-message');
            
            msgBox.innerText = 'Autenticando...';
            msgBox.className = 'message';

            const { error } = await sb.auth.signInWithPassword({ email, password });

            if (error) {
                msgBox.innerText = error.message === 'Invalid login credentials' 
                    ? 'E-mail ou senha incorretos.' 
                    : `Erro: ${error.message}`;
                msgBox.classList.add('error');
            } else {
                msgBox.innerText = 'Login realizado com sucesso!';
                msgBox.classList.add('success');
                setTimeout(() => window.location.href = '../homePage.html', 1000);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const msgBox = document.getElementById('register-message');
            
            if (password !== confirmPassword) {
                msgBox.innerText = 'As senhas não coincidem.';
                msgBox.classList.add('error');
                return;
            }

            msgBox.innerText = 'Criando conta...';
            msgBox.className = 'message';

            const { error } = await sb.auth.signUp({ email, password });

            if (error) {
                msgBox.innerText = `Erro: ${error.message}`;
                msgBox.classList.add('error');
            } else {
                msgBox.innerText = 'Conta criada com sucesso!';
                msgBox.classList.add('success');
                setTimeout(() => document.getElementById('signIn').click(), 2000);
            }
        });
    }

    const updateNavMenu = (session) => {
        const authNav = document.getElementById('auth-nav');
        if (!authNav) return;

        const path = window.location.pathname.toLowerCase();
        const isSubdir = path.includes('/seção inicial/') || path.includes('/cursos/') || path.includes('/se%c3%a7%c3%a3o%20inicial/');
        const pathPrefix = isSubdir ? '../' : '';

        if (session) {
            authNav.innerHTML = `<a href="#" id="btn-logout" class="btn-secondary" style="padding: 0.5rem 1.2rem; margin: 0 10px; font-size: 0.9rem; display: inline-block;">Sair</a>`;
            document.getElementById('btn-logout').addEventListener('click', async (e) => {
                e.preventDefault();
                await sb.auth.signOut();
                window.location.reload();
            });
        } else {
            authNav.innerHTML = `<a href="${pathPrefix}Seção Inicial/login.html" class="btn-primary" style="padding: 0.5rem 1.2rem; margin: 0 10px; font-size: 0.9rem; display: inline-block;">Entrar</a>`;
        }
    };

    sb.auth.onAuthStateChange((_event, session) => updateNavMenu(session));
    (async () => {
        const { data: { session } } = await sb.auth.getSession();
        updateNavMenu(session);
    })();
});
