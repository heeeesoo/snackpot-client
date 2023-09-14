'use client'
import Image from "next/image";
import { LogoSmall } from "@/constant/icon";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "@/constant/icon";
import { useRouter } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleClickBack = () => {
        router.back()
    }

    return (
        <div>
            
            {
                pathname === '/signup'
                ?
                <div className="h-[64px] font-bold bg-grayScreen flex flex-row items-center justify-between">
                    <div onClick={handleClickBack}>
                    <Image
                        src={ChevronLeft}
                        alt="ChevronLeft"
                        width={24}
                        height={24}
                    />
                    </div>
                    회원가입
                    <div className="w-[24px]" />
                </div>
                :
                pathname === '/signin'
                ?
                <div className="h-[64px] font-bold bg-grayScreen flex flex-row items-center justify-between">
                    <div onClick={handleClickBack}>
                    <Image
                        src={ChevronLeft}
                        alt="ChevronLeft"
                        width={24}
                        height={24}
                    />
                    </div>
                    로그인
                    <div className="w-[24px]" />
                </div>
                :
                <div className="h-[64px] bg-grayScreen flex flex-row justify-center items-center">
                    <Image 
                        src={LogoSmall}
                        alt="LogoSmall"
                        width={108}
                        height={24}
                        priority
                    />
                </div>
            }
        </div>
    );
};

export default Header;