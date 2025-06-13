// Projects data using JSX (requires type="text/babel")
window.projectsData = [
    {
        id: 1,
        thumbnailSrc: "projectthumbnails/husbandsgames.png",
        projectUrl: "https://wh33les.github.io/HusbandsGames",
        title: "Husband's games",
        date: "Jun 2025 and in progress",
        description: <p>A work in progress.  A database of Husband's video games.  More functionality (and games!) to come.</p>,
        sameTab: true  // This will open in same tab
    },
    {
        id: 2,
        thumbnailSrc: "projectthumbnails/tictactoe.png",
        projectUrl: "https://wh33les.github.io/LearningReact",
        title: "Learning React",
        date: "Mar 2025",
        description: (
            <p>
                For my longer term Husband's games project, I wanted to learn React.{' '}
                < a href="https://react.dev/learn/tutorial-tic-tac-toe" rel="noopener noreferrer" >
                    Here is the React tutorial's tic-tac-toe.
                </ a > {' '}
                See where I went with it!
            </p>
        ),
        sameTab: true  // This will open in same tab
    },
    {
        id: 3,
        thumbnailSrc: "projectthumbnails/housingprices.png",
        projectUrl: "https://github.com/wh33les/housing-prices-prediction",
        title: "Housing prices",
        date: "Jan 2025",
        description: (
            <p>
                <a
                    href="https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques/overview"
                    rel="noopener noreferrer"
                >
                    Kaggle competition to predict housing prices given 79 features.
                </a>{' '}
                Ranked in the top 1.9% out of over 24,000 submissions!
            </p>
        )
        // No sameTab property = opens in new tab (default)
    },
    {
        id: 4,
        thumbnailSrc: "projectthumbnails/electionforecast.png",
        projectUrl: "https://wh33les.github.io/2024ElectionForecast/",
        title: "2024 election forecast",
        date: "Nov 2024",
        description: (
            <p>
                Forecasts, on each day leading up to the 2024 U.S.presidential election, who will win.
                Predictions made using polling data from fivethirtyeight, along with FiveThirtyEight's polling averages for swing states (links to election data on FiveThirtyEight no longer exist).
            </p>
        ),
        sameTab: true  // This will open in same tab
    },
    {
        id: 5,
        thumbnailSrc: "projectthumbnails/mediareliability.png",
        projectUrl: "https://public.tableau.com/app/profile/ashley.k.w.warren/viz/BiasvReliability/BiasvsReliability",
        title: "Media bias vs. reliability",
        date: "Sep 2024",
        description: (
            <p>
                Political bias (left/right) of around 800 news media sources against their reliability ratings,
                according to Ad Fontes Media.  The data was scraped using Python and plotted using Tableau.
            </p>
        )
        // External Tableau - keep in new tab
    },
    {
        id: 6,
        thumbnailSrc: "projectthumbnails/polls.png",
        projectUrl: "https://public.tableau.com/app/profile/ashley.k.w.warren/viz/2024U_S_PresidentialElection_Pollingaveragesovertimeforthe2majorparties/Presentation",
        title: "2024 U.S. presidential election",
        date: "Aug 2024",
        description: (
            <p>
                Analyzed over 4,000 polls spanning three years of data from FiveThirtyEight.
                Daily rolling averages for Donald Trump, Kamala Harris, and Joe Biden, covering the period
                from April 7, 2021, to August 11, 2024 (periodic updates since then).  Toggle between polling
                data for likely voters, registered voters, and all voters.
            </p>
        )
        // External Tableau - keep in new tab
    },
    {
        id: 7,
        thumbnailSrc: "projectthumbnails/118thcongress.png",
        projectUrl: "https://github.com/wh33les/118thCongressProject",
        title: '"Do-nothing" congress',
        date: "Jun 2024",
        description: (
            <p>
                Using data from over 15,000 bills introduced in the 118th Congress, this project trains a
                model to predict whether a bill will become law.  Model outperforms the baseline accuracy
                of 99.6 % (where the baseline predicts no bill will become law).
            </p>
        )
        // GitHub - keep in new tab
    },
    {
        id: 8,
        thumbnailSrc: "projectthumbnails/fitbitstats.png",
        projectUrl: "http://wh33les.github.io/FitbitStatsProject/",
        title: "Ashley's FitBit stats",
        date: "Apr 2023",
        description: (
            <p>
                One year's worth of my FitBit data showing exercise and its impact on my sleep.
                Dashboard made using d3.js.
            </p>
        ),
        sameTab: true  // This will open in same tab
    },
    {
        id: 9,
        thumbnailSrc: "projectthumbnails/538project.png",
        projectUrl: "http://wh33les.github.io/538Project/",
        title: "538 project",
        date: "Mar 2023",
        description: (
            <p>
                Python script to scrape metadata from FiveThirtyEight. A key feature of this script is a custom
                function that renders JavaScript on each page to extract the number of comments from
                the Facebook plugin.
            </p>
        ),
        sameTab: true  // This will open in same tab
    },
    {
        id: 10,
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