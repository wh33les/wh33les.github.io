// shared-header-footer.js - Works across all repository types
(function () {
    // Configuration for different sites
    const siteConfigs = {
        'husbandsgames': {
            title: "Husband's Games",
            color: '#D4AF37',
            isMainSite: false
        },
        'learningreact': {
            title: 'Learning React',
            color: '#4FC3F7',
            isMainSite: false
        },
        'default': {
            title: 'Ashley K. W. Warren - Portfolio',
            color: '#4A90E2',
            isMainSite: true
        }
    };

    // Auto-detect current site or use manual override
    function getCurrentConfig() {
        // Check for manual override
        if (window.siteConfig) {
            return window.siteConfig;
        }

        // Auto-detect from URL
        const path = window.location.pathname.toLowerCase();

        if (path.includes('husband') || path.includes('games')) {
            return siteConfigs.husbandsgames;
        } else if (path.includes('react')) {
            return siteConfigs.learningreact;
        }

        return siteConfigs.default;
    }

    function createHeader() {
        const config = getCurrentConfig();

        const headerHTML = `
            <div style="background: #2d2d2d; color: ${config.color}; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div style="max-width: 1200px; margin: 0 auto; position: relative;">
                    ${!config.isMainSite ? `
                    <div style="position: absolute; top: -0.5rem; right: 0;">
                        <a href="https://wh33les.github.io" style="color: #888; text-decoration: none; font-size: 0.9rem;" 
                           onmouseover="this.style.color='${config.color}'" 
                           onmouseout="this.style.color='#888'">Back to projects |</a>
                    </div>` : ''}
                    
                    <h1 style="margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: normal; color: ${config.color}; letter-spacing: 1px;">
                        ${config.title}
                    </h1>
                    <hr style="border: none; border-top: 2px solid ${config.color}; margin: 0;">
                </div>
            </div>
        `;

        return headerHTML;
    }

    function createFooter() {
        const config = getCurrentConfig();
        const date = new Date(document.lastModified);

        const footerHTML = `
            <div style="background: #2d2d2d; color: #888; padding: 2rem; margin-top: 3rem; border-top: 1px solid #444; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                        <a href="https://github.com/wh33les" style="color: ${config.color}; text-decoration: none;" 
                           onmouseover="this.style.color='#fff'" 
                           onmouseout="this.style.color='${config.color}'">GitHub</a>
                        <a href="mailto:ashleykwwarren@gmail.com" style="color: ${config.color}; text-decoration: none;" 
                           onmouseover="this.style.color='#fff'" 
                           onmouseout="this.style.color='${config.color}'">Email</a>
                    </div>
                    <div style="color: #666; font-size: 0.9rem;">
                        Last modified: ${date.toLocaleDateString()}
                    </div>
                </div>
                <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #444; color: #666;">
                    © 2025 Ashley K. W. Warren | Math PhD → ML Engineer
                </div>
            </div>
        `;

        return footerHTML;
    }

    function injectComponents() {
        // Remove existing components if present
        const existingHeader = document.getElementById('shared-header');
        const existingFooter = document.getElementById('shared-footer');
        if (existingHeader) existingHeader.remove();
        if (existingFooter) existingFooter.remove();

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

        // Set basic body styles
        document.body.style.margin = '0';
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#e0e0e0';
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectComponents);
    } else {
        injectComponents();
    }

    // For React apps - try again after delay
    setTimeout(injectComponents, 100);

    // Make function available globally for manual refresh
    window.refreshSharedComponents = injectComponents;
})();