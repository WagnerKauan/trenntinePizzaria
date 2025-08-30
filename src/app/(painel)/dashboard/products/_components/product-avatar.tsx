"use client";

import { Product } from "@/generated/prisma";
import { Loader, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { uploadProductImage } from "../_actions/upload-product-image";

export function ProductAvatar({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
    if(event.target.files && event.target.files[0]) {
      setLoading(true);

      const image = event.target.files[0];

      if(image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.error("Formato inválido!");
        setLoading(false);
        return;
      }

      const newFileName = `${product.id}`
      const newFile = new File([image], newFileName, {  type: image.type });
      const urlImage = await uploadImage(newFile);

      if(!urlImage || urlImage === "") {
        toast.error("Erro ao enviar imagem!");
        setLoading(false);
        return;
      }

      const response = await uploadProductImage({productImageUrl: urlImage, productId: product.id});

      if(response.error) {
        toast.error(response.error);
        setLoading(false);
        return;
      }

      toast.success(response.message);
      setLoading(false);
    }
  }

  async function uploadImage(image: File) {
    try {

      toast("Enviando imagem, aguarde...");

      const formData = new FormData();

      formData.append("file", image);
      formData.append("id", product.id);

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/image/upload`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json();
      
      if(!response.ok) {
        return null;
      }

      toast.success("Imagem atualizada com sucesso!");
      return data.secure_url as string;

    }catch(err) {
      return null
    }
  }

  
  return (
      <div className="relative h-[50px] w-[50px] rounded-full overflow-hidden">
        <div className="relative flex items-center justify-center w-full h-full">
        <span className="absolute cursor-pointer z-[2] bg-slate-50/60 p-2 rounded-full shadow-xl">
          {loading ? (
            <Loader size={16} color="#131313" className="animate-spin" />
          ) : (
            <Upload size={16} color="#131313" />
          )}
        </span>

        <input
          type="file"
          className="opacity-0 cursor-pointer relative z-50 w-48 h-48"
          onChange={handleChange}
        />
      </div>
        <Image
          src={
            product.category === "pizza"
              ? product.imageUrl || "/image/pizzas/quatroQueijos.png"
              : product.imageUrl || "/image/defaultDrink.jpg"
          }
          alt={product.name}
          fill
          quality={100}
          className="object-cover"
        />
      </div>
  );
}
