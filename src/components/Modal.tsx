import { useState } from 'react';
import './Modal.css';

function Modal({ vagaId, onClose, onSalvar }) {
    const [placa, setPlaca] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (placa.trim()) {
            onSalvar(placa.toUpperCase());
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="title">
                <span>Cadastrar veículo na vaga {vagaId.spot_name}</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Digite a placa do veiculo:
                        <input
                            type="text"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            maxLength={7}
                            required
                        />
                    </label>
                    <div className="modal-botoes">
                        <button className="salvar" type="submit">Salvar</button>
                        <button className="cancelar" onClick={() => {
                            console.log("Cancelando...");
                            onClose();
                        }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
