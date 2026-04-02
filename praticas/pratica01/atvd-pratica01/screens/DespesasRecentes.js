import DespesaSaida from '../components/despesa/DespesaSaida';

function DespesasRecentes() {
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter(
      (despesa) => despesa.data >= seteDiasAtras && despesa.data <= hoje
    );
  }

  const DUMMY_DESPESAS = [
    {
      id: '1',
      descricao: 'Conta de Luz',
      valor: 100.99,
      data: new Date(),
    },
    {
      id: '2',
      descricao: 'Conta de Agua',
      valor: 40.99,
      data: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      id: '3',
      descricao: 'Conta de Internet',
      valor: 120.5,
      data: new Date(new Date().setDate(new Date().getDate() - 15)),
    },
    {
      id: '4',
      descricao: 'Compra Futura',
      valor: 80.0,
      data: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
  ];

  return (
    <DespesaSaida
      despesas={filtrarUltimos7Dias(DUMMY_DESPESAS)}
      periodo="Ultimos 7 dias"
    />
  );
}

export default DespesasRecentes;
