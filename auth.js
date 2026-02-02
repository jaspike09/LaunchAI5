const SUPABASE_URL = 'https://yvgzyymjymrgjhhthgtj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z3p5eW1qeW1yZ2poaHRoZ3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5OTc1MzIsImV4cCI6MjA4NTU3MzUzMn0.814FVde267XILaw-VA76Yuk6Y6BVQpCr_5fAF2KtBFw';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const authForm = document.getElementById('authForm');
const toggleMode = document.getElementById('toggleMode');
const authTitle = document.getElementById('authTitle');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');

let isLogin = true;

// Personalize the title based on the idea from the landing page
const pendingIdea = localStorage.getItem('userBusinessIdea');
if (pendingIdea && authTitle) {
    authTitle.innerHTML = `Securing access for <span class="text-blue-400">"${pendingIdea}"</span>`;
}

toggleMode.onclick = () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? "Welcome to the inner circle." : "Begin your founder journey.";
    submitBtn.innerText = isLogin ? "Continue to Dashboard" : "Create My Account";
    toggleMode.innerHTML = isLogin ? 'Need an account? <span class="text-blue-400">Sign Up</span>' : 'Already a founder? <span class="text-blue-400">Login</span>';
};

authForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    message.innerText = "Authenticating...";
    message.className = "mt-4 text-center text-xs text-blue-400 animate-pulse";

    let result;
    if (isLogin) {
        result = await _supabase.auth.signInWithPassword({ email, password });
    } else {
        result = await _supabase.auth.signUp({ email, password });
    }

    if (result.error) {
        message.innerText = result.error.message;
        message.className = "mt-4 text-center text-xs text-red-500";
    } else {
        const user = result.data.user;

        // --- THE BRIDGE: Save Data to Cloud ---
        if (!isLogin && user) {
            // New user! Save their idea and tier to the 'profiles' table
            const savedIdea = localStorage.getItem('userBusinessIdea') || "New Venture";
            const isGodMode = localStorage.getItem('launchAI_GodMode') === 'true';

            await _supabase.from('profiles').upsert({
                id: user.id,
                business_idea: savedIdea,
                tier: isGodMode ? 'Architect' : 'Founder'
            });

            message.innerText = "Account Created! Initializing Briefing...";
            setTimeout(() => window.location.href = 'success.html', 1500);
        } else {
            // Returning user
            message.innerText = "Access Granted. Redirecting...";
            setTimeout(() => window.location.href = 'dashboard.html', 1500);
        }
    }
};
