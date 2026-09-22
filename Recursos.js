/* =========================================================
   TRADUCCIONES
========================================================= */
const TRANSLATIONS = {
  es: {
    nav_home:    "Inicio",
    nav_info:    "Información general",
    nav_shop:    "Lumen Shop",
    nav_centers: "Centros",
    nav_tours:   "Giras inclusivas",
    nav_pros:    "Profesionales",
    nav_about:   "Sobre nosotros",

    drop_autism:      "¿Qué es el autismo?",
    drop_causes:      "Causas del autismo",
    drop_levels:      "Niveles de autismo",
    drop_signs:       "Señales de alerta",
    drop_girls:       "Autismo en niñas y...",
    drop_conditions:  "Condiciones asociadas...",

    drop_who:         "¿Quiénes somos?",
    drop_mission:     "Misión y visión",
    drop_contact:     "Contacto",

    recursos_title:   "Recursos extras",
    recursos_mat_title: "Materiales<br>imprimibles",
    recursos_mat_desc:  "Encuentra actividades y recursos para descargar e imprimir.",
    recursos_mus_title: "Música",
    recursos_mus_desc:  "Música relajante, sonidos suaves y recursos auditivos para diferentes momentos del día.",

    footer_copy:      "2026 Lumen. Todos los derechos reservados.",
    footer_access:    "Accesos rápidos",
    footer_community: "¡Visita nuestra comunidad!",
    footer_contact:   "Contáctanos",
    footer_email_label: "Correo electrónico:",
  },

  en: {
    nav_home:    "Home",
    nav_info:    "General information",
    nav_shop:    "Lumen Shop",
    nav_centers: "Centers",
    nav_tours:   "Inclusive tours",
    nav_pros:    "Professionals",
    nav_about:   "About us",

    drop_autism:      "What is autism?",
    drop_causes:      "Causes of autism",
    drop_levels:      "Levels of autism",
    drop_signs:       "Warning signs",
    drop_girls:       "Autism in girls...",
    drop_conditions:  "Associated conditions...",

    drop_who:         "Who are we?",
    drop_mission:     "Mission and vision",
    drop_contact:     "Contact",

    recursos_title:   "Extra Resources",
    recursos_mat_title: "Printable<br>materials",
    recursos_mat_desc:  "Find activities and resources to download and print.",
    recursos_mus_title: "Music",
    recursos_mus_desc:  "Relaxing music, soft sounds and auditory resources for different moments of the day.",

    footer_copy:      "2026 Lumen. All rights reserved.",
    footer_access:    "Quick access",
    footer_community: "Visit our community!",
    footer_contact:   "Contact us",
    footer_email_label: "Email:",
  }
};

/* =========================================================
   METADATOS DE IDIOMA
========================================================= */
const LANG_META = {
  es: { label: "ES", flagSrc: "https://flagcdn.com/w80/es.png", htmlLang: "es" },
  en: { label: "EN", flagSrc: "https://flagcdn.com/w80/gb.png", htmlLang: "en" },
};

let currentLang = localStorage.getItem("lumen-lang") || "es";

/* =========================================================
   TODO EL CÓDIGO QUE TOCA EL DOM SE EJECUTA CUANDO EL
   DOCUMENTO YA ESTÁ LISTO. Así no importa si este <script>
   está en el <head> o al final del <body>: el navbar ya
   existe cuando intentamos leerlo.
========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     APLICAR TRADUCCIONES
  ========================================================= */
  function applyTranslations(lang) {
    const dict = TRANSLATIONS[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.documentElement.lang = LANG_META[lang].htmlLang;
  }

  /* =========================================================
     SINCRONIZAR EL INDICADOR DE IDIOMA (bandera + ES/EN)
     Única responsable de que la bandera y las letras ES/EN
     reflejen SIEMPRE el idioma guardado en localStorage.
  ========================================================= */
  function syncLangIndicator(lang) {
    const langLabelEl = document.getElementById("langLabel");
    const langFlagEl  = document.getElementById("langFlag");
    if (langLabelEl) langLabelEl.textContent = LANG_META[lang].label;
    if (langFlagEl)  langFlagEl.src = LANG_META[lang].flagSrc;

    document.querySelectorAll(".lang-option").forEach(opt => {
      opt.classList.toggle("selected", opt.dataset.lang === lang);
    });
  }

  /* =========================================================
     CAMBIO DE IDIOMA
     Guarda en localStorage para que CUALQUIER otra página
     del sitio arranque ya con el idioma y la bandera correctos.
  ========================================================= */
  function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lumen-lang", lang);

    syncLangIndicator(lang);
    applyTranslations(lang);
    closeLangDropdown();
  }

  /* =========================================================
     DROPDOWN DE IDIOMA
  ========================================================= */
  const langBtn = document.getElementById("langBtn");
  const langDropdown = document.getElementById("langDropdown");

  function openLangDropdown() {
    langDropdown?.classList.add("open");
    langBtn?.setAttribute("aria-expanded", "true");
  }

  function closeLangDropdown() {
    langDropdown?.classList.remove("open");
    langBtn?.setAttribute("aria-expanded", "false");
  }

  function toggleLangDropdown() {
    if (!langDropdown) return;
    langDropdown.classList.contains("open") ? closeLangDropdown() : openLangDropdown();
  }

  langBtn?.addEventListener("click", e => {
    e.stopPropagation();
    toggleLangDropdown();
  });

  document.querySelectorAll(".lang-option").forEach(opt => {
    opt.addEventListener("click", () => switchLanguage(opt.dataset.lang));
    opt.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchLanguage(opt.dataset.lang);
      }
    });
  });

  /* =========================================================
     DROPDOWNS DE NAVEGACIÓN
  ========================================================= */
  document.querySelectorAll(".nav-item").forEach(item => {
    const dropdown = item.querySelector(".nav-dropdown");
    if (!dropdown) return;

    let closeTimeout;
    function abrir() { clearTimeout(closeTimeout); dropdown.classList.add("show"); }
    function cerrar() { closeTimeout = setTimeout(() => dropdown.classList.remove("show"), 500); }

    item.addEventListener("mouseenter", abrir);
    item.addEventListener("mouseleave", cerrar);
    dropdown.addEventListener("mouseenter", abrir);
    dropdown.addEventListener("mouseleave", cerrar);
  });

  document.addEventListener("click", () => {
    closeLangDropdown();
    document.querySelectorAll(".nav-item.open").forEach(i => i.classList.remove("open"));
  });

  /* =========================================================
     SISTEMA DE MODO CALMA
  ========================================================= */
  const themeBtn = document.getElementById("themeBtn");
  const themeIcon = document.getElementById("themeIcon");

  const THEME_ICONS = { normal: "☀️", calm: "🌙" };
  const THEME_LABELS = { normal: "Modo calma", calm: "Modo normal" };

  function getInitialTheme() {
    return localStorage.getItem("lumen-theme") || "normal";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.textContent = THEME_ICONS[theme];

    const labelEl = document.getElementById("themeLabel");
    if (labelEl) labelEl.textContent = THEME_LABELS[theme];

    themeBtn?.setAttribute(
      "aria-label",
      theme === "normal" ? "Activar modo calma" : "Volver al modo normal"
    );

    localStorage.setItem("lumen-theme", theme);
  }

  themeBtn?.addEventListener("click", () => {
    const temaActual = document.documentElement.getAttribute("data-theme") || "normal";
    applyTheme(temaActual === "normal" ? "calm" : "normal");
  });

  /* =========================================================
     APLICAR ESTADO GUARDADO AL CARGAR LA PÁGINA
     Corre siempre, sin importar qué elementos del navbar
     existan o falten en esta página en particular.
  ========================================================= */
  applyTheme(getInitialTheme());
  switchLanguage(currentLang);

});
