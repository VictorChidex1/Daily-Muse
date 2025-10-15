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

    setTimeout(() => {
      window.location.href = href;
    }, 300);
  }

  showLoading() {
    if (this.loadingSpinner) {
      this.loadingSpinner.style.display = "flex";
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
    window.addEventListener("load", () => {
      this.hideLoading();
    });

    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => this.hideLoading(), 500);
    });
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

      // If user has explicitly set a preference, use that
      if (savedMode === "enabled") {
        this.enableDarkMode();
      } else if (savedMode === "disabled") {
        this.disableDarkMode();
      } else {
        // If no preference saved, follow system preference
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

    // Listen for system preference changes
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          // Only auto-switch if user hasn't set a manual preference
          if (!localStorage.getItem("darkMode")) {
            if (e.matches) {
              this.enableDarkMode(false); // false = don't save to localStorage
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
    this.breakpoints = [320, 640, 768, 1024, 1280, 1536];
    this.init();
  }

  init() {
    this.setupObservers();
    this.processExistingImages();
  }

  setupObservers() {
    // Intersection Observer for lazy loading
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
    // Process regular images with data-src
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      this.addBlurPlaceholder(img);
      this.intersectionObserver.observe(img);
    });

    // Process post images specifically
    const postImages = document.querySelectorAll(".post-image");
    postImages.forEach((img) => {
      if (!img.hasAttribute("data-src") && img.src) {
        // Convert existing post images to lazy loading
        img.setAttribute("data-src", img.src);
        img.removeAttribute("src");
        this.addBlurPlaceholder(img);
        this.intersectionObserver.observe(img);
      }
    });
  }

  addBlurPlaceholder(img) {
    const parent = img.parentElement;
    if (!parent || parent.classList.contains("image-container")) return;

    const container = document.createElement("div");
    container.className = "image-container";
    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.borderRadius = "var(--border-radius)";

    // Create blur placeholder
    const placeholder = document.createElement("div");
    placeholder.className = "image-placeholder";
    placeholder.style.width = "100%";
    placeholder.style.height = "100%";
    placeholder.style.background = "var(--border-color)";
    placeholder.style.filter = "blur(10px)";
    placeholder.style.transition = "opacity 0.5s ease";

    // Wrap image
    parent.insertBefore(container, img);
    container.appendChild(placeholder);
    container.appendChild(img);

    // Style the actual image
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";
    img.style.width = "100%";
    img.style.height = "auto";
  }

  loadImage(img) {
    const container = img.parentElement;
    const placeholder = container?.querySelector(".image-placeholder");

    const src = img.getAttribute("data-src");
    if (!src) return;

    // Check WebP support and use WebP if available
    this.supportsWebP()
      .then((supportsWebP) => {
        const finalSrc = supportsWebP ? this.convertToWebP(src) : src;

        const tempImg = new Image();
        tempImg.onload = () => {
          img.src = finalSrc;
          img.style.opacity = "1";

          if (placeholder) {
            placeholder.style.opacity = "0";
            setTimeout(() => {
              placeholder.remove();
            }, 500);
          }
        };

        tempImg.onerror = () => {
          // Fallback to original format if WebP fails
          img.src = src;
          img.style.opacity = "1";

          if (placeholder) {
            placeholder.style.opacity = "0";
            setTimeout(() => {
              placeholder.remove();
            }, 500);
          }
        };

        tempImg.src = finalSrc;
      })
      .catch(() => {
        // If WebP check fails, use original source
        img.src = src;
        img.style.opacity = "1";

        if (placeholder) {
          placeholder.style.opacity = "0";
          setTimeout(() => {
            placeholder.remove();
          }, 500);
        }
      });
  }

  convertToWebP(src) {
    // Convert image path to WebP version
    if (src.match(/\.(jpg|jpeg|png)$/i)) {
      return src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    }
    return src;
  }

  supportsWebP() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    });
  }

  // Utility method to optimize new images
  optimizeImage(imgElement, src) {
    imgElement.setAttribute("data-src", src);
    this.addBlurPlaceholder(imgElement);
    this.intersectionObserver.observe(imgElement);
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  new PageTransitions();
  new DarkModeManager();
  new MobileNavigation();
  new BlogSearch();
  new CommentsSection();
  new ScrollAnimations();
  new ImageOptimizer(); // NEW: Initialize Image Optimizer

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

// Handle browser back/forward navigation
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (loadingSpinner) {
      loadingSpinner.style.display = "none";
    }
  }
});

// Error handling
window.addEventListener("error", function (e) {
  console.error("Script error:", e.error);
});

// Add CSS for search results, ripple effect, AND image optimization
const additionalStyles = `
  .search-results {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-hover);
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    margin-top: 0.5rem;
  }
  
  body.dark-mode .search-results {
    background: var(--dark-bg-secondary);
    border: 1px solid var(--dark-border);
  }
  
  .search-result-item {
    border-bottom: 1px solid var(--border-color);
  }
  
  body.dark-mode .search-result-item {
    border-bottom: 1px solid var(--dark-border);
  }
  
  .search-result-item:last-child {
    border-bottom: none;
  }
  
  .search-result-link {
    display: block;
    padding: 1rem;
    color: var(--text-primary);
    transition: background-color var(--transition);
  }
  
  body.dark-mode .search-result-link {
    color: var(--dark-text-primary);
  }
  
  .search-result-link:hover {
    background-color: var(--border-color);
    color: var(--text-accent);
  }
  
  body.dark-mode .search-result-link:hover {
    background-color: var(--dark-border);
  }
  
  .search-result-link h4 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  .search-result-link p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  body.dark-mode .search-result-link p {
    color: var(--dark-text-secondary);
  }
  
  .search-result-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-light);
  }
  
  .no-results {
    padding: 1rem;
    text-align: center;
    color: var(--text-light);
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .message {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: var(--border-radius);
    text-align: center;
  }
  
  .message.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  body.dark-mode .message.success {
    background-color: #0f5132;
    color: #d1e7dd;
    border: 1px solid #0c4128;
  }

  /* IMAGE OPTIMIZATION STYLES */
  .image-container {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);
    background: var(--border-color);
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    background: var(--border-color);
    filter: blur(10px);
    transition: opacity 0.5s ease;
    transform: scale(1.1);
  }

  .image-container img {
    transition: opacity 0.5s ease;
    width: 100%;
    height: auto;
  }

  .post-image {
    width: 50%;
    height: auto;
    margin: 0 auto 1.5rem auto;
    display: block;
  }

  @media (max-width: 768px) {
    .post-image {
      width: 70%;
    }
  }

  @media (max-width: 480px) {
    .post-image {
      width: 85%;
    }
  }

  @keyframes imageLoad {
    0% { opacity: 0; transform: scale(1.02); }
    100% { opacity: 1; transform: scale(1); }
  }

  .image-container.loaded img {
    animation: imageLoad 0.6s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .image-placeholder,
    .image-container img {
      transition: none;
    }
    
    .image-container.loaded img {
      animation: none;
    }
  }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
