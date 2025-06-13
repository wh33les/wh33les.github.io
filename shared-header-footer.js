// shared-header-footer.js - Color-aware version for different sites
// This entire script is wrapped in an Immediately Invoked Function Expression (IIFE)
// to avoid polluting the global namespace and prevent variable conflicts
(function () {
    // Log message to browser console for debugging - helps verify the script is loading
    console.log('Shared header/footer script loading...');

    // Configuration object containing settings for each different website/project
    // Each site gets its own title, color scheme, and navigation type
    const siteConfigs = {
        // Configuration for the Husband's Games project
        'husbandsgames': {
            title: "Husband's Games",           // Page title that appears in h1
            color: '#D4AF37',                   // Golden color for accents (title, links, etc.)
            isMainSite: false                   // Not the main portfolio site, so show "Back to projects"
        },
        // Configuration for the Learning React project
        'learningreact': {
            title: 'Learning React',            // Page title
            color: '#4FC3F7',                   // Light blue color for accents
            isMainSite: false                   // Show "Back to projects" link
        },
        // Configuration for the 538 data analysis project
        '538project': {
            title: 'FiveThirtyEight Engagement Analysis',  // Page title
            color: '#FF6B35',                   // Orange color for accents
            isMainSite: false                   // Show "Back to projects" link
        },
        // Configuration for the Fitbit data project
        'fitbitstatsproject': {
            title: 'Fitbit Data Analysis',      // Page title
            color: '#00C896',                   // Green color for accents
            isMainSite: false                   // Show "Back to projects" link
        },
        // Configuration for the election forecast project
        '2024electionforecast': {
            title: '2024 Election Forecast',    // Page title
            color: '#8E44AD',                   // Purple color for accents
            isMainSite: false                   // Show "Back to projects" link
        },
        // Default configuration used when no specific project is detected
        'default': {
            title: 'Ashley K. W. Warren - Portfolio',  // Default page title
            color: '#4A90E2',                   // Blue color for accents
            isMainSite: true                    // This IS the main site, show main navigation
        }
    };

    // Function to determine which site configuration to use
    // Returns the appropriate config object based on the current URL
    function getCurrentConfig() {
        // First check if there's a manual override set by the page
        // This allows individual pages to force a specific configuration
        if (window.siteConfig) {
            return window.siteConfig;
        }

        // Get the current URL information for auto-detection
        const hostname = window.location.hostname;          // e.g., "wh33les.github.io"
        const pathname = window.location.pathname.toLowerCase();  // e.g., "/husbandsgames" (converted to lowercase)

        // Check if this is the main portfolio site (root page)
        if (hostname === 'wh33les.github.io' && (pathname === '/' || pathname === '/index.html')) {
            return siteConfigs.default;
        }

        // Check for specific project patterns in the URL path
        // These if/else statements look for keywords in the URL to identify the project
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

        // Fallback detection method: try to extract project name from URL structure
        // This regex looks for the first part of the path after the domain
        const projectMatch = pathname.match(/\/([^\/]+)/);   // Matches "/projectname" and captures "projectname"
        if (projectMatch) {
            // Clean the project name by removing non-alphanumeric characters
            const project = projectMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '');

            // Try to match this cleaned project name against our config keys
            for (const key of Object.keys(siteConfigs)) {
                // Clean the config key the same way and compare
                if (key.replace(/[^a-z0-9]/g, '') === project) {
                    return siteConfigs[key];
                }
            }
        }

        // If no matches found, use the default configuration
        return siteConfigs.default;
    }

    // Function to generate the HTML for the page header
    // Uses the site configuration to customize colors and navigation
    function createHeader() {
        // Get the configuration for the current site
        const config = getCurrentConfig();

        // Generate the header HTML using template literals (backticks allow embedded expressions)
        const headerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 2rem; position: relative;">
                ${!config.isMainSite ? `
                <div style="position: absolute; top: 2rem; right: 2rem;">
                    <a href="https://wh33les.github.io/Projects/projects.html" style="color: #888; text-decoration: none; font-size: 0.9rem;" 
                       onmouseover="this.style.color='${config.color}'" 
                       onmouseout="this.style.color='#888'">Back to projects |</a>
                </div>` : ''}
                
                <h1 style="margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: normal; color: ${config.color}; letter-spacing: 1px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    ${config.title}
                </h1>
                <hr style="border: none; border-top: 2px solid ${config.color}; margin: 0; width: 100%;">
            </div>
        `;

        // Return the generated HTML string
        return headerHTML;
    }

    // Function to generate the HTML for the page footer
    // Creates a "Last modified" section that matches the original lastmodified.html format
    function createFooter() {
        // Get the configuration for the current site
        const config = getCurrentConfig();
        // Get the document's last modified date from the browser
        const date = new Date(document.lastModified);

        // Generate footer HTML that matches the exact format from lastmodified.html
        // Uses inline styles to ensure consistent appearance
        const footerHTML = `
            <div style="margin-top: 30px; margin-left: -50px; margin-bottom: -50px;">
                <hr><i style="color: ${config.color};">Last modified: </i><span style="color: ${config.color};">${date.toString()}</span>
            </div>
        `;

        // Return the generated HTML string
        return footerHTML;
    }

    // Main function that actually adds the header and footer to the page
    // This function modifies the DOM (Document Object Model) to inject our components
    function injectComponents() {
        // Log message for debugging
        console.log('Injecting header and footer...');

        // Remove any existing header/footer components to prevent duplicates
        // getElementById returns null if element doesn't exist, so this is safe
        const existingHeader = document.getElementById('shared-header');
        const existingFooter = document.getElementById('shared-footer');
        if (existingHeader) existingHeader.remove();    // Remove old header if it exists
        if (existingFooter) existingFooter.remove();    // Remove old footer if it exists

        // Set basic styling on the document body
        // These styles ensure consistent appearance across all sites
        document.body.style.margin = '0';                    // Remove default browser margin
        document.body.style.backgroundColor = '#1a1a1a';     // Dark background color
        document.body.style.color = '#e0e0e0';               // Light text color

        // Create and inject the header
        const headerDiv = document.createElement('div');     // Create a new div element
        headerDiv.id = 'shared-header';                      // Give it an ID for future reference
        headerDiv.innerHTML = createHeader();                // Set its content to our header HTML
        document.body.insertBefore(headerDiv, document.body.firstChild);  // Insert at the beginning of body

        // Create and inject the footer
        const footerDiv = document.createElement('div');     // Create a new div element
        footerDiv.id = 'shared-footer';                      // Give it an ID for future reference
        footerDiv.innerHTML = createFooter();                // Set its content to our footer HTML
        document.body.appendChild(footerDiv);                // Add it to the end of the body

        // Adjust styling for React apps (if the root div exists)
        const rootDiv = document.getElementById('root');     // Look for React's root container
        if (rootDiv) {
            // Apply consistent styling to the React container
            rootDiv.style.maxWidth = '1200px';               // Limit maximum width
            rootDiv.style.margin = '0 auto';                 // Center horizontally
            rootDiv.style.padding = '0 2rem 2rem 2rem';      // Add padding (no top padding since header provides it)
        }

        // Log success message with site-specific information for debugging
        const config = getCurrentConfig();
        console.log(`Header and footer injected successfully for: ${config.title} (${config.color})!`);
    }

    // Event listener setup to run our injection function when the page is ready
    // This handles different loading states to ensure the script works in all scenarios
    if (document.readyState === 'loading') {
        // If the document is still loading, wait for it to be ready
        document.addEventListener('DOMContentLoaded', injectComponents);
    } else {
        // If the document is already loaded, run immediately
        injectComponents();
    }

    // Additional safeguards for React applications
    // React apps often load content after the initial DOM load, so we try multiple times
    setTimeout(injectComponents, 100);   // Try again after 100 milliseconds
    setTimeout(injectComponents, 500);   // Try again after 500 milliseconds

    // Make the current site configuration available globally for debugging
    // This allows developers to check which config is being used by typing
    // "window.currentSiteConfig" in the browser console
    window.currentSiteConfig = getCurrentConfig();
})();  // End of IIFE - the () at the end immediately executes the function