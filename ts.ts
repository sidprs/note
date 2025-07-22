<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Metadachi</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0a0a0a;
            color: #ffffff;
            line-height: 1.6;
        }

        .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            border-bottom: 1px solid #2a2a2a;
            background-color: #111111;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 600;
            color: #ffffff;
        }

        .nav {
            display: flex;
            gap: 2rem;
        }

        .nav-item {
            padding: 0.5rem 1rem;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s;
            color: #a0a0a0;
        }

        .nav-item:hover {
            background-color: #2a2a2a;
            color: #ffffff;
        }

        .nav-item.active {
            background-color: #333333;
            color: #ffffff;
        }

        .header-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .icon-btn {
            width: 40px;
            height: 40px;
            border: none;
            background: #2a2a2a;
            color: #a0a0a0;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .icon-btn:hover {
            background-color: #3a3a3a;
            color: #ffffff;
        }

        /* Main Content */
        .main-content {
            display: flex;
            flex: 1;
        }

        .sidebar {
            width: 300px;
            background-color: #111111;
            border-right: 1px solid #2a2a2a;
            padding: 1.5rem;
            overflow-y: auto;
        }

        .content-area {
            flex: 1;
            padding: 2rem;
            overflow-y: auto;
        }

        /* Dashboard Specific Styles */
        .page-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .page-subtitle {
            color: #a0a0a0;
            font-size: 0.9rem;
            margin-bottom: 2rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background-color: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.2s;
        }

        .stat-card:hover {
            border-color: #3a3a3a;
            background-color: #1e1e1e;
        }

        .stat-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .stat-title {
            font-size: 0.9rem;
            color: #a0a0a0;
            font-weight: 500;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: #ffffff;
        }

        .stat-subtitle {
            font-size: 0.8rem;
            color: #666666;
            margin-top: 0.25rem;
        }

        /* Sources List */
        .sources-section {
            background-color: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }

        .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #ffffff;
        }

        .source-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 0.5rem;
            background-color: #222222;
            border: 1px solid #2a2a2a;
            cursor: pointer;
            transition: all 0.2s;
        }

        .source-item:hover {
            background-color: #2a2a2a;
            border-color: #3a3a3a;
        }

        .source-icon {
            width: 20px;
            height: 20px;
            margin-right: 0.75rem;
            opacity: 0.6;
        }

        .source-info {
            flex: 1;
        }

        .source-title {
            font-weight: 500;
            margin-bottom: 0.25rem;
        }

        .source-date {
            font-size: 0.8rem;
            color: #666666;
        }

        .source-status {
            font-size: 0.8rem;
            color: #4ade80;
            background-color: #1f2937;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
        }

        /* Tags */
        .tags-section {
            background-color: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 12px;
            padding: 1.5rem;
        }

        .tags-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tag {
            background-color: #333333;
            color: #a0a0a0;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid #3a3a3a;
        }

        .tag:hover {
            background-color: #3a3a3a;
            color: #ffffff;
        }

        /* Library Grid */
        .library-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .library-card {
            background-color: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.2s;
            cursor: pointer;
        }

        .library-card:hover {
            border-color: #3a3a3a;
            background-color: #1e1e1e;
        }

        .library-date {
            font-size: 0.8rem;
            color: #666666;
            margin-bottom: 0.5rem;
        }

        .library-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #ffffff;
        }

        .library-summary {
            font-size: 0.9rem;
            color: #a0a0a0;
            line-height: 1.5;
            margin-bottom: 1rem;
        }

        .library-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .library-tag {
            background-color: #2a2a2a;
            color: #a0a0a0;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.7rem;
        }

        /* Chat Interface */
        .chat-container {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .welcome-message {
            text-align: center;
            margin-top: 3rem;
        }

        .welcome-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #ffffff;
        }

        .welcome-subtitle {
            color: #a0a0a0;
            font-size: 1rem;
            margin-bottom: 2rem;
        }

        .chat-input-container {
            margin-top: auto;
            padding: 1rem;
            border-top: 1px solid #2a2a2a;
        }

        .chat-input {
            width: 100%;
            background-color: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 12px;
            padding: 1rem;
            color: #ffffff;
            font-size: 1rem;
            resize: none;
            outline: none;
            transition: border-color 0.2s;
        }

        .chat-input:focus {
            border-color: #3a3a3a;
        }

        .chat-input::placeholder {
            color: #666666;
        }

        .source-list {
            padding: 0;
        }

        .source-list-item {
            display: flex;
            align-items: flex-start;
            padding: 0.75rem;
            margin-bottom: 0.5rem;
            background-color: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .source-list-item:hover {
            background-color: #222222;
            border-color: #3a3a3a;
        }

        .source-list-icon {
            width: 16px;
            height: 16px;
            margin-right: 0.75rem;
            margin-top: 0.25rem;
            opacity: 0.6;
        }

        .source-list-content {
            flex: 1;
        }

        .source-list-title {
            font-weight: 500;
            margin-bottom: 0.25rem;
            font-size: 0.9rem;
        }

        .source-list-date {
            font-size: 0.8rem;
            color: #666666;
        }

        .add-source-btn {
            width: 100%;
            background-color: #2a2a2a;
            color: #ffffff;
            border: 1px solid #3a3a3a;
            border-radius: 8px;
            padding: 0.75rem;
            margin-bottom: 1rem;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .add-source-btn:hover {
            background-color: #3a3a3a;
        }

        .toolbar {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            align-items: center;
        }

        .search-input {
            flex: 1;
            background-color: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 8px;
            padding: 0.75rem 1rem;
            color: #ffffff;
            font-size: 0.9rem;
        }

        .toolbar-btn {
            background-color: #2a2a2a;
            color: #a0a0a0;
            border: 1px solid #3a3a3a;
            border-radius: 6px;
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
        }

        .toolbar-btn:hover {
            background-color: #3a3a3a;
            color: #ffffff;
        }

        .toolbar-btn.active {
            background-color: #3a3a3a;
            color: #ffffff;
        }

        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo">Metadachi</div>
            <nav class="nav">
                <div class="nav-item active" data-page="dashboard">Dashboard</div>
                <div class="nav-item" data-page="summarize">Summarize</div>
                <div class="nav-item" data-page="library">Library</div>
                <div class="nav-item" data-page="notebooks">Notebooks</div>
            </nav>
            <div class="header-actions">
                <button class="icon-btn">🌙</button>
                <button class="icon-btn">👤</button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Dashboard Page -->
            <div id="dashboard-page" class="content-area">
                <div class="page-title">
                    Dashboard
                    <span class="page-subtitle">🚧 Work in Progress</span>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-title">Total Sources</div>
                        <div class="stat-value">14</div>
                        <div class="stat-subtitle">Across all types</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">Text Sources</div>
                        <div class="stat-value">14</div>
                        <div class="stat-subtitle">Direct text inputs</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">URL Sources</div>
                        <div class="stat-value">0</div>
                        <div class="stat-subtitle">Web pages</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">File Sources</div>
                        <div class="stat-value">0</div>
                        <div class="stat-subtitle">Uploaded files</div>
                    </div>
                </div>

                <div class="sources-section">
                    <h3 class="section-title">Recent Sources</h3>
                    <div class="source-item">
                        <div class="source-icon">📄</div>
                        <div class="source-info">
                            <div class="source-title">A detailed analysis of why Python is superior to J...</div>
                            <div class="source-date">Jun 7, 12:43 PM</div>
                        </div>
                        <div class="source-status">Summarized</div>
                    </div>
                    <div class="source-item">
                        <div class="source-icon">📄</div>
                        <div class="source-info">
                            <div class="source-title">Another day, another Arch installation....</div>
                            <div class="source-date">Jun 7, 12:43 PM</div>
                        </div>
                        <div class="source-status">Summarized</div>
                    </div>
                    <div class="source-item">
                        <div class="source-icon">📄</div>
                        <div class="source-info">
                            <div class="source-title">The heartbreak of Linux distribution preferences....</div>
                            <div class="source-date">Jun 7, 12:43 PM</div>
                        </div>
                        <div class="source-status">Summarized</div>
                    </div>
                    <div class="source-item">
                        <div class="source-icon">📄</div>
                        <div class="source-info">
                            <div class="source-title">Change my view: JavaScript is a mistake....</div>
                            <div class="source-date">Jun 7, 12:43 PM</div>
                        </div>
                        <div class="source-status">Summarized</div>
                    </div>
                    <div class="source-item">
                        <div class="source-icon">📄</div>
                        <div class="source-info">
                            <div class="source-title">My first program!...</div>
                            <div class="source-date">Jun 7, 12:43 PM</div>
                        </div>
                        <div class="source-status">Summarized</div>
                    </div>
                </div>

                <div class="tags-section">
                    <h3 class="section-title">Popular Tags</h3>
                    <div class="tags-grid">
                        <div class="tag">FirstCode</div>
                        <div class="tag">HelloWorld</div>
                        <div class="tag">coding-is-fun</div>
                        <div class="tag">LanguageWars</div>
                        <div class="tag">PythonCultist</div>
                    </div>
                </div>
            </div>

            <!-- Library Page -->
            <div id="library-page" class="content-area hidden">
                <div class="page-title">Your Library</div>
                <div class="page-subtitle">View and manage your sources and summaries</div>

                <div class="toolbar">
                    <input type="text" class="search-input" placeholder="Search sources...">
                    <button class="toolbar-btn active">All Types</button>
                    <button class="toolbar-btn">Tags</button>
                    <button class="toolbar-btn">Newest First</button>
                    <button class="toolbar-btn">📋</button>
                    <button class="toolbar-btn">📊</button>
                    <button class="toolbar-btn add-source-btn">+ Add Source</button>
                </div>

                <div class="library-grid">
                    <div class="library-card">
                        <div class="library-date">Jun 7, 2025 at 12:43 PM</div>
                        <div class="library-title">Hello World</div>
                        <div class="library-summary">This innocent 'Hello World' program was my gateway drug into a life of caffeine addiction, impostor syndrome, and explaining to my...</div>
                        <div class="library-tags">
                            <div class="library-tag">FirstCode</div>
                            <div class="library-tag">HelloWorld</div>
                            <div class="library-tag">coding-is-fun</div>
                        </div>
                    </div>
                    <div class="library-card">
                        <div class="library-date">Jun 7, 2025 at 12:43 PM</div>
                        <div class="library-title">Why I Chose Python Over Java: A 3...</div>
                        <div class="library-summary">What began as casual language preference spiraled into a 30-page academic thesis complete with footnotes, citations, and a...</div>
                        <div class="library-tags">
                            <div class="library-tag">LanguageWars</div>
                            <div class="library-tag">PythonCultist</div>
                            <div class="library-tag">TooMuchFreeTime</div>
                        </div>
                    </div>
                    <div class="library-card">
                        <div class="library-date">Jun 7, 2025 at 12:43 PM</div>
                        <div class="library-title">Installing Arch For The 7th Time...</div>
                        <div class="library-summary">My therapist says my compulsive Arch installations are a cry for help, but pure OS control is joy on her—I can't afford therapy because I keep buying...</div>
                        <div class="library-tags">
                            <div class="library-tag">BTW-ArchLinux</div>
                            <div class="library-tag">SelfInflictedPain</div>
                        </div>
                    </div>
                    <div class="library-card">
                        <div class="library-date">Jun 7, 2025 at 12:43 PM</div>
                        <div class="library-title">My Girlfriend Left Me For Someone...</div>
                        <div class="library-summary">She packed her bags the day she caught me explaining why her boyfriend's 'user-friendly' distro was for weaklings who couldn't handle...</div>
                        <div class="library-tags">
                            <div class="library-tag">LinuxLife</div>
                            <div class="library-tag">UseUbuntuTheySaid</div>
                            <div class="library-tag">TerminalLoneliness</div>
                        </div>
                    </div>
                    <div class="library-card">
                        <div class="library-date">Jun 7, 2025 at 12:43 PM</div>
                        <div class="library-title">JavaScript Was A Mistake CMV</div>
                        <div class="library-summary">This isn't just a hot take—it's a peer-reviewed dissertation on how Brendan Eich's 10-day coding bender in 1995 created the digital...</div>
                        <div class="library-tags">
                            <div class="library-tag">FrontendFatigue</div>
                            <div class="library-tag">HotTake</div>
                            <div class="library-tag">JavaScriptJail</div>
                        </div>
                    </div>
                    <div class="library-card">
                        <div class="library-date">Jun 7, 2025 at 12:43 PM</div>
                        <div class="library-title">My React App Uses 7 State...</div>
                        <div class="library-summary">Started with useState, panic-added Redux, threw in Zustand for flavor, sprinkled some Jotai because why not, and ended up with a...</div>
                        <div class="library-tags">
                            <div class="library-tag">Overengineering</div>
                            <div class="library-tag">ReactHell</div>
                            <div class="library-tag">WhyIsThisNotWorking</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notebooks Page -->
            <div id="notebooks-page" class="content-area hidden">
                <div class="page-title">Notebooks</div>
                <div class="page-subtitle">Organize your sources into collections</div>
                
                <div style="text-align: center; margin-top: 4rem; color: #666666;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📓</div>
                    <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">No notebooks yet</div>
                    <div style="font-size: 1rem;">Create your first notebook to organize your sources</div>
                    <button class="add-source-btn" style="max-width: 200px; margin: 2rem auto;">+ Create Notebook</button>
                </div>
            </div>

            <!-- Summarize/Chat Page -->
            <div id="summarize-page" class="main-content hidden">
                <div class="sidebar">
                    <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Sources</h3>
                    <button class="add-source-btn">+ Add Source</button>
                    <div class="source-list">
                        <div class="source-list-item">
                            <div class="source-list-icon">📄</div>
                            <div class="source-list-content">
                                <div class="source-list-title">Hello World</div>
                                <div class="source-list-date">text • 6/7/2025</div>
                            </div>
                        </div>
                        <div class="source-list-item">
                            <div class="source-list-icon">📄</div>
                            <div class="source-list-content">
                                <div class="source-list-title">Why I Chose Python Over Java: A 30 Page Essay</div>
                                <div class="source-list-date">text • 6/7/2025</div>
                            </div>
                        </div>
                        <div class="source-list-item">
                            <div class="source-list-icon">📄</div>
                            <div class="source-list-content">
                                <div class="source-list-title">Installing Arch For The 7th Time Today</div>
                                <div class="source-list-date">text • 6/7/2025</div>
                            </div>
                        </div>
                        <div class="source-list-item">
                            <div class="source-list-icon">📄</div>
                            <div class="source-list-content">
                                <div class="source-list-title">My Girlfriend Left Me For Someone Who Uses Ubuntu</div>
                                <div class="source-list-date">text • 6/7/2025</div>
                            </div>
                        </div>
                        <div class="source-list-item">
                            <div class="source-list-icon">📄</div>
                            <div class="source-list-content">
                                <div class="source-list-title">JavaScript Was A Mistake CMV</div>
                                <div class="source-list-date">text • 6/7/2025</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-area">
                    <div class="chat-container">
                        <div class="welcome-message">
                            <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;">💬</div>
                            <div class="welcome-title">Welcome to AI Chat</div>
                            <div class="welcome-subtitle">I'm here to help you explore and understand your sources. What would you like to know?</div>
                        </div>
                        <div class="chat-input-container">
                            <textarea class="chat-input" placeholder="Ask about your sources..." rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        class MetadachiApp {
            constructor() {
                this.currentPage = 'dashboard';
                this.init();
            }

            init() {
                this.bindEvents();
                this.showPage('dashboard');
            }

            bindEvents() {
                // Navigation
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        const page = e.target.dataset.page;
                        this.showPage(page);
                    });
                });

                // Search functionality
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.addEventListener('input', (e) => {
                        this.filterLibrary(e.target.value);
                    });
                }

                // Toolbar buttons
                document.querySelectorAll('.toolbar-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        if (!e.target.classList.contains('add-source-btn')) {
                            document.querySelectorAll('.toolbar-btn').forEach(b => b.classList.remove('active'));
                            e.target.classList.add('active');
                        }
                    });
                });

                // Add source buttons
                document.querySelectorAll('.add-source-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.showAddSourceModal();
                    });
                });

                // Interactive elements
                document.querySelectorAll('.source-item, .library-card, .source-list-item').forEach(item => {
                    item.addEventListener('click', () => {
                        this.showSourceDetails(item);
                    });
                });

                // Tags
                document.querySelectorAll('.tag').forEach(tag => {
                    tag.addEventListener('click', (e) => {
                        this.filterByTag(e.target.textContent);
                    });
                });

                // Chat input
                const chatInput = document.querySelector('.chat-input');
                if (chatInput) {
                    chatInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            this.sendMessage(e.target.value);
                            e.target.value = '';
                        }
                    });
                }
            }

            showPage(pageName) {
                // Update navigation
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

                // Hide all pages
                document.querySelectorAll('[id$="-page"]').forEach(page => {
                    page.classList.add('hidden');
                });

                // Show selected page
                const targetPage = document.getElementById(`${pageName}-page`);
                if (targetPage) {
                    targetPage.classList.remove('hidden');
                    this.currentPage = pageName;
                }
            }

            filterLibrary(searchTerm) {
                const cards = document.querySelectorAll('.library-card');
                cards.forEach(card => {
                    const title = card.querySelector('.library-title').textContent.toLowerCase();
                    const summary = card.querySelector('.library-summary').textContent.toLowerCase();
                    const isMatch = title.includes(searchTerm.toLowerCase()) || 
                                   summary.includes(searchTerm.toLowerCase());
                    card.style.display = isMatch ? 'block' : 'none';
                });
            }

            filterByTag(tag
