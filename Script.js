// GitHub Pages Debugging
console.log("GitHub Pages Debug - Script loaded successfully");
console.log("Current URL:", window.location.href);

// Immediate spinner removal
if (document.getElementById("loading-spinner")) {
  document.getElementById("loading-spinner").remove();
  console.log("Removed loading spinner element");
}
document.body.style.overflow = "";

// GitHub Pages specific fix
if (window.location.hostname.includes("github.io")) {
  console.log("GitHub Pages environment detected");

  window.addEventListener("load", function () {
    console.log("GitHub Pages - Window fully loaded");
    const spinner = document.getElementById("loading-spinner");
    if (spinner) {
      console.log("GitHub Pages - Removing stubborn spinner");
      spinner.remove();
    }
    document.body.style.overflow = "";
  });

  setTimeout(() => {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) {
      console.log("GitHub Pages - Emergency spinner removal");
      spinner.remove();
    }
    document.body.style.overflow = "";
  }, 3000);
}

// Smooth Page Transitions Manager (NO SPINNER)
class PageTransitions {
  constructor() {
    this.links = document.querySelectorAll("a[href]");
    this.init();
  }

  init() {
    this.setupLinkInterception();
  }

  setupLinkInterception() {
    this.links.forEach((link) => {
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

    setTimeout(() => {
      window.location.href = href;
    }, 100);
  }
}

// ADVANCED DARK MODE WITH SYSTEM SYNC
class DarkModeManager {
  constructor() {
    this.darkModeToggle = document.querySelector(".dark-mode-toggle");
    this.toggleIcon = document.querySelector(".toggle-icon");
    this.init();
  }

  init() {
    if (!this.darkModeToggle || !this.toggleIcon) return;

    this.darkModeToggle.style.display = "block";
    this.initializeDarkMode();
    this.setupEventListeners();
  }

  initializeDarkMode() {
    try {
      const savedMode = localStorage.getItem("darkMode");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedMode === "enabled") {
        this.enableDarkMode();
      } else if (savedMode === "disabled") {
        this.disableDarkMode();
      } else {
        if (systemPrefersDark) {
          this.enableDarkMode();
        } else {
          this.disableDarkMode();
        }
      }
    } catch (error) {
      console.warn("Dark mode initialization failed:", error);
    }
  }

  setupEventListeners() {
    this.darkModeToggle.addEventListener("click", () => {
      this.toggleDarkMode();
    });

    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("darkMode")) {
            if (e.matches) {
              this.enableDarkMode(false);
            } else {
              this.disableDarkMode(false);
            }
          }
        });
    }
  }

  toggleDarkMode() {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";

    if (isDarkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode(savePreference = true) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.classList.add("dark-mode");
    this.toggleIcon.textContent = "☀️";

    if (savePreference) {
      localStorage.setItem("darkMode", "enabled");
    }
  }

  disableDarkMode(savePreference = true) {
    document.documentElement.setAttribute("data-theme", "light");
    document.body.classList.remove("dark-mode");
    this.toggleIcon.textContent = "🌙";

    if (savePreference) {
      localStorage.setItem("darkMode", "disabled");
    }
  }
}

// Mobile Navigation Manager
class MobileNavigation {
  constructor() {
    this.menuToggle = document.querySelector(".menu-toggle");
    this.mainNav = document.querySelector(".main-nav");
    this.init();
  }

  init() {
    if (!this.menuToggle || !this.mainNav) return;

    if (!this.menuToggle.innerHTML) {
      this.menuToggle.innerHTML = "☰";
      this.menuToggle.setAttribute("aria-label", "Toggle navigation menu");
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.menuToggle.addEventListener("click", () => {
      this.toggleMenu();
    });

    this.mainNav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        this.closeMenu();
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !this.mainNav.contains(e.target) &&
        !this.menuToggle.contains(e.target)
      ) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.mainNav.classList.toggle("active");
    this.menuToggle.textContent = this.mainNav.classList.contains("active")
      ? "✕"
      : "☰";
  }

  closeMenu() {
    this.mainNav.classList.remove("active");
    this.menuToggle.textContent = "☰";
  }
}

// Blog Search Functionality
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

  async init() {
    await this.loadArticles();
    this.setupEventListeners();
  }

  async loadArticles() {
    try {
      this.articles = [
        {
          title: "The Art of Asking Questions",
          excerpt:
            "It occurred to me the other day that we spend most of our early lives being taught how to answer questions, and almost no time learning how to ask them...",
          url: "the-art-of-asking-questions.html",
          date: "2025-10-10",
          category: "Philosophy & Thinking",
        },
        {
          title: "Finding Silence in a Noisy World",
          excerpt:
            "Silence is not the absence of sound. It's the presence of a different kind of clarity...",
          url: "finding-silence-in-a-noisy-world.html",
          date: "2025-10-14",
          category: "Mindfulness & Attention",
        },
        {
          title: "The Unseen Architecture of Routine",
          excerpt:
            "We often think of routine as the enemy of spontaneity, the dull cousin of creativity...",
          url: "the-unseen-architecture-of-routine.html",
          date: "2025-10-12",
          category: "Personal Growth",
        },
      ];
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  }

  setupEventListeners() {
    this.searchInput.addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });

    this.searchButton.addEventListener("click", () => {
      this.handleSearch(this.searchInput.value);
    });

    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSearch(this.searchInput.value);
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.searchContainer.contains(e.target)) {
        this.hideResults();
      }
    });
  }

  handleSearch(query) {
    if (query.trim().length === 0) {
      this.hideResults();
      return;
    }

    if (query.length < 2) {
      return;
    }

    const results = this.searchArticles(query);
    this.displayResults(results);
  }

  searchArticles(query) {
    const searchTerm = query.toLowerCase();
    return this.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)
    );
  }

  displayResults(results) {
    if (results.length === 0) {
      this.searchResults.innerHTML =
        '<div class="no-results">No articles found matching your search.</div>';
      this.searchResults.style.display = "block";
      return;
    }

    this.searchResults.innerHTML = results
      .map(
        (article) => `
      <div class="search-result-item">
        <a href="${article.url}" class="search-result-link">
          <h4>${article.title}</h4>
          <p>${article.excerpt}</p>
          <div class="search-result-meta">
            <span class="search-result-category">${article.category}</span>
            <span class="search-result-date">${this.formatDate(
              article.date
            )}</span>
          </div>
        </a>
      </div>
    `
      )
      .join("");

    this.searchResults.style.display = "block";
  }

  hideResults() {
    this.searchResults.style.display = "none";
  }

  formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
}

// Comments Section Management
class CommentsSection {
  constructor() {
    this.commentsContainer = document.querySelector(".comments-section");
    if (this.commentsContainer) {
      this.init();
    }
  }

  init() {
    this.setupEventListeners();
    this.loadComments();
  }

  setupEventListeners() {
    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCommentSubmit(e);
      });
    }
  }

  handleCommentSubmit(e) {
    const formData = new FormData(e.target);
    const comment = {
      name: formData.get("name"),
      email: formData.get("email"),
      comment: formData.get("comment"),
      date: new Date().toISOString(),
      id: Date.now(),
    };

    this.saveComment(comment);
    this.displayComment(comment);
    e.target.reset();

    this.showMessage(
      "Thank you for your comment! It will be visible after moderation.",
      "success"
    );
  }

  saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem("blog-comments") || "[]");
    comments.push(comment);
    localStorage.setItem("blog-comments", JSON.stringify(comments));
  }

  loadComments() {
    const comments = JSON.parse(localStorage.getItem("blog-comments") || "[]");
    comments.forEach((comment) => this.displayComment(comment));
  }

  displayComment(comment) {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.innerHTML = `
      <div class="comment-header">
        <strong>${comment.name}</strong>
        <span class="comment-date">${this.formatDate(comment.date)}</span>
      </div>
      <div class="comment-content">${comment.comment}</div>
    `;

    const commentsList = document.querySelector(".comments-list");
    if (commentsList) {
      commentsList.appendChild(commentElement);
    }
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  showMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
      commentForm.parentNode.insertBefore(messageDiv, commentForm);

      setTimeout(() => {
        messageDiv.remove();
      }, 5000);
    }
  }
}

// Smooth Scrolling and Animations
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupScrollAnimations();
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  setupScrollAnimations() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      document
        .querySelectorAll(".blog-post, .category-card, .article-card")
        .forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(20px)";
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          observer.observe(el);
        });
    }
  }
}

// IMAGE OPTIMIZATION SYSTEM
class ImageOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupObservers();
    this.processExistingImages();
  }

  setupObservers() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.intersectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.1,
      }
    );
  }

  processExistingImages() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      this.intersectionObserver.observe(img);
    });

    const postImages = document.querySelectorAll(".post-image");
    postImages.forEach((img) => {
      if (!img.hasAttribute("data-src") && img.src) {
        img.setAttribute("data-src", img.src);
        img.removeAttribute("src");
        this.intersectionObserver.observe(img);
      }
    });
  }

  loadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) return;

    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.style.opacity = "1";
    };
    tempImg.onerror = () => {
      img.src = src;
      img.style.opacity = "1";
    };
    tempImg.src = src;
  }
}

// Clean initialization
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded - Starting initialization");

  new PageTransitions();
  new DarkModeManager();
  new MobileNavigation();
  new BlogSearch();
  new CommentsSection();
  new ScrollAnimations();
  new ImageOptimizer();

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

  document
    .querySelectorAll("button, .read-more, .view-all-btn")
    .forEach((button) => {
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
});

// Global error handling
window.addEventListener("error", function (e) {
  console.error("Script error:", e.error);
});
