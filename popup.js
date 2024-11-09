document.getElementById("search-button").addEventListener("click", function() {
  const dorkType = document.getElementById("dorking-select").value;
  const query = document.getElementById("query").value.trim();

  if (query) {
    // Construct the search URL
    const searchQuery = dorkType ? `${dorkType} ${query}` : query;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    // Open a new tab with the search URL
    chrome.tabs.create({ url: searchUrl });
  }
});
