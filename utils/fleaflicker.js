// some functions to interact with the fleaflicker fantasy API
// https://www.fleaflicker.com/api-docs/index.html

import fetch from "node-fetch";

const base_url = "https://www.fleaflicker.com/api";

export async function fetchLeagueActivity({ sport = "MLB", league_id = "24736" }) {
  const post_data = { sport: sport, league_id: league_id };
  const response = await fetch(`${base_url}/FetchLeagueActivity`, {
    method: "POST",
    body: JSON.stringify(post_data),
    headers: { "Content-type": "text/plain; charset=UTF-8" },
  });
  return response;
}

export async function fetchLeagueStandings({
  sport = "MLB",
  league_id = "24736",
  season = 2021,
}) {
  const post_data = { sport: sport, league_id: league_id, season: season };
  const response = await fetch(`${base_url}/FetchLeagueStandings`, {
    method: "POST",
    body: JSON.stringify(post_data),
    headers: { "Content-type": "text/plain; charset=UTF-8" },
  });
  return response;
}
