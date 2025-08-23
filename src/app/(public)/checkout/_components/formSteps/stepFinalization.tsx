import { ScrollArea } from "@/components/ui/scroll-area";
import { useCheckoutForm } from "../checkout-form";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "@/store/cart/cartSelectors";

export function StepFinalization({
  form,
}: {
  form: ReturnType<typeof useCheckoutForm>;
}) {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <div className="flex flex-col gap-4 max-h-[40vh]  overflow-y-auto">
      {/* Seção: Dados do Cliente */}
      <div className="p-4 border rounded-lg space-y-2">
        <h4 className="font-semibold text-lg">Dados do Cliente</h4>
        <p>
          <strong>Nome:</strong> {form.getValues("name")}
        </p>
        <p>
          <strong>Telefone:</strong> {form.getValues("phone")}
        </p>
        {form.getValues("email") && (
          <p>
            <strong>Email:</strong> {form.getValues("email")}
          </p>
        )}
      </div>

      {/* Seção: Endereço */}
      <div className="p-4 border rounded-lg space-y-2">
        <h4 className="font-semibold text-lg">Endereço</h4>
        <p>
          <strong>Endereço:</strong> {form.getValues("street")},{" "}
          {form.getValues("number")}
        </p>
        <p>
          <strong>Bairro:</strong> {form.getValues("neighborhood")}
        </p>
        {form.getValues("complement") && (
          <p>
            <strong>Complemento:</strong> {form.getValues("complement")}
          </p>
        )}
        <p>
          <strong>Referência:</strong> {form.getValues("referencePoint")}
        </p>
        <p>
          <strong>CEP:</strong> {form.getValues("cep")}
        </p>
      </div>

      {/* Seção: Pagamento */}
      <div className="p-4 border rounded-lg space-y-2">
        <h4 className="font-semibold text-lg">Pagamento</h4>
        <p>
          <strong>Forma de pagamento:</strong> {form.getValues("methodPayment")}
        </p>
        {form.getValues("methodPayment") === "Dinheiro" && (
          <p>
            <strong>Troco para:</strong> {form.getValues("changeFor")}
          </p>
        )}

        <p>
          <strong>Total:</strong>{" "}
          {totalPrice.toFixed(2).toString().replace(".", ",")}
        </p>
      </div>

      {/* Seção: Observações */}
      {form.getValues("notes") && (
        <div className="p-4 border rounded-lg space-y-2">
          <h4 className="font-semibold text-lg">Observações</h4>
          <p>{form.getValues("notes")}</p>
        </div>
      )}

      {/* Seção: Pizzas selecionadas */}
      {cartItems.length > 0 && (
        <div className="p-4 border rounded-lg space-y-2">
          <h4 className="font-semibold text-lg">Pizzas selecionadas</h4>
          <ScrollArea className="h-[100px]">
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 rounded hover:bg-gray-50"
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">
                    R$ {item.price.toFixed(2).toString().replace(".", ",")}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
