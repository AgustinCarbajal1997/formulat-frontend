import React from "react";
import Loader from "../components/loader/Loader";
import useFetch from "../customHooks/useFetch";
import BASE_URL from "../utils/constants/base_url";

const Statitics = () => {
  const { data: driverStandings, loading } = useFetch(
    `${BASE_URL}/api/formula1/getF1DataApi/driverStandings`
  );
  const { data: constructorStandings } = useFetch(
    `${BASE_URL}/api/formula1/getF1DataApi/constructorStandings`
  );
  const { data: lastResults } = useFetch(
    `${BASE_URL}/api/formula1/getF1DataApi/lastResults`
  );

  return (
    <>
    
    <div className="statitics-page">
      {driverStandings?.data && (
        <div className="table-position">
          <h2>Mundial de pilotos</h2>
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Piloto</th>
                <th>Victorias</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {driverStandings.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
                (item, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: "center" }}>{item.position}</td>
                    <td>
                      {item.Driver.givenName} {item.Driver.familyName}
                    </td>
                    <td>{item.wins}</td>
                    <td>{item.points}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {lastResults?.data && (
        <div className="table-latest">
          <h2>
            Últimos resultados:{" "}
            {lastResults.data.MRData.RaceTable.Races[0].Circuit.circuitName}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Equipo</th>
                <th>Vueltas</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {lastResults.data.MRData.RaceTable.Races[0].Results.map(
                (item, idx) => (
                  <tr key={idx}>
                    <td>{item.position}</td>
                    <td>
                      {item.Driver.givenName} {item.Driver.familyName}
                    </td>
                    <td>{item.laps}</td>
                    <td>{item.points}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {constructorStandings?.data && (
        <div className="table-constructor">
          <h2>Mundial de Contructores</h2>
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Equipo</th>
                <th>Victorias</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {constructorStandings.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
                (item, idx) => (
                  <tr key={idx}>
                    <td>{item.position}</td>
                    <td>{item.Constructor.name}</td>
                    <td>{item.wins}</td>
                    <td>{item.points}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
    { loading && <Loader/> }
    </>
  );
};

export default Statitics;
