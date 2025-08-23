import { CheckoutFormData } from "@/app/(public)/checkout/_components/checkout-form";
import { CartItem } from "@/store/cart/cartSlice";

function formatCustomer(data: CheckoutFormData) {
  let text = ` Cliente:\n`;
  text += ` Nome: ${data.name}\n`;
  text += ` Telefone: ${data.phone}\n`;
  if (data.email) text += `Email: ${data.email}\n`;

  return text + "\n";
}

function formatAddress(data: CheckoutFormData) {
  let text = ` Endereço:\n`;
  text += `${data.street}, ${data.number}`;
  text += `Bairro: ${data.neighborhood}\n`;
  if (data.complement) text += `Complemento: ${data.complement}\n`;
  text += `Ponto de referência: ${data.referencePoint}\n`;
  text += `CEP: ${data.cep}\n`;
  return text + "\n";
}

function formatPayment(data: CheckoutFormData) {
  let text = ` Forma de pagamento:\n`;
  text += `Metodo de pagamento: ${data.methodPayment}\n`;
  if (data.methodPayment === "Dinheiro")
    text += `Troco para: R$ ${data.changeFor}\n`;
  return text + "\n";
}

function formatNotes(data: CheckoutFormData) {
  let text = ` Observações:\n`;
  if (data.notes) text += `${data.notes}\n`;
  return text + "\n";
}

function formatCart(cartItems: CartItem[], totalPrice: number) {
  let text = ` Carrinho:\n`;
  cartItems.forEach((item) => {
    text += `- ${item.name}: R$ ${item.price.toFixed(2).replace(".", ",")}\n`;
  });

  text += `\n Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
  return text;
}

export function formatWhatsappMessage(
  data: CheckoutFormData,
  cartItems: CartItem[],
  totalPrice: number
) {
  const sections = [
    formatCustomer(data),
    formatAddress(data),
    formatPayment(data),
    formatNotes(data),
    formatCart(cartItems, totalPrice),
  ];

  return encodeURIComponent(sections.join("\n"));
}
