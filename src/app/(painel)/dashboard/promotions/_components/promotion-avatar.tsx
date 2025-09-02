"use client";

import { Promotion } from "@/generated/prisma";
import { Loader, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { uploadPromotionImage } from "../_actions/upload-promotion-image";

interface PromotionAvatarProps {
  promotion: Promotion;
}

export function PromotionAvatar({ promotion }: PromotionAvatarProps) {
  const [loading, setLoading] = useState(false);


  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.files && event.target.files[0]) {
      setLoading(true);

      const image = event.target.files[0];

      if(image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.error("Formato inválido!");
        setLoading(false);
        return;
      }

      const newFileName = `${promotion.id}`
      const newFile = new File([image], newFileName, {  type: image.type });
      const urlImage = await uploadImage(newFile);

      if(!urlImage || urlImage === "") {
        toast.error("Erro ao enviar imagem!");
        setLoading(false);
        return;
      }

      const response = await uploadPromotionImage({promotionImageUrl: urlImage, promotionId: promotion.id});

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
      formData.append("id", promotion.id);

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
          promotion.imageUrl || "/image/promotions/promotions_1.png"
        }
        alt={promotion.name}
        fill
        quality={100}
        className="object-cover"
      />
    </div>
  );
}
