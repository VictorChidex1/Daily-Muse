// Dark Mode Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const toggleIcon = document.querySelector(".toggle-icon");

  // Check if elements exist before proceeding
  if (!darkModeToggle || !toggleIcon) {
    console.warn("Dark mode toggle elements not found");
    return;
  }

  // Check for saved user preference
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleIcon.textContent = "☀️";
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Save user preference
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggleIcon.textContent = "☀️";
    } else {
      localStorage.setItem("darkMode", "disabled");
      toggleIcon.textContent = "🌙";
    }
  });
});

// Blog Search Functionality
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
        {
          id: "art-of-asking",
          title: "The Art of Asking Questions",
          excerpt:
            "It occurred to me the other day that we spend most of our early lives being taught how to answer questions...",
          content:
            "It occurred to me the other day that we spend most of our early lives being taught how to answer questions, and almost no time learning how to ask them...",
          url: "the-art-of-asking-questions.html",
          date: "2023-10-27",
          readTime: "5 min read",
        },
        {
          id: "unseen-architecture",
          title: "The Unseen Architecture of Routine",
          excerpt:
            "We often think of routine as the enemy of spontaneity, the dull cousin of creativity. But what if weve got it backwards?...",
          content:
            "We often think of routine as the enemy of spontaneity, the dull cousin of creativity. But what if weve got it backwards?...",
          url: "the-unseen-architecture-of-routine.html",
          date: "2023-10-15",
          readTime: "4 min read",
        },
        {
          id: "permission-unproductive",
          title: "The Permission to Be Unproductive",
          excerpt:
            "In a world that worships at the altar of productivity, where every hobby should be a hustle...",
          content:
            "In a world that worships at the altar of productivity, where every hobby should be a hustle and every moment optimized...",
          url: "the-permission-to-be-unproductive.html",
          date: "2023-10-09",
          readTime: "4 min read",
        },
        {
          id: "beginners-mind",
          title: "The Wisdom of a Beginners Mind",
          excerpt:
            "There is a seductive comfort in expertise. After years in any field—be it your career, a relationship...",
          content:
            "There is a seductive comfort in expertise. After years in any field—be it your career, a relationship, or a creative pursuit...",
          url: "the-wisdom-of-a-beginners-mind.html",
          date: "2023-10-02",
          readTime: "4 min read",
        },
        {
          id: "slow-art",
          title: "The Slow Art of Deep Attention",
          excerpt:
            "We live in an economy of attention, and ours is a currency constantly under assault...",
          content:
            "We live in an economy of attention, and ours is a currency constantly under assault. Notifications, endless feeds, multi-tasking...",
          url: "the-slow-art-of-deep-attention.html",
          date: "2023-10-31",
          readTime: "5 min read",
        },
        {
          id: "unlikely-connections",
          title: "The Unlikely Connections",
          excerpt:
            "We are taught to specialize, to dive deep into a single silo of knowledge...",
          content:
            "We are taught to specialize, to dive deep into a single silo of knowledge. Our education systems, our career ladders...",
          url: "the-unlikely-connections.html",
          date: "2023-11-02",
          readTime: "4 min read",
        },
        {
          id: "negative-space",
          title: "The Power of Negative Space",
          excerpt:
            "In art, composition is everything. But what often goes unappreciated by the untrained eye...",
          content:
            "In art, composition is everything. But what often goes unappreciated by the untrained eye is the role of negative space...",
          url: "the-power-of-negative-Space.html",
          date: "2023-11-05",
          readTime: "5 min read",
        },
        {
          id: "stories-we-wear",
          title: "The Stories We Wear",
          excerpt:
            "We often think of our identity as a fixed, internal essence, a core self...",
          content:
            "We often think of our identity as a fixed, internal essence, a core self. But Ive come to understand it as something more fluid...",
          url: "the-stories-we-wear.html",
          date: "2023-11-08",
          readTime: "4 min read",
        },
        {
          id: "grace-of-end",
          title: "The Grace of a Good End",
          excerpt:
            "Our culture is infatuated with beginnings. We celebrate the new year, the new job...",
          content:
            "Our culture is infatuated with beginnings. We celebrate the new year, the new job, the new project, the clean slate...",
          url: "the-grace-of-a-good-end.html",
          date: "2023-11-11",
          readTime: "5 min read",
        },
        {
          id: "intelligence-hands",
          title: "The Intelligence of Your Hands",
          excerpt:
            "We have come to equate intelligence with what happens between our ears...",
          content:
            "We have come to equate intelligence with what happens between our ears—the speed of our processing, the breadth of our recall...",
          url: "the-intelligence-of-your-hands.html",
          date: "2023-11-14",
          readTime: "4 min read",
        },
        {
          id: "courage-changed-mind",
          title: "The Courage of a Changed Mind",
          excerpt:
            "We are raised to value consistency. We are told to stand our ground, to stick to our principles...",
          content:
            "We are raised to value consistency. We are told to stand our ground, to stick to our principles. In the public sphere...",
          url: "the-courage-of-a-changed-mind.html",
          date: "2023-11-17",
          readTime: "4 min read",
        },
        {
          id: "rhythm-seasons",
          title: "The Rhythm of the Seasons",
          excerpt:
            "Modernity has placed us in a state of perpetual, climate-controlled summer...",
          content:
            "Modernity has placed us in a state of perpetual, climate-controlled summer. Our food, our work, our entertainment...",
          url: "the-rhythm-of-the-seasons.html",
          date: "2023-11-20",
          readTime: "4 min read",
        },
        {
          id: "beauty-wobble",
          title: "The Beauty of a Wobble",
          excerpt:
            "We are sold a vision of balance as a static, perfect state of equilibrium...",
          content:
            "We are sold a vision of balance as a static, perfect state of equilibrium. We imagine it as the top of a mountain...",
          url: "the-beauty-of-a-wobble.html",
          date: "2023-11-23",
          readTime: "4 min read",
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
