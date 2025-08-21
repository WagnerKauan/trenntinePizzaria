import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="localizacao" className="py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row container mx-auto lg:px-3.5">
        <article className="flex flex-col space-y-3 w-full items-center lg:items-start justify-center">
          <h3 className="font-bold text-2xl text-dark-normal lg:text-3xl xl:text-4xl uppercase">contato</h3>
          <div className="flex items-center gap-2">
            <MapPin size={17} />
            <span className="text-sm sm:text-base lg:text-lg">
              Rua Alabasta, 167 - Carapicuíba, São Paulo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={17} />
            <span className="text-sm sm:text-base lg:text-xl">trentinnePizzaria@info.com</span>
          </div>
          <div className="flex items-center gap-2">
              <Phone size={17} />
              <span className="text-sm sm:text-base lg:text-xl">(11) 98765-4352</span>
          </div>
          <div className="text-dark-normal lg:text-xl">
            <span className="font-bold">14:00 </span>
            às
            <span className="font-bold"> 23:00</span>
          </div>
        </article>
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg mt-10 lg:mt-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.428230239485!2d-46.83999112376019!3d-23.553058761288987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf01c412d6a6d1%3A0x103c484cdf06dae6!2sPlaza%20Shopping%20Carapicu%C3%ADba!5e0!3m2!1spt-BR!2sbr!4v1755734617962!5m2!1spt-BR!2sbr"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
