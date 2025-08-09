import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Vagas from './components/Vagas';
import ModalSaida from './components/ModalSaida';
import './App.css';
import './components/Sidebar.css'
import api from './utils/api';

export default function App() {
  const [mostrarSaida, setMostrarSaida] = useState(false);
  const [veiculo, setVeiculo] = useState('carro');
  const [andar, setAndar] = useState('Térreo A-B');
  const [placa, setPlaca] = useState('');
  const [vagaSelecionada, setVagaSelecionada] = useState();
  const [prioridade, setPrioridade] = useState(false);
  const [spot, setSpots] = useState({});
  const [carSpots, setCarSpot] = useState([]);
  const [motoSpots, setMotoSpot] = useState([]);
  const [occupiedSpots, setOccupiedSpots] = useState([]);

  useEffect(() => {
    api.get('/spots').then((res) => {
      const spotsA = res.data.filter((vaga) => vaga.floor === 'A');
      const spotsB = res.data.filter((vaga) => vaga.floor === 'B');
      const spotsC = res.data.filter((vaga) => vaga.floor === 'C');
      const spotsD = res.data.filter((vaga) => vaga.floor === 'D');
      const spotsE = res.data.filter((vaga) => vaga.floor === 'E');
      const spotsF = res.data.filter((vaga) => vaga.floor === 'F');
      setSpots({ A: spotsA, B: spotsB, C: spotsC, D: spotsD, E: spotsE, F: spotsF });

      const motos = res.data.filter((vaga) => vaga.vehicleType.vehicle === 'Moto');
      const carros = res.data.filter((vaga) => vaga.vehicleType.vehicle === 'Carro');
      const occuPiedSpots = res.data.filter((vaga) => vaga.occupied);

      const listMoto = []
      const listCarro = []
      const listOccupied = []

      motos.filter((m) => {
        if (m.vehicleType.vehicle === 'Moto') {
          listMoto.push(m.spot_name)
        }
      })

      carros.filter((c) => {
        if (c.vehicleType.vehicle === 'Carro') {
          listCarro.push(c.spot_name)
        }
      })

      occuPiedSpots.filter((o) => {
        if (o.occupied) {
          listOccupied.push(o.spot_name)
        }
      })

      setCarSpot(listCarro)
      setMotoSpot(listMoto)
      setOccupiedSpots(listOccupied)

      console.log("Carros",listCarro)
      console.log("Moto",listMoto)
      console.log(spot)
    })
  }, [vagaSelecionada])


  
  const estruturaVagas = {
    'Térreo A-B': {
      A: spot.A,
      B: spot.B,
    },
    '1º Andar C-D': {
      C: spot.C,
      D: spot.D,
    },
    '2º Andar E-F': {
      E: spot.E,
      F: spot.F,
    },
  };

  // console.log(estruturaVagas['Térreo A-B'])


  const vagasOcupadas = occupiedSpots;

  const tiposVaga = {
    carro: carSpots,
    moto: motoSpots,
    prioridade: ['B2', 'B2', 'B2'],
  };

  return (
    <div className="container">
      <Sidebar
        veiculo={veiculo}
        setVeiculo={setVeiculo}
        andar={andar}
        setAndar={setAndar}
        placa={placa}
        setPlaca={setPlaca}
        prioridade={prioridade}
        setPrioridade={setPrioridade}
        setMostrarSaida={setMostrarSaida}
      />
      {mostrarSaida && (
        <ModalSaida
          placa={placa}
          setVagaSelecionada={setVagaSelecionada}
          onClose={() => setMostrarSaida(false)}
        />
      )}

      {Object.keys(spot).length !== 0 && (
        <Vagas
          vagas={estruturaVagas[andar]}
          vagasOcupadas={vagasOcupadas}
          vagaSelecionada={vagaSelecionada}
          setVagaSelecionada={setVagaSelecionada}
          veiculo={veiculo}
          prioridade={prioridade}
          tiposVaga={tiposVaga}
        />
      )}
    </div>
  );
}
