import './ModalSaida.css';

export default function ModalSaida({ vagaId, placa, entrada, saida, valor, onConfirmar, onClose }) {
  return (
    <div className="modal-overlay-saida">
      <div className="modal-saida">
        <div className="modal-header-saida">
          <span className="saida-label">Saída</span>
          <span className="vaga-id">{vagaId}</span>
        </div>
        <div className='title-placa'>
        <span>Placa do veiculo:</span>
        </div>
        <div className="placa">{placa}</div>

        <div className="horarios">
          <div className="horario">
            <span className="label">entrada</span>
            <span className="valor">{entrada}</span>
          </div>
          <div className="horario">
            <span className="label">saída</span>
            <span className="valor">{saida}</span>
          </div>
        </div>

        <div className="valor-total">{valor}</div>

        <div className="modal-botoes-saida">
          <button className="confirmar" onClick={onConfirmar}>
            Confirmar Pagamento
          </button>
          <button className="cancelar-saida" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
