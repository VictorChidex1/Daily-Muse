// Smooth Page Transitions Manager
class PageTransitions {
  constructor() {
    this.loadingSpinner = document.getElementById("loading-spinner");
    this.links = document.querySelectorAll("a[href]");
    this.init();
  }

  init() {
    this.setupLinkInterception();
    this.setupPerformanceMonitoring();
  }

  setupLinkInterception() {
    this.links.forEach((link) => {
      // Skip external links, mailto, tel, etc.
      if (this.shouldInterceptLink(link)) {
        link.addEventListener("click", (e) => {
          this.handleLinkClick(e, link);
        });
      }
    });
  }

  shouldInterceptLink(link) {
    const href = link.getAttribute("href");
    return (
      href &&
      !href.startsWith("http") &&
      !href.startsWith("//") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("tel:") &&
      !href.startsWith("#") &&
      href !== "javascript:void(0)"
    );
  }

  handleLinkClick(e, link) {
    e.preventDefault();
    const href = link.getAttribute("href");

    this.showLoading();

    // Small delay to show loading animation
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  }

  showLoading() {
    if (this.loadingSpinner) {
      this.loadingSpinner.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  hideLoading() {
    if (this.loadingSpinner) {
      this.loadingSpinner.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  setupPerformanceMonitoring() {
    // Hide loading spinner when page is fully loaded
    window.addEventListener("load", () => {
      this.hideLoading();
    });

    // Also hide if DOM content is loaded (fallback)
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => this.hideLoading(), 500);
    });
  }
}

// Enhanced Dark Mode Toggle (your existing code, optimized)
class DarkModeManager {
  constructor() {
    this.darkModeToggle = document.querySelector(".dark-mode-toggle");
    this.toggleIcon = document.querySelector(".toggle-icon");
    this.init();
  }

  init() {
    if (!this.darkModeToggle || !this.toggleIcon) return;

    this.initializeDarkMode();
    this.setupEventListeners();
  }

  initializeDarkMode() {
    try {
      const savedMode = localStorage.getItem("darkMode");
      const systemPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const shouldEnableDarkMode =
        savedMode === "enabled" || (!savedMode && systemPrefersDark);

      if (shouldEnableDarkMode) {
        document.body.classList.add("dark-mode");
        this.toggleIcon.textContent = "☀️";
      }
    } catch (error) {
      console.warn("Dark mode initialization failed:", error);
    }
  }

  setupEventListeners() {
    this.darkModeToggle.addEventListener("click", () => {
      this.toggleDarkMode();
    });

    // System preference listener
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("darkMode")) {
            this.toggleDarkMode(e.matches);
          }
        });
    }
  }

  toggleDarkMode(forceState = null) {
    const isDarkMode =
      forceState !== null
        ? forceState
        : document.body.classList.contains("dark-mode");

    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
      this.toggleIcon.textContent = "☀️";
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      this.toggleIcon.textContent = "🌙";
      localStorage.setItem("darkMode", "disabled");
    }
  }
}

// Your existing BlogSearch class (keep it exactly as is)
class BlogSearch {
  constructor() {
    this.searchInput = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-button");
    this.searchResults = document.getElementById("search-results");
    this.searchContainer = document.querySelector(".search-container");
    this.articles = [];

    if (this.searchInput && this.searchButton && this.searchResults) {
      this.init();
    }
  }

  // ... (keep all your existing BlogSearch methods exactly as they are)
  async init() {
    await this.loadArticles();
    this.setupEventListeners();
  }

  async loadArticles() {
    // ... your existing loadArticles method
  }

  setupEventListeners() {
    // ... your existing setupEventListeners method
  }

  handleSearch(query) {
    // ... your existing handleSearch method
  }

  searchArticles(query) {
    // ... your existing searchArticles method
  }

  displayResults(results) {
    // ... your existing displayResults method
  }

  formatDate(dateString) {
    // ... your existing formatDate method
  }

  performSearch(query) {
    // ... your existing performSearch method
  }
}

// Your existing CommentsSection class (keep it exactly as is)
class CommentsSection {
  constructor() {
    // ... your existing constructor
  }

  // ... (keep all your existing CommentsSection methods exactly as they are)
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  new PageTransitions();
  new DarkModeManager();
  new BlogSearch();
  new CommentsSection();

  // Add smooth entrance animation to main content
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.style.opacity = "0";
    mainContent.style.transform = "translateY(20px)";

    setTimeout(() => {
      mainContent.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      mainContent.style.opacity = "1";
      mainContent.style.transform = "translateY(0)";
    }, 100);
  }
});

// Handle browser back/forward navigation
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (loadingSpinner) {
      loadingSpinner.style.display = "none";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      // Toggle the 'active' class on the navigation
      mainNav.classList.toggle("active");

      // Accessibility: Update the button's aria-expanded state
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true" || false;
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }
});
