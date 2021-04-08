import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import log from "loglevel";
import { fetchLeagueActivity, fetchLeagueStandings } from "../utils/fleaflicker";

import json_data from "../test/data/baseball/fetchLeagueStandings.json";

// grandaddy react function component for /baseball
function Baseball() {
  return (
    <div>
      <h1>Hardball Homies</h1>
      <LeagueStandings />
      <LeagueActivity />
    </div>
  );
}

function LeagueActivity() {
  // league activity react component
  const [activity, setActivity] = useState("");
  useEffect(() => {
    async function getLeagueActivity() {
      //  const league_activity = await fetchLeagueActivity({
      //    sport: "MLB",
      //    league_id: 24736,
      //  })
      //    .then((data) => {
      //      return JSON.stringify(data.json());
      //    })
      //    .catch((error) => {
      //      log.error(`Unable to fetch resource: ${error}`);
      //    });
      const league_activity = "foo";
      setActivity(league_activity);
    }
    getLeagueActivity();
  }, []);
  return (
    <div>
      <h2>Around the league...</h2>
      <div>{activity}</div>
    </div>
  );
}

function LeagueStandings() {
  // league standings react component
  const columns = useMemo(() => [
    {
      Header: "Place",
      accessor: "place",
    },
    {
      Header: "Team",
      accessor: "team",
    },
    {
      Header: "Record",
      accessor: "record",
    },
    {
      Header: "Streak",
      accessor: "streak",
    },
    {
      Header: "Waiver Position",
      accessor: "waiver",
    },
  ]);
  const data = useMemo(() =>
    json_data.divisions[0].teams.map((team, index) => {
      return {
        place: index,
        team: team.name,
        record: team.recordOverall.formatted,
        streak: team.streak.formatted,
        waiver: team.waiverPosition,
      };
    })
  );
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  // const [standings, setStandings] = useState([]);
  // useEffect(() => {
  //   async function getLeagueStandings() {
  //     // const league_standings = await fetchLeagueStandings({
  //     //   sport: "MLB",
  //     //   league_id: 24736,
  //     //   season: 2021,
  //     // })
  //     //   .then((response) => response.json())
  //     //   .then((data) => {
  //     //     let teams = data.divisions[0].teams[0].name;
  //     //     console.log(teams);
  //     //     return teams;
  //     //   })
  //     //   .catch((error) => {
  //     //     log.error(`Unable to fetch resource: ${error}`);
  //     //   });
  //     setStandings(league_standings.divisions[0].teams[0].name);
  //   }
  //   getLeagueStandings();
  // }, []);
  return (
    <div>
      <h2>Standings</h2>
      <div>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Baseball;
