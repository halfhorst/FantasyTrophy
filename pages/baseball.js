import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import log from "loglevel";
import { Navigation } from "../utils/navigation"
import { fetchLeagueStandings } from "../utils/fleaflicker";

// import json_standings from "../test/data/baseball/fetchLeagueStandings.json";
// import json_activity from "../test/data/baseball/fetchLeagueActivity.json";

// grandaddy react function component for /baseball
function Baseball() {
  return (
    <div>
      <title>Hardball Homies</title>
      <Navigation />
      <div className="bordered" id="league-standings-container">
        <h1>Hardball Homies</h1>
        <LeagueStandings />
      </div>
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
  const [standings, setStandings] = useState([]);
  useEffect(() => {
    async function getLeagueStandings() {
      const league_standings = await fetchLeagueStandings({
        sport: "MLB",
        league_id: 24736,
        season: 2021,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const league_standings = data.divisions[0].teams.map((team, index) => {
            return {
              place: index,
              team: team.name,
              record: team.recordOverall.formatted,
              streak: team.streak.formatted,
              waiver: team.waiverPosition,
            };
          });
          return league_standings;
        })
        .catch((error) => {
          log.error(`Unable to fetch resource: ${error}`);
        });
      setStandings(league_standings);
    }
    getLeagueStandings();
  }, []);
  return (
    <div>
      <h2>Standings</h2>
      <Table columns={columns} data={standings} />
    </div>
  );
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <table style={{ borderSpacing: "12px" }} {...getTableProps()}>
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
