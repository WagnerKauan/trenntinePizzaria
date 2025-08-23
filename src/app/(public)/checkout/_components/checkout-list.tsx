"use client";

import { CheckoutFormData, useCheckoutForm } from "./checkout-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check } from "lucide-react";
import { StepDadosPessoais } from "./formSteps/stepDadosPessoais";
import { StepEndereço } from "./formSteps/stepEndereço";
import { StepMethodPayment } from "./formSteps/stepMethodPayment";
import { StepObservations } from "./formSteps/stepObservations";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "@/store/cart/cartSelectors";

import { StepFinalization } from "./formSteps/stepFinalization";
import { formatWhatsappMessage } from "@/utils/formatWhatsappMessage";
import { selectCheckoutData } from "@/store/checkout/checkoutSelectors";
import { setData } from "@/store/checkout/checkoutSlice";
import { clearCart } from "@/store/cart/cartSlice";

const steps = [
  "Dados pessoais",
  "Endereço",
  "Pagamento",
  "Observações",
  "Finalizar",
];

export function CheckoutList() {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const checkoutData = useSelector(selectCheckoutData);
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();

  const form = useCheckoutForm(checkoutData!);

  const stepFields: Record<string, (keyof CheckoutFormData)[]> = {
    "Dados pessoais": ["name", "phone", "email"],
    Endereço: ["cep", "street", "number", "neighborhood", "referencePoint"],
    Pagamento: ["methodPayment", "changeFor"],
    Observações: ["notes"],
  };

  async function nextStep() {
    const fieldsToValidate = stepFields[steps[currentStep]];
    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    setCurrentStep(currentStep + 1);
  }

  function SendOrderWhatsapp(data: CheckoutFormData) {
    dispatch(setData(data));
    const message = formatWhatsappMessage(data, cartItems, totalPrice);
    const phone = "5511981052276";
    const url = `https://wa.me/${phone}?text=${message}`;
    dispatch(clearCart())
    window.open(url, "_blank");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(SendOrderWhatsapp)}>
          <div className="flex items-center justify-center w-full">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex items-center w-full ">
                {/* Bolinha */}
                <div
                  className={`relative flex items-center justify-center h-10 w-10 rounded-full border-2 transition-all duration-300
                  ${
                    index < currentStep
                      ? "border-primary bg-primary text-white"
                      : index === currentStep
                      ? "border-primary bg-white text-primary font-bold"
                      : "border-gray-300 bg-white text-gray-400"
                  }
                `}
                >
                  {index < currentStep ? <Check size={18} /> : index + 1}
                </div>

                {/* Linha de conexão */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 transition-all w-full duration-300 ${
                      index < currentStep ? "bg-primary" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">{steps[currentStep]}</h2>
            <span className="text-sm text-gray-500">
              {steps[currentStep] === "Finalizar" &&
                "Confirme todos os dados abaixo"}
            </span>
          </div>

          <div className="mt-6">
            {currentStep === 0 && <StepDadosPessoais form={form} />}
            {currentStep === 1 && <StepEndereço form={form} />}
            {currentStep === 2 && <StepMethodPayment form={form} />}
            {currentStep === 3 && <StepObservations form={form} />}
            {currentStep === 4 && <StepFinalization form={form} />}
          </div>

          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentStep(currentStep - 1);
                }}
              >
                Voltar
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
                className="cursor-pointer"
              >
                Proximo
              </Button>
            ) : (
              <Button type="submit" className="cursor-pointer">
                Finalizar
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
