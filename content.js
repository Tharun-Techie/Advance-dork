if (!document.getElementById("dorking-options")) {
  // Create the container for the dorking options inside the search form
  const dorkingDiv = document.createElement("div");
  dorkingDiv.id = "dorking-options";
  
  dorkingDiv.innerHTML = `
    <select id="dorking-select" style="margin-right: 5px; width: 250px; font-size: 14px;">
      <option value="">🔍 Select Google Dork</option>
      <option value="(term | operator)">Group Terms (OR): (term | operator)</option>
      <option value="*">Wildcard: *</option>
      <option value="\"keywords\"">Exact Match: "keywords"</option>
      <option value="1..100">Number Range: 1..100</option>
      <option value="-site:example.com">Exclude: -site:example.com</option>
      <option value="+site:example.com">Include: +site:example.com</option>
      <option value="site:">Search Specific Site: site:</option>
      <option value="inurl:">Keyword in URL: inurl:</option>
      <option value="filetype:">Filetype: filetype:</option>
      <option value="allintitle:">All in Title: allintitle:</option>
      <option value="allinurl:">All in URL: allinurl:</option>
      <option value="allintext:">All in Text: allintext:</option>
      <option value="AROUND(n)">Proximity Search: AROUND(n)</option>
      <option value="after:YYYY-MM-DD">After Date: after:YYYY-MM-DD</option>
      <option value="before:YYYY-MM-DD">Before Date: before:YYYY-MM-DD</option>
      <option value="cache:">Cached Page: cache:</option>
      <option value="define:">Define: define:</option>
      <option value="link:">Linked Pages: link:</option>
      <option value="related:">Related Sites: related:</option>
      <option value="weather:">Weather: weather:</option>
      <option value="location:">Location-based: location:</option>
    </select>
    <input type="text" id="dorking-query" placeholder="Enter query" style="width: 200px; font-size: 14px; padding: 5px;"/>
    <button id="dorking-search-button" style="padding: 6px 12px; margin-left: 10px;">Search</button>
  `;

  // Apply styles to make it fit inside the form
  dorkingDiv.style.display = "flex";
  dorkingDiv.style.alignItems = "center";
  dorkingDiv.style.marginBottom = "10px"; // Space between the dropdown and the search input
  dorkingDiv.style.padding = "5px";
  dorkingDiv.style.border = "1px solid #ccc";
  dorkingDiv.style.borderRadius = "5px";
  dorkingDiv.style.backgroundColor = "#f8f8f8";

  // Select the search form and append the options container inside it
  const googleSearchForm = document.querySelector("form");
  googleSearchForm.insertBefore(dorkingDiv, googleSearchForm.querySelector("input[name='q']"));

  // Event listener for selecting a dork and updating the search input
  document.getElementById("dorking-select").addEventListener("change", function () {
    const dorkType = this.value;
    const query = document.getElementById("dorking-query").value;

    // If dork type is selected, update the query input with the dork
    if (dorkType) {
      document.getElementById("dorking-query").value = `${dorkType} ${query}`.trim();
    }
  });

  // Event listener for pressing Enter to trigger search
  document.getElementById("dorking-query").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission (page refresh)
      triggerSearch();
    }
  });

  // Event listener for clicking the search button
  document.getElementById("dorking-search-button").addEventListener("click", function () {
    triggerSearch();
  });

  // Function to trigger search and redirect to Google search results
  function triggerSearch() {
    const dorkType = document.getElementById("dorking-select").value;
    const query = document.getElementById("dorking-query").value;

    if (query) {
      // Construct the Google search URL with the selected dork and query
      const searchQuery = `${dorkType ? dorkType + " " : ""}${query}`.trim(); // If dork is selected, prepend it to the query
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

      // Manually redirect to the Google search URL
      window.location.href = googleSearchUrl;
    }
  }
}
