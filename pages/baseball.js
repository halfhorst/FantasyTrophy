import { useState, useEffect } from "react";
import log from "loglevel";
import { fetchLeagueActivity, fetchLeagueStandings } from "../utils/fleaflicker";

// grandaddy react function component for /baseball
function Baseball() {
  // fetch league activity
  const [activity, setActivity] = useState("");
  useEffect(() => {
    async function leagueActivity() {
      const league_activity = await fetchLeagueActivity({
        sport: "MLB",
        league_id: 24736,
      })
        .then((data) => {
          return JSON.stringify(data.json());
        })
        .catch((error) => {
          log.error(`Unable to fetch resource: ${error}`);
        });
      setActivity(league_activity);
    }
    leagueActivity();
  }, []);

  // fetch league standings
  const [standings, setStandings] = useState([]);
  useEffect(() => {
    async function leagueStandings() {
      const league_standings = await fetchLeagueStandings({
        sport: "MLB",
        league_id: 24736,
        season: 2021,
      })
        .then((response) => response.json())
        .then((data) => {
          let teams = data.divisions[0].teams[0].name;
          console.log(teams);
          return teams;
        })
        .catch((error) => {
          log.error(`Unable to fetch resource: ${error}`);
        });
      setStandings(league_standings);
    }
    leagueStandings();
  }, []);

  return (
    <div>
      <h1>Hardball Homies</h1>
      <h2>Standings</h2>
      <div>{standings}</div>
      <h2>Around the League...</h2>
      <div>{activity}</div>
    </div>
  );
}

export default Baseball;
