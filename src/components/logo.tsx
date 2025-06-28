import Image from "next/image"
import LogoImage from "~/public/logo.jpg"

export default function Logo() {
   return (
      <div className="relative flex items-center justify-center size-9 rounded-full overflow-hidden bg-secondary">
         <Image src={LogoImage} alt="logo" className="w-full h-full object-cover" />
      </div>
   )
}
