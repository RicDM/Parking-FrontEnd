import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Vagas from './components/Vagas';
import ModalSaida from './components/ModalSaida';
import './App.css';
import './components/Sidebar.css'

export default function App() {
  const [mostrarSaida, setMostrarSaida] = useState(false);
  const [veiculo, setVeiculo] = useState('carro');
  const [andar, setAndar] = useState('Térreo A-B');
  const [placa, setPlaca] = useState('');
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [prioridade, setPrioridade] = useState(false);

  const estruturaVagas = {
    'Térreo A-B': {
      A: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'],
      B: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
    },
    '1º Andar C-D': {
      C: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
      D: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
    },
    '2º Andar E-F': {
      E: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
      F: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7'],
    },
  };

  const vagasOcupadas = ['A4', 'A6', 'A7', 'C2', 'F3', 'E1']; 

  const tiposVaga = {
    carro: ['A', 'C', 'E'],
    moto: ['B', 'D', 'F'],
    prioridade: ['A1', 'C1', 'E1'],
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
          entrada={'14:20'}
          saida={'15:00'}
          valor={'15,00'}
          onClose={() => setMostrarSaida(false)}
        />
      )}
      <Vagas
        vagas={estruturaVagas[andar]}
        vagasOcupadas={vagasOcupadas}
        vagaSelecionada={vagaSelecionada}
        setVagaSelecionada={setVagaSelecionada}
        veiculo={veiculo}
        prioridade={prioridade}
        tiposVaga={tiposVaga}
      />
    </div>
  );
}
