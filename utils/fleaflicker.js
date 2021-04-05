// some functions to interact with the fleaflicker fantasy API
// https://www.fleaflicker.com/api-docs/index.html

import fetch from "node-fetch";

const cors_proxy = "https://cors.rhroberts.dev";
const api_url = "https://fleaflicker.com/api";

export async function fetchLeagueActivity({ sport = "MLB", league_id = "24736" }) {
  const query_string = `?sport=${sport}&league_id=${league_id}`;
  const response = await fetch(
    `${cors_proxy}/${api_url}/FetchLeagueActivity${query_string}`,
    {
      method: "GET",
      headers: {
        "Content-type": "text/plain; charset=UTF-8",
      },
    }
  );
  return response;
}

export async function fetchLeagueStandings({
  sport = "MLB",
  league_id = "24736",
  season = 2021,
}) {
  const query_string = `?sport=${sport}&league_id=${league_id}&season=${season}`;
  const response = await fetch(
    `${cors_proxy}/${api_url}/FetchLeagueStandings${query_string}`,
    {
      method: "GET",
      headers: { "Content-type": "text/plain; charset=UTF-8" },
    }
  );
  return response;
}
