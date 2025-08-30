


export function convertReal(amount: string): number {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));
  return numericPrice;
}



