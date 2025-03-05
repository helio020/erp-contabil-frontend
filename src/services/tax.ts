import api from "./api";

interface TaxReport {
  totalReceitas: number;
  totalImpostos: number;
}

export async function fetchTaxReport(): Promise<TaxReport> {
  try {
    const response = await api.get("/tax-report/calculate");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar relatório fiscal:", error);
    return { totalReceitas: 0, totalImpostos: 0 };
  }
}
