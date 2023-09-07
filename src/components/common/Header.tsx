import Image from "next/image";
import { LogoSmall } from "@/constant/icon";

const Header = () => {
    return (
        <div className="h-[64px] bg-grayScreen flex flex-row justify-center">
            <Image 
                src={LogoSmall}
                alt="LogoSmall"
                width={108}
                height={24}
            />
        </div>
    );
};

export default Header;