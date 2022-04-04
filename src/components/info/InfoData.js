import React from 'react'

const InfoData = ({ type, data }) => {
  return (
    <div className='informationData-header-container'>
        <div className='information-data-container-image'>
            <img src={data.image} alt={data.name}/>
        </div>
        {
            type==="pilotos" && (
                <div className='information-data-container-table'>
                    <div><h3>Piloto</h3><h3>{data.name}</h3></div>
                    <div><h3>Equipo</h3><h3>{data.team}</h3></div>
                    <div><h3>N° de auto</h3><h3>{data.carNumber}</h3></div>
                    <div><h3>País</h3><h3>{data.country}</h3></div>
                    {/* <div><h3>Nacionalidad</h3><h3>{data.nationality}</h3></div> */}
                    <div><h3>Podios</h3><h3>{data.podiums}</h3></div>
                    <div><h3>Victorias</h3><h3>{data.wins}</h3></div>
                    <div><h3>Campeonatos</h3><h3>{data.championships}</h3></div>
                </div>
            )
        }
        {
            type==="equipos" && (
                <div className='information-data-container-table'>
                    <div><h3>Equipo</h3><h3>{data.name}</h3></div>
                    <div><h3>Primer piloto</h3><h3>{data.firstDriver}</h3></div>
                    <div><h3>Segundo piloto</h3><h3>{data.secondDriver}</h3></div>
                    <div><h3>País</h3><h3>{data.country}</h3></div>
                    {/* <div><h3>Nacionalidad</h3><h3>{data.nationality}</h3></div> */}
                    <div><h3>Victorias</h3><h3>{data.wins}</h3></div>
                    <div><h3>Campeonatos de equipo</h3><h3>{data.championships}</h3></div>
                    <div><h3>Campeonatos de pilotos</h3><h3>{data.driverChampionships}</h3></div>
                    <div><h3>Director principal</h3><h3>{data.teamPrincipal}</h3></div>
                </div>
            )
        }
        
    </div>
  )
}

export default InfoData