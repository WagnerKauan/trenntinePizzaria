"use client";

import Image from "next/image";

export function Steps() {
  const steps = [
    {
      id: 1,
      title: "Escolha suas pizzas",
      description:
        "Monte seu pedido como quiser! Selecione os sabores, tamanhos e adicione extras se desejar.",
    },
    {
      id: 2,
      title: "Preencha seus dados",
      description:
        "Informe nome, telefone, endereço e escolha a forma de pagamento. Tudo rapidinho!",
    },
    {
      id: 3,
      title: "Envie pelo WhatsApp",
      description:
        "Revise o pedido e clique no botão! Você será redirecionado pro WhatsApp com tudo prontinho pra enviar.",
    },
  ];

  return (
    <section className="py-24">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-center 
    shadow-lg bg-light-normal rounded-[50px] p-6 md:p-24 gap-12">
    
    {/* Texto */}
    <article className="flex-1">
      <h3 className="font-bold text-dark-normal text-2xl md:text-3xl text-center md:text-left">
        Peça sua pizza em 3 passos
      </h3>

      {steps.map((step) => (
        <div 
          key={step.id} 
          className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-12"
        >
          {/* Bolinha com número */}
          <div
            className="bg-primary-normal w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full
            flex items-center justify-center text-white text-xl md:text-2xl shrink-0"
          >
            {step.id}
          </div>

          {/* Texto */}
          <div className="max-w-lg space-y-2">
            <h5 className="font-semibold text-base sm:text-lg md:text-2xl text-center sm:text-left">
              {step.title}
            </h5>
            <p className="text-[13px] sm:text-sm md:text-base text-center sm:text-left">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </article>

    {/* Imagem */}
    <div className="hidden md:block md:relative w-full max-w-[588px] h-[588px] rounded-[50px] border-2 overflow-hidden flex-1">
      <Image
        src={"/image/bg_steps.png"}
        alt="Pizza"
        fill  
        className="w-full object-cover"
      />
    </div>
  </div>
</section>

  );
}
