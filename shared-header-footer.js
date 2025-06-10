// shared-header-footer.js - Color-aware version for different sites
(function () {
    console.log('Shared header/footer script loading...');

    // Site configurations with colors
    const siteConfigs = {
        'husbandsgames': {
            title: "Husband's Games",
            color: '#D4AF37',  // Golden
            isMainSite: false
        },
        'learningreact': {
            title: 'Learning React',
            color: '#4FC3F7',  // Blue
            isMainSite: false
        },
        '538project': {
            title: 'FiveThirtyEight Engagement Analysis',
            color: '#FF6B35',  // Orange
            isMainSite: false
        },
        'fitbitstatsproject': {
            title: 'Fitbit Data Analysis',
            color: '#00C896',  // Green
            isMainSite: false
        },
        '2024electionforecast': {
            title: '2024 Election Forecast',
            color: '#8E44AD',  // Purple
            isMainSite: false
        },
        'default': {
            title: 'Ashley K. W. Warren - Portfolio',
            color: '#4A90E2',  // Blue
            isMainSite: true
        }
    };

    // Auto-detect current site
    function getCurrentConfig() {
        // Check for manual override
        if (window.siteConfig) {
            return window.siteConfig;
        }

        // Auto-detect from URL
        const hostname = window.location.hostname;
        const pathname = window.location.pathname.toLowerCase();

        // Main portfolio site
        if (hostname === 'wh33les.github.io' && (pathname === '/' || pathname === '/index.html')) {
            return siteConfigs.default;
        }

        // Check for specific project patterns
        if (pathname.includes('husband') || pathname.includes('games')) {
            return siteConfigs.husbandsgames;
        } else if (pathname.includes('react')) {
            return siteConfigs.learningreact;
        } else if (pathname.includes('538')) {
            return siteConfigs['538project'];
        } else if (pathname.includes('fitbit')) {
            return siteConfigs.fitbitstatsproject;
        } else if (pathname.includes('election')) {
            return siteConfigs['2024electionforecast'];
        }

        // Fallback to URL structure detection
        const projectMatch = pathname.match(/\/([^\/]+)/);
        if (projectMatch) {
            const project = projectMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '');

            // Match against config keys
            for (const key of Object.keys(siteConfigs)) {
                if (key.replace(/[^a-z0-9]/g, '') === project) {
                    return siteConfigs[key];
                }
            }
        }

        return siteConfigs.default;
    }

    function createHeader() {
        const config = getCurrentConfig();

        const headerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 2rem; position: relative;">
                ${!config.isMainSite ? `
                <div style="position: absolute; top: 2rem; right: 2rem;">
                    <a href="https://wh33les.github.io" style="color: #888; text-decoration: none; font-size: 0.9rem;" 
                       onmouseover="this.style.color='${config.color}'" 
                       onmouseout="this.style.color='#888'">Back to projects |</a>
                </div>` : ''}
                
                <h1 style="margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: normal; color: ${config.color}; letter-spacing: 1px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    ${config.title}
                </h1>
                <hr style="border: none; border-top: 2px solid ${config.color}; margin: 0; width: 100%;">
            </div>
        `;

        return headerHTML;
    }

    function createFooter() {
        const config = getCurrentConfig();
        const date = new Date(document.lastModified);

        const footerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem 2rem 2rem;">
                <hr style="border: none; border-top: 1px solid ${config.color}; margin: 2rem 0 0 0; width: 100%;" />
                <p style="color: ${config.color}; font-size: 16px; margin-top: -3px; margin-left: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <em>Last modified:</em> ${date.toString()}
                </p>
            </div>
        `;

        return footerHTML;
    }

    function injectComponents() {
        console.log('Injecting header and footer...');

        // Remove existing components if present
        const existingHeader = document.getElementById('shared-header');
        const existingFooter = document.getElementById('shared-footer');
        if (existingHeader) existingHeader.remove();
        if (existingFooter) existingFooter.remove();

        // Set body styles
        document.body.style.margin = '0';
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#e0e0e0';

        // Create header
        const headerDiv = document.createElement('div');
        headerDiv.id = 'shared-header';
        headerDiv.innerHTML = createHeader();
        document.body.insertBefore(headerDiv, document.body.firstChild);

        // Create footer
        const footerDiv = document.createElement('div');
        footerDiv.id = 'shared-footer';
        footerDiv.innerHTML = createFooter();
        document.body.appendChild(footerDiv);

        // Adjust the main content container
        const rootDiv = document.getElementById('root');
        if (rootDiv) {
            rootDiv.style.maxWidth = '1200px';
            rootDiv.style.margin = '0 auto';
            rootDiv.style.padding = '0 2rem 2rem 2rem';
        }

        const config = getCurrentConfig();
        console.log(`Header and footer injected successfully for: ${config.title} (${config.color})!`);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectComponents);
    } else {
        injectComponents();
    }

    // For React apps - try again after delays
    setTimeout(injectComponents, 100);
    setTimeout(injectComponents, 500);

    // Make current config available for debugging
    window.currentSiteConfig = getCurrentConfig();
})();