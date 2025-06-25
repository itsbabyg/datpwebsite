document.addEventListener("DOMContentLoaded", function() {

    const translations = {
        de: {
            menu: "☰ Menü",
            search: "Suche",
            kundenservice: "Kundenservice",
            imprint: "Impressum",
            privacy: "Datenschutz",
            backButton: "← Zurück zur Startseite",
            imprintTitle: "Impressum",
            imprintHeading: "Angaben gemäß § 5 TMG:",
            imprintContactHeading: "Kontakt:",
            privacyTitle: "Datenschutzerklärung",
            privacyIntro: "Hier steht Ihre Datenschutzerklärung. Sie sollten hier detailliert aufführen, welche Daten Sie wie und warum verarbeiten.",
            privacyWarning: "Es ist dringend empfohlen, für diesen Text einen professionellen Dienst oder einen Datenschutzgenerator zu verwenden, um rechtlich auf der sicheren Seite zu sein.",
            placeholderText: "(Bitte ersetzen Sie diese Platzhalter durch Ihre eigenen Daten.)"
        },
        en: {
            menu: "☰ Menu",
            search: "Search",
            kundenservice: "Customer Service",
            imprint: "Imprint",
            privacy: "Privacy Policy",
            backButton: "← Back to Home",
            imprintTitle: "Imprint",
            imprintHeading: "Information according to § 5 TMG:",
            imprintContactHeading: "Contact:",
            privacyTitle: "Privacy Policy",
            privacyIntro: "Your privacy policy goes here. You should detail which data you process, how, and why.",
            privacyWarning: "It is strongly recommended to use a professional service or a privacy policy generator for this text to be legally compliant.",
            placeholderText: "(Please replace these placeholders with your own data.)"
        }
    };

    const languageSwitcher = document.querySelector('.language-switcher');
    let currentLang = localStorage.getItem('language') || 'de';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        if(document.getElementById('html-lang')) {
            document.getElementById('html-lang').lang = lang;
        }

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if(translations[lang][key]) el.innerText = translations[lang][key];
        });

        if(document.body.id === 'imprint-page') {
             document.title = translations[lang].imprintTitle + " - Papadopoulos";
        }
        if(document.body.id === 'privacy-page') {
             document.title = translations[lang].privacyTitle + " - Papadopoulos";
        }

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

    setLanguage(currentLang);
});