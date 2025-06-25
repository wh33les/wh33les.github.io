// Projects data using JSX (requires type="text/babel")
window.projectsData = [
    {
        id: 3,
        thumbnailSrc: "projectthumbnails/housingprices.png",
        projectUrl: "https://github.com/wh33les/housing-prices-prediction",
        title: "Housing prices",
        date: "Jan 2025",
        update: (<i>(updated Jun 2025)</i>),
        description: (
            <p>
                <a
                    href="https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques/overview"
                    rel="noopener noreferrer"
                >
                    Kaggle competition to predict housing prices given 79 features.
                </a>{' '}
                Ranked in the top 2% out of ~24,000 submissions!
            </p>
        )
        // No sameTab property = opens in new tab (default)
    },
    {
        id: 1,
        thumbnailSrc: "projectthumbnails/rolling-polling-trends.png",
        projectUrl: "https://public.tableau.com/app/profile/ashley.k.w.warren/viz/rolling-polling-trends/2024PresidentialRaceMulti-ResolutionPollingAnalysis?publish=yes",
        title: '2024 presidential race: multi-resolution polling analysis',
        date: "Aug 2024",
        update: (<i>(updated Jun 2025)</i>),
        description: (
            <p>
                Data from FiveThirtyEight -- presidential election polling trends from April 7 2021 to November 4 2024.  Toggle between voting populations and regions.  Dashboard made using Tableau.
            </p>
        )
        // Tableau - keep in new tab
    },
    {
        id: 2,
        thumbnailSrc: "projectthumbnails/vit.png",
        projectUrl: "https://www.youtube.com/watch?v=n2BLDSyJqew&list=PLVDqIaLqAssM8_EftT-1l4OGmtpLFjeur&ab_channel=AshleyK.Wheeler",
        title: "Virtual inspiring talk",
        date: "Nov 2020",
        update: "",
        description: (
            <p>
                YouTube playlist dedicated to promoting early career mathematicians.  Presents a project
                on matroid varieties I completed in the late 2010s, aimed at an undergrad audience.
            </p>
        )
        // YouTube - keep in new tab
    }
];