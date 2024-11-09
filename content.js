// Check if the Dorking UI already exists to avoid duplicates
if (!document.getElementById("dorking-options")) {
  // Create a container for Dorking options
  const dorkingDiv = document.createElement("div");
  dorkingDiv.id = "dorking-options";
  dorkingDiv.innerHTML = `
    <select id="dorking-select" style="margin-right: 5px;">
      <option value="">🔍 Select Dork</option>
      <option value="site:">site:</option>
      <option value="inurl:">inurl:</option>
      <option value="filetype:">filetype:</option>
      <option value="intitle:">intitle:</option>
    </select>
    <input type="text" id="dorking-query" placeholder="Enter query" style="width: 200px;"/>
  `;

  // Style the container to align with Google's search bar
  dorkingDiv.style.position = "absolute";
  dorkingDiv.style.top = "50px";  // Adjust to fit beside Google’s search bar
  dorkingDiv.style.left = "calc(50% - 150px)"; // Center align
  dorkingDiv.style.zIndex = "1000";
  dorkingDiv.style.display = "flex";
  dorkingDiv.style.alignItems = "center";
  dorkingDiv.style.padding = "8px";
  dorkingDiv.style.backgroundColor = "white";
  dorkingDiv.style.border = "1px solid #ddd";
  dorkingDiv.style.borderRadius = "5px";
  dorkingDiv.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";

  // Append the container to Google's main content area
  const googleSearchDiv = document.querySelector("form");
  googleSearchDiv.parentNode.insertBefore(dorkingDiv, googleSearchDiv);

  // Add event listeners
  document.getElementById("dorking-select").addEventListener("change", function () {
    const dorkType = this.value;
    const query = document.getElementById("dorking-query").value;
    if (dorkType && query) {
      document.querySelector("input[name='q']").value = `${dorkType}${query}`;
      document.querySelector("form").submit();
    }
  });

  document.getElementById("dorking-query").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const dorkType = document.getElementById("dorking-select").value;
      if (dorkType && this.value) {
        document.querySelector("input[name='q']").value = `${dorkType}${this.value}`;
        document.querySelector("form").submit();
      }
    }
  });
}
