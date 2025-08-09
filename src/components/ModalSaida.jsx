import { useState, useEffect } from 'react';
import api from '../utils/api';
import './ModalSaida.css';

export default function ModalSaida({ placa, onClose, setvagaSelecionada }) {


  const [ticket, setTicket] = useState();

  useEffect(() => {
    api.get(`tickets/${placa}`).then((res) => {
      console.log(`Ticket for placa ${placa} fetched successfully.`);
      res.data.new_entrance_time = new Date(res.data.entrance_time).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      res.data.new_exit_time = new Date(res.data.exit_time).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      setTicket(res.data);
      setvagaSelecionada(null);
    })

  }, [])

  function onConfirmar(ticket) {
    api.put(`tickets/${ticket.id}`, {
      exit_time: ticket.exit_time,
      amount: ticket.amount,
      spot_id: ticket.spot.id,
    }).then((res) => {
      console.log(res)
      onClose();
    })
  }

  return ticket && (
    <div className="modal-overlay-saida">
      <div className="modal-saida">
        <div className="modal-header-saida">
          <span className="saida-label">Saída</span>
          <span className="vaga-id">{ticket.spot.spot_name}</span>
        </div>
        <div className='title-placa'>
          <span>Placa do veiculo:</span>
        </div>
        <div className="placa">{placa}</div>

        <div className="horarios">
          <div className="horario">
            <span className="label">entrada</span>
            <span className="valor">{ticket.new_entrance_time}</span>
          </div>
          <div className="horario">
            <span className="label">saída</span>
            <span className="valor">{ticket.new_exit_time}</span>
          </div>
        </div>

        <div className="valor-total">{ticket.amount}</div>

        <div className="modal-botoes-saida">
          <button className="confirmar" onClick={() => onConfirmar(ticket)}>
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
