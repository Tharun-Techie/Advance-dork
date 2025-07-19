class GoogleDorkTool {
    constructor() {
        this.searchHistory = [];
        this.init();
    }

    async init() {
        await this.loadHistory();
        this.setupEventListeners();
        this.updateDorkPreview();
        this.renderHistory();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Quick search
        document.getElementById('quickSearchBtn').addEventListener('click', () => {
            const query = document.getElementById('quickSearch').value.trim();
            if (query) this.performSearch(query);
        });

        document.getElementById('quickSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('quickSearchBtn').click();
        });

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategorySearch(e.target.dataset.category));
        });

        // Dork builder
        document.getElementById('buildSearchBtn').addEventListener('click', () => {
            const dork = this.buildDork();
            if (dork) this.performSearch(dork);
        });

        // Update preview when builder inputs change
        ['searchTerms', 'siteOperator', 'siteValue', 'fileType', 'inUrl', 'inTitle', 'dateRange'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updateDorkPreview());
            }
        });

        // Template buttons
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dork = e.target.dataset.dork;
                if (dork) this.performSearch(dork);
            });
        });

        // History management
        document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    }

    getCategoryDorks() {
        return {
            security: [
                'inurl:"/admin/login" OR intitle:"Admin Login"',
                'filetype:sql "password" OR filetype:sql "username"',
                'intitle:"index of" intext:"password.txt"',
                'inurl:"/config.php" OR inurl:"/configuration.php"'
            ],
            files: [
                'filetype:pdf "confidential" OR "internal use"',
                'filetype:xlsx OR filetype:xls "budget" OR "financial"',
                'filetype:doc OR filetype:docx "proposal" OR "contract"',
                'filetype:ppt OR filetype:pptx "presentation" -template'
            ],
            directories: [
                'intitle:"Index of /" +backup',
                'intitle:"Index of /" +password',
                'intitle:"Index of /" +log',
                'intitle:"Index of /" +config'
            ],
            login: [
                'inurl:/login OR inurl:/signin intitle:login',
                'inurl:/admin/login OR intitle:"Admin Panel"',
                'inurl:/user/login OR intitle:"User Login"',
                'inurl:/wp-login.php'
            ],
            errors: [
                'intext:"sql syntax near" OR intext:"syntax error has occurred"',
                'intext:"Warning: mysql_connect()" OR intext:"Warning: mysql_query()"',
                'intext:"Microsoft OLE DB Provider for ODBC Drivers error"',
                'intitle:"Error Occurred" OR intitle:"500 Internal Server Error"'
            ],
            cameras: [
                'intitle:"Live View / - AXIS" OR inurl:/view.shtml',
                'inurl:/control/userimage.html',
                'intitle:"DVR Login" inurl:/login.htm',
                'intitle:"Network Camera" intext:"MJPEG"'
            ]
        };
    }

    handleCategorySearch(category) {
        const dorks = this.getCategoryDorks()[category];
        if (dorks && dorks.length > 0) {
            // Use the first dork from the category
            this.performSearch(dorks[0]);
        }
    }

    buildDork() {
        const searchTerms = document.getElementById('searchTerms').value.trim();
        const siteOperator = document.getElementById('siteOperator').value;
        const siteValue = document.getElementById('siteValue').value.trim();
        const fileType = document.getElementById('fileType').value;
        const inUrl = document.getElementById('inUrl').value.trim();
        const inTitle = document.getElementById('inTitle').value.trim();

        let dork = '';

        if (searchTerms) {
            dork += searchTerms;
        }

        if (siteValue && siteOperator) {
            dork += ` ${siteOperator}${siteValue}`;
        }

        if (fileType) {
            dork += ` filetype:${fileType}`;
        }

        if (inUrl) {
            dork += ` inurl:"${inUrl}"`;
        }

        if (inTitle) {
            dork += ` intitle:"${inTitle}"`;
        }

        return dork.trim();
    }

    updateDorkPreview() {
        const dork = this.buildDork();
        const preview = document.getElementById('dorkPreview');
        if (preview) {
            preview.textContent = dork || 'Build your dork by filling the fields above...';
        }
    }

    async performSearch(query) {
        if (!query.trim()) {
            alert('Please enter a search query.');
            return;
        }

        // Add to history
        await this.addToHistory(query);

        // Construct Google search URL
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        // Open in new tab
        chrome.tabs.create({ url: searchUrl });
    }

    async addToHistory(query) {
        const historyItem = {
            query: query,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        // Avoid duplicates
        this.searchHistory = this.searchHistory.filter(item => item.query !== query);
        this.searchHistory.unshift(historyItem);

        // Keep only last 50 searches
        if (this.searchHistory.length > 50) {
            this.searchHistory = this.searchHistory.slice(0, 50);
        }

        await this.saveHistory();
        this.renderHistory();
    }

    async loadHistory() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['searchHistory'], (result) => {
                this.searchHistory = result.searchHistory || [];
                resolve();
            });
        });
    }

    async saveHistory() {
        return new Promise((resolve) => {
            chrome.storage.local.set({ searchHistory: this.searchHistory }, resolve);
        });
    }

    renderHistory() {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;

        if (this.searchHistory.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 20px;">No search history yet.</p>';
            return;
        }

        historyList.innerHTML = this.searchHistory.map(item => `
            <div class="history-item" data-query="${item.query}">
                <div class="history-item-query">${item.query}</div>
                <div class="history-item-time">${item.date} at ${item.time}</div>
            </div>
        `).join('');

        // Add click listeners to history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                this.performSearch(item.dataset.query);
            });
        });
    }

    async clearHistory() {
        if (confirm('Are you sure you want to clear all search history?')) {
            this.searchHistory = [];
            await this.saveHistory();
            this.renderHistory();
        }
    }
}

// Initialize the tool when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GoogleDorkTool();
});
