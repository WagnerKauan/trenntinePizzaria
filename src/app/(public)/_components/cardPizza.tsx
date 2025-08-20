import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CardPizzaProps {
  name: string;
  price: string;
  description: string;
  image: string;
}

export function CardPizza({ name, price, description, image }: CardPizzaProps) {
  return (
    <div className="shadow-lg max-w-[284px] xl:max-w-[350px] w-full rounded-[10px] flex flex-col">
      <div className="relative w-[284px] h-[200px] xl:w-[350px] xl:h-[200px] rounded-t-[10px] overflow-hidden">
        <Image
          src={image}
          alt="Pizza"
          fill
          className="w-full object-cover hover:scale-110 duration-300"
          quality={100}
        />
      </div>

      <div className="w-full flex-1 flex flex-col justify-between p-4 gap-7">
        <div className="flex items-center justify-between">
          <h5 className=" text-base xl:text-lg font-bold text-dark-normal ">{name}</h5>
          <span className="text-secondary-normal font-bold text-base xl:text-lg">
            R$ {price}
          </span>
        </div>

        <p className="text-base text-dark-normal line-clamp-3">{description}</p>

        <Button className="w-full cursor-pointer bg-secondary-normal hover:bg-secondary-dark duration-300 px-14 text-[18px] py-6">
          + Carrinho
        </Button>
      </div>
    </div>
  );
}
