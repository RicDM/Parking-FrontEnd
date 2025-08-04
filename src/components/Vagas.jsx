import React, { useState } from 'react';
import './Vagas.css';
import Modal from './Modal';

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

  const tipoDaVaga = (vaga) => {
    if (prioridade && tiposVaga.prioridade.includes(vaga)) return 'prioridade';

    const prefixo = vaga[0];
    if (tiposVaga.carro.includes(prefixo)) return 'carro';
    if (tiposVaga.moto.includes(prefixo)) return 'moto';

    return 'carro';
  };

  const handleClick = (vaga) => {
    const tipo = tipoDaVaga(vaga);
    const isOcupada = vagasOcupadas.includes(vaga);
    const isIncompatível = prioridade
      ? !tiposVaga.prioridade.includes(vaga)
      : tipo !== veiculo;

    if (isOcupada || isIncompatível) return;

    setVagaSelecionada(vaga);
    setShowModal(true);
  };

  const handleSalvar = (placa) => {
    console.log(`Placa ${placa} registrada na vaga ${vagaSelecionada}`);
    setShowModal(false);
    setVagaSelecionada(null);
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
              const ocupada = vagasOcupadas.includes(vaga);
              const tipo = tipoDaVaga(vaga);
              const inativo = prioridade
                ? !tiposVaga.prioridade.includes(vaga)
                : tipo !== veiculo;

              return (
                <div
                  key={vaga}
                  className={`vaga 
                    ${ocupada ? 'ocupada' : ''} 
                    ${vagaSelecionada === vaga ? 'selecionada' : ''} 
                    ${inativo ? 'inativo' : ''}`}
                  onClick={() => handleClick(vaga)}
                >
                  {vaga}
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
