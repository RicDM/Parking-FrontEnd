export default function Sidebar({ veiculo, setVeiculo, andar, setAndar, placa, setPlaca, prioridade, setPrioridade, setMostrarSaida }) {
  return (
    <aside className="sidebar">
      <div className="card">
        <div className="conteinerUsuario">
          <div/>
          <img className="foto" src="./src/assets/usuario.png"></img>
          <p><strong>Usuário: Francisco</strong><br />Cargo: Estacionamento</p>
        </div>
        <div className="dataHora">
          <span>Segunda-feira<br />15:00</span>
        </div>
      </div>

      <div className="secao">
        <span>Escolha um veículo</span>
        <div className="veiculos">
          <button className={veiculo === 'carro' ? 'ativo' : ''} onClick={() => setVeiculo('carro')}>
            <img className="imagemCarro" src="./src/assets/carro.png"></img> 
            Carro</button>
          <button className={veiculo === 'moto' ? 'ativo' : ''} onClick={() => setVeiculo('moto')}>
            <img className="imagemMoto" src="./src/assets/moto.png"></img> 
            Moto</button>
        </div>
      </div>

      <div className="secao">
        <button className={prioridade ? 'ativo' : ''} onClick={() => setPrioridade(!prioridade)}>Prioridade</button>
      </div>

      <div className="secao">
        <span>Escolha um andar</span>
        <button className={andar === 'Térreo A-B' ? 'ativo' : ''} onClick={() => setAndar('Térreo A-B')}>Térreo A-B</button>
        <button className={andar === '1º Andar C-D' ? 'ativo' : ''} onClick={() => setAndar('1º Andar C-D')}>1º Andar C-D</button>
        <button className={andar === '2º Andar E-F' ? 'ativo' : ''} onClick={() => setAndar('2º Andar E-F')}>2º Andar E-F</button>
      </div>

      <div className="secao placa">
        <div className="card">
          <span>Informe a placa</span>
          <input value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="Ex: AAAAAAA" />
          <button className="buscar" onClick={() => setMostrarSaida(true)}>Buscar</button>
        </div>
      </div>
    </aside>
  );
}
