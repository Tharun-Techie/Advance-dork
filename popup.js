// Create a dropdown or input for Dorking options
const dorkingDiv = document.createElement("div");
dorkingDiv.id = "dorking-options";
dorkingDiv.innerHTML = `
  <select id="dorking-select">
    <option value="">Select Dork</option>
    <option value="site:">site:</option>
    <option value="inurl:">inurl:</option>
    <option value="filetype:">filetype:</option>
    <option value="intitle:">intitle:</option>
    <!-- Add other common dorking options here -->
  </select>
  <input type="text" id="dorking-query" placeholder="Enter your query"/>
  <button id="dorking-search">Search</button>
`;

// Style the dropdown or input area (basic)
dorkingDiv.style.position = "absolute";
dorkingDiv.style.top = "10px";  // Position it above the Google search bar
dorkingDiv.style.zIndex = "1000";

// Append to the body or a specific Google container
document.body.appendChild(dorkingDiv);

// Function to handle search
document.getElementById("dorking-search").addEventListener("click", function() {
  const dorkType = document.getElementById("dorking-select").value;
  const query = document.getElementById("dorking-query").value;
  if (dorkType && query) {
    const fullQuery = `${dorkType}${query}`;
    document.querySelector("input[name='q']").value = fullQuery;  // Inject into Google search bar
    document.querySelector("form").submit();  // Trigger the search
  }
});
