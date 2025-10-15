// Dark Mode Toggle Functionality - Fixed for iOS
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const toggleIcon = document.querySelector(".toggle-icon");

  // Check if elements exist before proceeding
  if (!darkModeToggle || !toggleIcon) {
    console.warn("Dark mode toggle elements not found");
    return;
  }

  // Improved dark mode detection and initialization
  function initializeDarkMode() {
    // Check for saved user preference first
    let darkModeEnabled = false;

    try {
      // Safely check localStorage
      const savedMode = localStorage.getItem("darkMode");
      darkModeEnabled = savedMode === "enabled";
    } catch (error) {
      console.warn("localStorage not available, using system preference");
      // Fallback to system preference if localStorage fails
      darkModeEnabled =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    // Apply dark mode if enabled
    if (darkModeEnabled) {
      document.body.classList.add("dark-mode");
      toggleIcon.textContent = "☀️";
    } else {
      document.body.classList.remove("dark-mode");
      toggleIcon.textContent = "🌙";
    }
  }

  // Initialize dark mode on page load
  initializeDarkMode();

  // Toggle dark mode with improved error handling
  darkModeToggle.addEventListener("click", function () {
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Toggle the class
    document.body.classList.toggle("dark-mode");

    // Update icon
    if (document.body.classList.contains("dark-mode")) {
      toggleIcon.textContent = "☀️";
    } else {
      toggleIcon.textContent = "🌙";
    }

    // Save user preference with error handling
    try {
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
    } catch (error) {
      console.warn("Could not save dark mode preference to localStorage");
    }
  });

  // Listen for system preference changes (optional enhancement)
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", (e) => {
      // Only apply system preference if user hasn't explicitly set a preference
      try {
        const userPreference = localStorage.getItem("darkMode");
        if (!userPreference) {
          if (e.matches) {
            document.body.classList.add("dark-mode");
            toggleIcon.textContent = "☀️";
          } else {
            document.body.classList.remove("dark-mode");
            toggleIcon.textContent = "🌙";
          }
        }
      } catch (error) {
        // If localStorage fails, follow system preference
        if (e.matches) {
          document.body.classList.add("dark-mode");
          toggleIcon.textContent = "☀️";
        } else {
          document.body.classList.remove("dark-mode");
          toggleIcon.textContent = "🌙";
        }
      }
    });
  }
});

// Rest of your existing code (BlogSearch and CommentsSection classes) remains the same...
class BlogSearch {
  constructor() {
    this.searchInput = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-button");
    this.searchResults = document.getElementById("search-results");
    this.searchContainer = document.querySelector(".search-container");
    this.articles = [];

    // Only initialize if search elements exist
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
      // This would typically come from an API or JSON file
      // For now, we'll create a static list based on your articles
      this.articles = [
        // ... your existing articles array remains the same
        {
          id: "finding-silence",
          title: "Finding Silence in a Noisy World",
          excerpt:
            "Silence is not the absence of sound. Its the presence of a different kind of clarity. In the constant hum of notifications...",
          content:
            "Silence is not the absence of sound. Its the presence of a different kind of clarity. In the constant hum of notifications and the endless scroll of digital content...",
          url: "finding-silence-in-a-noisy-world.html",
          date: "2023-10-21",
          readTime: "5 min read",
        },
        // ... include all your other articles
      ];
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  }

  setupEventListeners() {
    this.searchInput.addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });

    this.searchInput.addEventListener("focus", () => {
      if (this.searchInput.value) {
        this.searchResults.style.display = "block";
      }
    });

    this.searchButton.addEventListener("click", () => {
      this.handleSearch(this.searchInput.value);
    });

    // Close results when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.searchContainer.contains(e.target)) {
        this.searchResults.style.display = "none";
      }
    });

    // Handle Enter key
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch(this.searchInput.value);
      }
    });
  }

  handleSearch(query) {
    if (query.length < 2) {
      this.searchResults.style.display = "none";
      return;
    }

    const results = this.searchArticles(query);
    this.displayResults(results);
  }

  searchArticles(query) {
    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    return this.articles.filter((article) => {
      const searchableText = `
        ${article.title.toLowerCase()}
        ${article.excerpt.toLowerCase()}
        ${article.content.toLowerCase()}
      `;

      return searchTerms.some((term) => searchableText.includes(term));
    });
  }

  displayResults(results) {
    if (results.length === 0) {
      this.searchResults.innerHTML =
        '<div class="no-results">No articles found. Try different keywords.</div>';
    } else {
      this.searchResults.innerHTML = results
        .map(
          (article) => `
        <a href="${article.url}" class="search-result-item">
          <div class="search-result-title">${article.title}</div>
          <div class="search-result-excerpt">${article.excerpt}</div>
          <div class="search-result-meta">${this.formatDate(article.date)} • ${
            article.readTime
          }</div>
        </a>
      `
        )
        .join("");
    }

    this.searchResults.style.display = "block";
  }

  formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  performSearch(query) {
    if (query.trim()) {
      // For now, just show results in dropdown
      // You could also redirect to a search results page
      this.handleSearch(query);
    }
  }
}

// Initialize search when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BlogSearch();
});

// Comments Section Functionality
class CommentsSection {
  constructor() {
    this.commentForm = document.getElementById("commentForm");
    this.commentsList = document.getElementById("commentsList");
    this.comments = this.loadComments();
    this.init();
  }

  init() {
    if (this.commentForm) {
      this.setupEventListeners();
      this.displayComments();
    }
  }

  setupEventListeners() {
    this.commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleCommentSubmit(e);
    });
  }

  handleCommentSubmit(e) {
    const formData = new FormData(e.target);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    const submitBtn = this.commentForm.querySelector(".comment-submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    // Show loading state
    btnText.style.display = "none";
    btnLoading.style.display = "inline";
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        date: new Date().toISOString(),
        avatar: this.generateAvatar(name),
      };

      this.addComment(newComment);
      this.commentForm.reset();

      // Reset button state
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
      submitBtn.disabled = false;

      // Show success message
      this.showSuccessMessage();
    }, 1000);
  }

  generateAvatar(name) {
    return name.charAt(0).toUpperCase();
  }

  addComment(comment) {
    this.comments.unshift(comment); // Add to beginning
    this.saveComments();
    this.displayComments();
  }

  loadComments() {
    try {
      const saved = localStorage.getItem("blogComments");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    }

    // Return default comments for demonstration
    return [
      {
        id: 1,
        name: "Sarah Chen",
        email: "sarah@example.com",
        message:
          "This article resonated deeply with me. The part about finding silence in everyday moments is something I've been practicing, and it's truly transformative. Thank you for putting these thoughts into words!",
        date: "2024-01-15T10:30:00Z",
        avatar: "S",
      },
      {
        id: 2,
        name: "Marcus Johnson",
        email: "marcus@example.com",
        message:
          "I've been struggling with the constant need to be productive. Reading this felt like permission to breathe. Have you written more about incorporating these practices into a busy work life?",
        date: "2024-01-14T16:45:00Z",
        avatar: "M",
      },
    ];
  }

  saveComments() {
    try {
      localStorage.setItem("blogComments", JSON.stringify(this.comments));
    } catch (error) {
      console.error("Error saving comments:", error);
    }
  }

  displayComments() {
    if (this.comments.length === 0) {
      this.commentsList.innerHTML = `
        <div class="no-comments">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      `;
      return;
    }

    this.commentsList.innerHTML = this.comments
      .map(
        (comment) => `
      <div class="comment" data-comment-id="${comment.id}">
        <div class="comment-header">
          <div class="comment-author">
            <div class="comment-avatar">${comment.avatar}</div>
            <div class="comment-author-info">
              <h4>${this.escapeHtml(comment.name)}</h4>
              <div class="comment-meta">${this.formatDate(comment.date)}</div>
            </div>
          </div>
        </div>
        <div class="comment-content">
          <p>${this.escapeHtml(comment.message)}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  showSuccessMessage() {
    // You could add a toast notification here
    console.log("Comment posted successfully!");
  }
}

// Initialize comments section when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CommentsSection();
});
