

export interface Pizza {
  id: number;
  name: string;
  price: number;
  description: string;
  ingredients: string;
  image: string;
  isFeatured: boolean;
}

export interface CheckoutData {
  // Step 1 - Dados pessoais
  name: string;
  phone: string;
  email?: string;

  // Step 2 - Endereço
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  referencePoint: string;

  // Step 3 - Pagamento
  methodPayment: MethodPayment;
  changeFor?: string;

  // Step 4 - Observações
  notes?: string;
}

export type MethodPayment = "Pix" | "Cartão" | "Dinheiro";


interface PromotionRule {
  category?: string;
  tag?: string;
  minQuantity?: number;
  discount?: number;
  bonusProduct?: string;
}