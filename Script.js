// Dark Mode Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const toggleIcon = document.querySelector(".toggle-icon");

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

// Add this to your existing script.js file

class BlogSearch {
  constructor() {
    this.searchInput = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-button");
    this.searchResults = document.getElementById("search-results");
    this.articles = [];
    this.init();
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
