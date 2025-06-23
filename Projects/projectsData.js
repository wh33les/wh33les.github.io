// Projects data using JSX (requires type="text/babel")
window.projectsData = [
    {
        id: 1,
        thumbnailSrc: "projectthumbnails/polls.png",
        projectUrl: "https://public.tableau.com/app/profile/ashley.k.w.warren/viz/rolling-polling-trends/2024PresidentialRaceMulti-ResolutionPollingAnalysis?publish=yes",
        title: '2024 presidential race: multi-resolution polling analysis',
        date: "Aug 2024 (update: Jun 2025)",
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
        description: (
            <p>
                YouTube playlist dedicated to promoting early career mathematicians.  Presents a project
                on matroid varieties I completed in the late 2010s, aimed at an undergrad audience.
            </p>
        )
        // YouTube - keep in new tab
    }
];