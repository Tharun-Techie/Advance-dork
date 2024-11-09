const basicDorkingSelect = document.getElementById("basicDorkingSelect");
const advancedDorkingSelect = document.getElementById("advancedDorkingSelect");
const searchButton = document.getElementById("searchButton");
const queryInput = document.getElementById("query");

// Advanced dork queries based on category selection
const advancedDorkQueries = {
  webcams: 'inurl:/view.shtml OR intitle:"Live View / - AXIS" OR inurl:/control/userimage.html',
  sqli: 'inurl:"product.php?pid=" OR inurl:"category.php?id="',
  xss: 'inurl:"search.php?q=" OR inurl:"results.php?q="',
  vulnerableServers: 'intitle:"Test Page for the Apache Web Server on Fedora Core"',
  sensitiveDirectories: 'intitle:"Index of /admin" OR intitle:"Index of /backup"',
  databaseFiles: 'filetype:sql intext:username password OR filetype:sql "insert into" (pass|passwd|password)',
  loginPages: 'intitle:"Login" inurl:/login OR intitle:"Login" inurl:/signin',
  networkDevices: 'intitle:"RouterOS" inurl:/winbox OR intitle:"Ubiquiti" intext:"airOS"',
  cctvSystems: 'intitle:"DVR Login" inurl:/login.htm',
  apacheTomcat: 'intitle:"Apache Tomcat" intext:"Apache Tomcat"',
  errorMessages: 'intext:"Error 404: Not Found"',
  gitRepos: 'filetype:gitweb inurl:git',
  configFiles: 'filetype:conf inurl:web.config',
  phpInfoFiles: 'filetype:php inurl:info',
  wordpressSites: 'inurl:/wp-admin',
  openDirectories: 'intitle:"Index of /" + "backup"',
  googleDriveLinks: 'inurl:"/uc?id="',
  wpConfig: 'filetype:txt inurl:wp-config',
  awsKeys: 'filetype:pem intext:PRIVATE KEY'
};

// Function to perform the search
function performSearch(query) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  chrome.tabs.create({ url });
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const customQuery = queryInput.value;
  const basicDorkOption = basicDorkingSelect.value;
  const advancedCategory = advancedDorkingSelect.value;

  // Prioritize custom query input
  if (customQuery) {
    performSearch(customQuery);
  } else if (advancedDorkQueries[advancedCategory]) {
    performSearch(advancedDorkQueries[advancedCategory]);
  } else if (basicDorkOption) {
    performSearch(basicDorkOption);
  } else {
    alert("Please enter a query or select a dorking option.");
  }
});

// Trigger search on pressing Enter in the search bar
queryInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});
