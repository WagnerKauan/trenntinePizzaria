import Image from "next/image";
import { SignInList } from "./_components/signIn-list";





export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image/bg_checkout.png')] bg-no-repeat bg-cover bg-center w-full">

      <Image 
        src={'/image/logoTrentinne_light.png'}
        alt="Logo Trentinne"
        width={140}
        height={53}
        className="absolute top-4 left-4"
      />

      <section className="bg-dark-normal w-full max-w-xl rounded-xl">
        <SignInList />
      </section>

    </div>
  )
}