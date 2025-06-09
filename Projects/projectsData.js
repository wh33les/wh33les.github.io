// Projects data using JSX (requires type="text/babel")
window.projectsData = [
    {
        id: 1,
        thumbnailSrc: "projectthumbnails/husbandsgames.png",
        projectUrl: "https://wh33les.github.io/HusbandsGames",
        title: "Husband's games",
        date: "Jun 2025 and in progress",
        description: <p>A work in progress.A database of Husband's video games. More functionality (and games!) to come.</p>
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
                < a href="https://react.dev/learn/tutorial-tic-tac-toe" target="_blank" rel="noopener noreferrer" >
                Here is the React tutorial's tic-tac-toe,
            </ a > { ' '}
        followed by where I ran with it.
      </p>
)
  },
{
    id: 3,
        thumbnailSrc: "projectthumbnails/housingprices.png",
            projectUrl: "https://github.com/wh33les/HousingPrices",
                title: "Housing prices",
                    date: "Jan 2025",
                        description: (
                            <p>
                            <a 
          href= "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques/overview"
    target = "_blank"
    rel = "noopener noreferrer"
        >
        Kaggle competition to predict housing prices given 79 features.
        </a>{' '}
        First submission ranked in the 82nd percentile out of over 28,000 submissions!
        </p>
    )
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
        Predictions made using{ ' '}
    <a 
          href="https://projects.fivethirtyeight.com/polls/data/president_polls.csv"
    target = "_blank"
    rel = "noopener noreferrer"
        >
        this polling data from 538
            </a>
            , along with 538's polling averages for swing states,{' '}
                < a
    href = "https://projects.fivethirtyeight.com/2024-election-forecast/"
    target = "_blank"
    rel = "noopener noreferrer"
        >
        found on this page
            </a>.
            </p>
    )
},
{
    id: 5,
        thumbnailSrc: "projectthumbnails/mediareliability.png",
            projectUrl: "https://public.tableau.com/app/profile/ashley.k.w.warren/viz/BiasvReliability/BiasvsReliability",
                title: "Media bias vs. reliability",
                    date: "Sep 2024",
                        description: (
                            <p>
                            Political bias(left / right) of around 800 news media sources against their reliability ratings,
                                according to Ad Fontes Media.The data was scraped using Python and plotted using Tableau.
    </p>
    )
},
{
    id: 6,
        thumbnailSrc: "projectthumbnails/polls.png",
            projectUrl: "https://public.tableau.com/app/profile/ashley.k.w.warren/viz/2024U_S_PresidentialElection_Pollingaveragesovertimeforthe2majorparties/Presentation",
                title: "2024 U.S. presidential election",
                    date: "Aug 2024",
                        description: (
                            <p>
                            Analyzed{ ' ' }
    <a 
          href="https://projects.fivethirtyeight.com/polls/data/president_polls.csv"
    target = "_blank"
    rel = "noopener noreferrer"
        >
        over 4,000 polls spanning three years of data from 538.
            </a>{' '}
        Daily rolling averages for Donald Trump, Kamala Harris, and Joe Biden, covering the period 
        from April 7, 2021, to August 11, 2024(periodic updates since then).Toggle between polling 
        data for likely voters, registered voters, and all voters.
      </p>
    )
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
        model to predict whether a bill will become law.Model outperforms the baseline accuracy 
        of 99.6 % (where the baseline predicts no bill will become law).
    </p>
    )
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
    )
},
{
    id: 9,
        thumbnailSrc: "projectthumbnails/538project.png",
            projectUrl: "http://wh33les.github.io/538Project/",
                title: "538 project",
                    date: "Mar 2023",
                        description: (
                            <p>
                            Python script to scrape metadata from 538. A key feature of this script is a custom
    function that renders JavaScript on each page to extract the number of comments from 
        the Facebook plugin.
      </p>
    )
},
{
    id: 10,
        thumbnailSrc: "projectthumbnails/vit.png",
            projectUrl: "https://www.youtube.com/watch?v=n2BLDSyJqew&list=PLVDqIaLqAssM8_EftT-1l4OGmtpLFjeur&ab_channel=AshleyK.Wheeler",
                title: "Virtual inspiring talk",
                    date: "Nov 2020",
                        description: (
                            <p>
                            YouTube playlist dedicated to promoting early career mathematicians.Presents a project 
        on matroid varieties I completed in the late 2010s, aimed at an undergrad audience.
      </p>
    )
}
];