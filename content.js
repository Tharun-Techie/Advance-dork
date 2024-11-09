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
  dorkingDiv.style.borderRadius = "8px";
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
