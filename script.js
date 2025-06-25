document.addEventListener("DOMContentLoaded", function() {

    // --- Übersetzungs-Wörterbuch ---
    const translations = {
        de: {
            pageTitle: "papadopoulos",
            menu: "☰ Menü",
            search: "Suche",
            kundenservice: "Kundenservice",
            mainHashtag: "#COMINGSOON",
            subtitle: "PRIVATE ACCESS",
            description: "Die neue Kollektion wird bald enthüllt.",
            passwordPlaceholder: "Passwort",
            enterButton: "Enter",
            imprint: "Impressum",
            privacy: "Datenschutz",
            feedbackSuccess: "Zugang gewährt...",
            feedbackError: "Falsches Passwort"
        },
        en: {
            pageTitle: "papadopoulos",
            menu: "☰ Menu",
            search: "Search",
            kundenservice: "Customer Service",
            mainHashtag: "#COMINGSOON",
            subtitle: "PRIVATE ACCESS",
            description: "The new collection will be revealed soon.",
            passwordPlaceholder: "Password",
            enterButton: "Enter",
            imprint: "Imprint",
            privacy: "Privacy Policy",
            feedbackSuccess: "Access granted...",
            feedbackError: "Incorrect password"
        }
    };

    // --- Globale Variablen ---
    const languageSwitcher = document.querySelector('.language-switcher');
    let currentLang = localStorage.getItem('language') || 'de';
    let typewriterTimeout; // Variable, um den alten Schreibmaschinen-Timeout zu stoppen

    // --- KORRIGIERT: Schreibmaschinen-Effekt als eigene, steuerbare Funktion ---
    function runTypewriterEffect(lang) {
        const typewriterElement = document.getElementById('typewriter-text');
        const textToType = translations[lang].subtitle; // Holt Text aus dem Wörterbuch
        
        if (!typewriterElement || !textToType) return;

        // Stoppt eine eventuell noch laufende, alte Animation
        clearTimeout(typewriterTimeout);

        let charIndex = 0;
        typewriterElement.innerHTML = '<span class="cursor"></span>'; // Setzt das Feld zurück

        function type() {
            if (charIndex < textToType.length) {
                const currentText = textToType.substring(0, charIndex + 1);
                typewriterElement.innerHTML = currentText + '<span class="cursor"></span>';
                charIndex++;
                typewriterTimeout = setTimeout(type, 100);
            }
        }
        type(); // Startet die Animation
    }

    // --- KORRIGIERT: Die zentrale Funktion zum Setzen der Sprache ---
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        if(document.getElementById('html-lang')) {
            document.getElementById('html-lang').lang = lang;
        }

        // Aktualisiert alle normalen Textelemente
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            // WICHTIG: Überspringt das Schreibmaschinen-Element, da es speziell behandelt wird
            if (el.id !== 'typewriter-text' && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // Aktualisiert alle Platzhalter-Texte
        document.querySelectorAll('[data-translate-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-key-placeholder');
            if(translations[lang][key]) el.placeholder = translations[lang][key];
        });
        
        // Aktualisiert den Seitentitel
        const titleKey = 'pageTitle';
        if(translations[lang][titleKey]) document.title = translations[lang][titleKey];
        
        // Startet den Schreibmaschinen-Effekt für die neue Sprache
        runTypewriterEffect(lang);

        // Markiert die aktive Flagge
        document.querySelectorAll('.lang-flag').forEach(flag => {
            flag.classList.remove('active');
            if (flag.getAttribute('data-lang') === lang) flag.classList.add('active');
        });
    }

    languageSwitcher.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-flag')) {
            setLanguage(e.target.getAttribute('data-lang'));
        }
    });
    
    // --- Bestehende Logik (unverändert) ---
    const interactiveLinks = document.querySelectorAll('.interactive-link');
    const passwordSection = document.getElementById('password-section');
    const passwordInput = document.getElementById('passwordInput');

    interactiveLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            passwordSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passwordSection.classList.add('highlight-focus');
            passwordInput.focus();
            setTimeout(() => {
                passwordSection.classList.remove('highlight-focus');
            }, 1500);
        });
    });

    const passwordContainer = document.querySelector('.password-container');
    const togglePassword = document.getElementById('togglePassword');
    const submitButton = document.getElementById('submitButton');
    const feedbackMessage = document.getElementById('feedbackMessage');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.style.opacity = type === 'password' ? '0.7' : '1';
    });

    function checkPassword() {
        const correctPassword = "DeinGeheimesPasswort";
        feedbackMessage.classList.remove("visible", "success", "error");

        if (passwordInput.value === correctPassword) {
            feedbackMessage.textContent = translations[currentLang].feedbackSuccess;
            feedbackMessage.classList.add("success", "visible");
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '0';
            setTimeout(() => {
                console.log("Weiterleitung zur nächsten Seite...");
            }, 1200);
        } else {
            feedbackMessage.textContent = translations[currentLang].feedbackError;
            feedbackMessage.classList.add("error", "visible");
            passwordInput.value = "";
            passwordContainer.classList.add('shake-animation');
            setTimeout(() => {
                feedbackMessage.classList.remove("visible");
                passwordContainer.classList.remove('shake-animation');
            }, 3000);
        }
    }
    
    submitButton.addEventListener("click", checkPassword);
    passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            checkPassword();
        }
    });
    
    // Initial die Sprache setzen (startet auch den ersten Schreibmaschinen-Effekt)
    setLanguage(currentLang);
});

// Zusätzliches CSS für die Shake-Animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake { 0%, 100% {transform: translateX(0);} 10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);} 20%, 40%, 60%, 80% {transform: translateX(5px);} }
.shake-animation { animation: shake 0.5s ease-in-out; }`;
document.head.appendChild(style);