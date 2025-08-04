export default function VagaButton({ vaga, ocupada, onClick }) {
  return (
    <button
      className={`vaga ${ocupada ? 'ocupada' : ''}`}
      onClick={() => onClick(vaga)}
    >
      {vaga}
    </button>
  );
}
