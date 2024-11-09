if (!document.getElementById("dorking-options")) {
  const dorkingDiv = document.createElement("div");
  dorkingDiv.id = "dorking-options";

  dorkingDiv.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <select id="dorking-select" style="width: 250px;">
        <option value="">🔍 Select Google Dork</option>
        <option value="(term | operator)">Group Terms (OR): (term | operator)</option>
        <option value="*">Wildcard: *</option>
        <option value="\"keywords\"">Exact Match: "keywords"</option>
        <option value="1..100">Number Range: 1..100</option>
        <option value="-site:example.com">Exclude: -site:example.com</option>
        <option value="site:">Search Specific Site: site:</option>
        <!-- Document format options -->
        <option value="filetype:pdf">Document Format (PDF): filetype:pdf</option>
        <option value="filetype:docx">Document Format (DOCX): filetype:docx</option>
      </select>
      <input type="text" id="dorking-query" placeholder="Enter query" style="width: 240px;"/>
      <button id="dorking-search-button" style="width: 100px;">Search</button>
    </div>
  `;

  dorkingDiv.style.position = "absolute";
  dorkingDiv.style.top = "50px";
  dorkingDiv.style.left = "calc(50% - 150px)";
  dorkingDiv.style.zIndex = "1000";
  dorkingDiv.style.padding = "15px";
  dorkingDiv.style.backgroundColor = "white";
  dorkingDiv.style.border = "1px solid #ddd";
  dorkingDiv.style.borderRadius = "8px";if (!document.getElementById("dorking-options")) {
  // Creating a div for the dorking options tool
  const dorkingDiv = document.createElement("div");
  dorkingDiv.id = "dorking-options";
  
  dorkingDiv.innerHTML = `
    <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
      <select id="dorking-select" style="padding: 5px; border-radius: 5px;">
        <option value="">🔍 Select Google Dork</option>
        <option value="(term | operator)">Group Terms (OR)</option>
        <option value="*">Wildcard</option>
        <option value="\"keywords\"">Exact Match</option>
        <option value="1..100">Number Range</option>
        <option value="-site:example.com">Exclude Site</option>
        <option value="site:">Search Specific Site</option>
        <!-- Document format section -->
        <option value="filetype:pdf">Document Format (PDF)</option>
        <option value="filetype:docx">Document Format (DOCX)</option>
      </select>
      <input type="text" id="dorking-query" placeholder="Enter query" style="padding: 5px; width: 200px; border-radius: 5px;"/>
      <button id="dorking-search-button" style="padding: 5px; border-radius: 5px; background-color: #4285f4; color: white;">Search</button>
    </div>
  `;

  // Styling the dorking tool container
  dorkingDiv.style.position = "relative";
  dorkingDiv.style.padding = "10px";
  dorkingDiv.style.backgroundColor = "#f1f1f1";
  dorkingDiv.style.border = "1px solid #ddd";
  dorkingDiv.style.borderRadius = "8px";
  dorkingDiv.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";

  // Insert into Google Search DOM near the search bar
  const searchBar = document.querySelector("form");
  if (searchBar) {
    searchBar.parentNode.insertBefore(dorkingDiv, searchBar.nextSibling);
  }

  // Event listener for the Search button
  document.getElementById("dorking-search-button").addEventListener("click", function () {
    const dorkType = document.getElementById("dorking-select").value;
    const query = document.getElementById("dorking-query").value.trim();

    if (query) {
      // Constructing the search URL with dork
      const searchQuery = dorkType ? `${dorkType} ${query}` : query;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      
      // Opening search result in a new tab
      window.open(searchUrl, "_blank");
    }
  });
}

  dorkingDiv.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
  
  document.body.appendChild(dorkingDiv);

  document.getElementById("dorking-search-button").addEventListener("click", function () {
    const dorkType = document.getElementById("dorking-select").value;
    const query = document.getElementById("dorking-query").value;
    if (dorkType && query) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dorkType + " " + query)}`;
      window.open(searchUrl, "_blank");
    }
  });
}
