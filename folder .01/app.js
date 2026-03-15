 /* ── SUPABASE CONFIG ── */
        const SUPABASE_URL = "https://smdomndufuewmhspepjh.supabase.co";
        const SUPABASE_KEY = "sb_publishable_TT3VnAi86tpbLHJ07DC4aQ_BxkxYbB-";

        // NOTE: Fix typo → supabase.createClient (not supabse.creatClient)
        // const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        /* ── DOM REFS ── */
        const authSection    = document.getElementById("auth-section");
        const userSection    = document.getElementById("user-section");
        const userEmailSpan  = document.getElementById("user-email");
        const authBtn        = document.getElementById("authBtn");
        const emailInput     = document.getElementById("email");
        const passwordInput  = document.getElementById("password");
        const forgotRow      = document.getElementById("forgotRow");

        let currentTab = 'login';

        /* ── TAB SWITCHER ── */
        function switchTab(tab) {
            currentTab = tab;
            document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
            document.getElementById('tabSignup').classList.toggle('active', tab === 'signup');
            authBtn.textContent    = tab === 'login' ? 'Sign In' : 'Create Account';
            forgotRow.style.display = tab === 'login' ? '' : 'none';
            document.querySelector('.card-header h2').textContent =
                tab === 'login' ? 'Welcome back 👋' : 'Create an account ✨';
            document.querySelector('.card-header p').textContent =
                tab === 'login' ? 'Sign in to your account to continue' : 'Join Supabase and start building';
        }

        /* ── AUTH HANDLER (demo) ── */
        function handleAuth() {
            const email = emailInput.value.trim();
            const pw    = passwordInput.value;

            if (!email) { showToast('Please enter your email address', 'error'); return; }
            if (!pw)    { showToast('Please enter your password', 'error'); return; }
            if (pw.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }

            // Loading state
            authBtn.classList.add('loading');
            authBtn.textContent = '';

            setTimeout(() => {
                authBtn.classList.remove('loading');
                // Demo: show user section
                authSection.classList.add('hidden');
                userSection.classList.remove('hidden');
                userEmailSpan.textContent = email;
                showToast(currentTab === 'login' ? '✓ Signed in successfully!' : '✓ Account created!', 'success');
            }, 1400);
        }

        /* ── GOOGLE HANDLER (demo) ── */
        function handleGoogle() {
            showToast('Redirecting to Google…', 'success');
        }

        /* ── LOGOUT ── */
        function handleLogout() {
            userSection.classList.add('hidden');
            authSection.classList.remove('hidden');
            emailInput.value = '';
            passwordInput.value = '';
            showToast('Signed out successfully', 'success');
        }

        /* ── PASSWORD TOGGLE ── */
        function togglePassword() {
            const t = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = t;
        }

        /* ── TOAST ── */
        function showToast(msg, type = '') {
            const el = document.getElementById('toast');
            el.textContent  = msg;
            el.className    = 'toast ' + type;
            el.classList.add('show');
            clearTimeout(el._t);
            el._t = setTimeout(() => el.classList.remove('show'), 3000);
        }

        /* ── ENTER KEY ── */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !authSection.classList.contains('hidden')) {
                handleAuth();
            }
        });