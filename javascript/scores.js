fetch(
    "https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData"
)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        renderScoreTable(data);
    });

const scoresContainer = document.getElementById("scores-container");

// Functions
const generateRandomTime = () => {
    const minute = Math.floor(Math.random() * 11) + 1;
    const tensSecond = Math.floor(Math.random() * 6);
    const onesSecond = Math.floor(Math.random() * 10);
    return minute + ":" + tensSecond + onesSecond;
}

const selectTeam = (data) => {
    const teamsArr = Object.keys(data);
    const randomNumber = Math.floor(Math.random() * 30);
    return teamsArr[randomNumber];
}

const selectGame = () => {
    return Math.floor(Math.random() * 4);
}

const generateQuarterScores = (total) => {
    const rough = Math.floor(total / 4);
    const quarterOne = rough - 2;
    const quarterTwo = rough + 3;
    const quarterThree = rough - 6;
    const quarterFour = total - quarterOne - quarterTwo - quarterThree;
    return [quarterOne, quarterTwo, quarterThree, quarterFour];
}

const renderScoreTable = (data) => { 
    const actions = [
        "stole the ball",
        "got a rebound",
        "made a 3-pointer",
        "made a free-throw",
        "lost the ball out of bounds"
    ]

    for (let i = 0; i < 10; i++) {
        const team = selectTeam(data);

        //Select Game
        const gameList = Object.keys(data[team]["last_five_games"]);
        const gameSelected = gameList[selectGame()];
        const game = data[team]["last_five_games"][gameSelected];

        // Scores Box
        const awayTeam = game["away_team"]["team_name"];
        const awayTeamAbbrev = game["away_team"]["team_name_abbreviation"];
        const homeTeam = game["home_team"]["team_name"];
        const homeTeamAbbrev = game["home_team"]["team_name_abbreviation"];
        const homeTeamLogo = data[homeTeam]["logo_light"];
        const awayTeamLogo = data[awayTeam]["logo_light"];
        const awayTeamScore = game["away_team"]["score"];
        const homeTeamScore = game["home_team"]["score"];
        const awayTeamQuarterScores = generateQuarterScores(awayTeamScore);
        const homeTeamQuarterScores = generateQuarterScores(homeTeamScore);

        // Most Recent Play
        const actionNumber = Math.floor(Math.random() * (actions.length - 1));
        const timeStamp = generateRandomTime();
        const playerListArr = Object.keys(data[homeTeam]["roster"]);
        const player = playerListArr[Math.floor(Math.random()) * playerListArr.length];

        // Generate HTML
        scoresContainer.innerHTML += `
        <table class="game">
            <tr>
                <th></th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>T</th>
            </tr>
            <tr>
                <td class="team-name"><img src="${awayTeamLogo}" width="20" height="20"> <span class="abbrev">${awayTeamAbbrev}</span><span class="non-abbrev">${awayTeam}</span></td>
                <td class="quarter">${awayTeamQuarterScores[0]}</td>
                <td class="quarter">${awayTeamQuarterScores[1]}</td>
                <td class="quarter">${awayTeamQuarterScores[2]}</td>
                <td class="quarter">${awayTeamQuarterScores[3]}</td>
                <td class="total">${awayTeamScore}</td>
            </tr>
            <tr>
                <td class="team-name"><img src="${homeTeamLogo}" width="20" height="20"> <span class="abbrev">${homeTeamAbbrev}</span><span class="non-abbrev">${homeTeam}</span></td>
                <td class="quarter">${homeTeamQuarterScores[0]}</td>
                <td class="quarter">${homeTeamQuarterScores[1]}</td>
                <td class="quarter">${homeTeamQuarterScores[2]}</td>
                <td class="quarter">${homeTeamQuarterScores[3]}</td>
                <td class="total">${homeTeamScore}</td>
            </tr>
        </table>
        <div class="game most-recent-play">
            <h3>Most Recent Play</h3>
            <div class="play-description">
                <div class="time">${timeStamp}</div>
                <div>${player} ${actions[actionNumber]}</div>
                <i id="basketball" class="fa-solid fa-basketball" style="color: #ae4b0a;"></i>
            </div>
        </div>
    `
    }
}


// <table class="game">
//     <tr>
//         <th></th>
//         <th>1</th>
//         <th>2</th>
//         <th>3</th>
//         <th>4</th>
//         <th>T</th>
//     </tr>
//     <tr>
//         <td class="team-name">Team 1</td>
//         <td>27</td>
//         <td>32</td>
//         <td>0</td>
//         <td>0</td>
//         <td>59</td>
//     </tr>
//     <tr>
//         <td class="team-name">Team 2</td>
//         <td>27</td>
//         <td>32</td>
//         <td>0</td>
//         <td>0</td>
//         <td>59</td>
//     </tr>
// </table>
// <div class="game">
//     <h3>Most Recent Play</h3>
//     <div class="play-description">
//         <span class="time">7:32</span>
//         <span>Here is some text describing the play</span>
//     </div>
// </div>