import React, { useState } from 'react';
import './Vagas.css';
import Modal from './Modal';
import api from '../utils/api';

export default function Vagas({
  vagas,
  vagasOcupadas,
  vagaSelecionada,
  setVagaSelecionada,
  veiculo,
  prioridade,
  tiposVaga
}) {
  const [showModal, setShowModal] = useState(false);
  console.log(vagas)

  const tipoDaVaga = (vaga) => {
    if (prioridade && tiposVaga.prioridade.includes(vaga.spot_name)) return 'prioridade';

    const prefixo = vaga.spot_name;

    console.log('Prefixo da vaga:', prefixo);
    console.log('Tipos de vaga:', tiposVaga);

    if (tiposVaga.carro.includes(prefixo)) {
      console.log(`a vaga ${vaga.spot_name} é de carro`);
      return 'carro';
    }
    if (tiposVaga.moto.includes(prefixo)) {
      console.log(`a vaga ${vaga.spot_name} é de moto`);
      return 'moto';
    };

    return 'carro';
  };

  const handleClick = (vaga) => {
    const tipo = tipoDaVaga(vaga);
    const isOcupada = vagasOcupadas.includes(vaga.spot_name);
    const isIncompatível = prioridade
      ? !tiposVaga.prioridade.includes(vaga.spot_name)
      : tipo !== veiculo;

    if (isOcupada || isIncompatível) return;

    setVagaSelecionada(vaga);
    setShowModal(true);
  };

  const handleSalvar = (placa) => { 
    console.log(`Placa ${placa} registrada na vaga ${vagaSelecionada}`);
    setShowModal(false);
    setVagaSelecionada(null);

    api.post('/tickets', {
      palate: placa,
      vehicle_type_id: vagaSelecionada.vehicleType.id,
      spot_id: vagaSelecionada.id
    }).then((res) => {
      console.log('Vaga registrada com sucesso:', res.data);
    })



  };

  const handleFecharModal = () => {
    setShowModal(false);
    setVagaSelecionada(null);
  };

  const getGridClass = (setor) => {
    switch (setor) {
      case 'A': return 'grade-A';
      case 'B': return 'grade-B';
      case 'C': return 'grade-C';
      case 'D': return 'grade-D';
      case 'E': return 'grade-E';
      case 'F': return 'grade-F';
      default: return 'grade-A';
    }
  };

  return (
    <div className="vagas-container">
      {Object.entries(vagas).map(([setor, lista]) => (
        <div key={setor} className="setor">
          <div className={getGridClass(setor)}>
            {lista.map((vaga) => {
              const ocupada = vagasOcupadas.includes(vaga.spot_name);
              const tipo = tipoDaVaga(vaga);
              const inativo = prioridade
                ? !tiposVaga.prioridade.includes(vaga.spot_name)
                : tipo !== veiculo;

              return (
                <div
                  key={vaga.id}
                  className={`vaga 
                    ${ocupada ? 'ocupada' : ''} 
                    ${vagaSelecionada === vaga.spot_name ? 'selecionada' : ''} 
                    ${inativo ? 'inativo' : ''}`}
                  onClick={() => handleClick(vaga)}
                >
                  {vaga.spot_name}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {showModal && (
        <Modal
          vagaId={vagaSelecionada}
          onClose={handleFecharModal}
          onSalvar={handleSalvar}
        />
      )}
    </div>
  );
}
