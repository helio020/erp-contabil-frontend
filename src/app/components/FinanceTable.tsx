interface Transaction {
  id: string;
  attributes: {
    title: string;
    amount: number;
    type: string;
    status: string;
  };
}

interface FinanceTableProps {
  transactions: Transaction[];
}

export default function FinanceTable({ transactions }: FinanceTableProps) {
  return (
    <div className="border rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Lista de Transações</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Título</th>
            <th className="border p-2">Valor</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t">
              <td className="p-2">{tx.attributes.title}</td>
              <td className="p-2">R$ {tx.attributes.amount.toFixed(2)}</td>
              <td
                className={`p-2 ${
                  tx.attributes.type === "receita"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {tx.attributes.type}
              </td>
              <td className="p-2">{tx.attributes.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
