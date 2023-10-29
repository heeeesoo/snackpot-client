'use client'
import Image from "next/image";
import { LogoSmall, Cross } from "@/constant/icon";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "@/constant/icon";
import { useRouter } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();

    function hasNumberAfterGroup(path:string) {
        // '/group' 뒤에 숫자가 붙는지 확인하는 정규 표현식
        const regex = /\/group\/\d+/;
        return regex.test(path);
    }

    const handleClickBack = () => {
        router.back()
    }

    const handleClickCross = () => {
        router.push('/exercise')
    }

    const handleClickLogo = () => {
        router.push('/group')
    }

    return (
        <div>
            
            {
                pathname.includes('/execution') || hasNumberAfterGroup(pathname)
                ?
                <div></div>
                :
                pathname.includes('/finish')
                ?
                <div className="h-[64px] mx-3 font-bold bg-grayScreen flex flex-row items-center justify-between">
                    <div onClick={handleClickCross}>
                    <Image
                        src={Cross}
                        alt="ChevronLeft"
                        width={24}
                        height={24}
                    />
                    </div>
                    운동 완료
                    <div className="w-[24px]" />
                </div>
                :
                pathname === '/signup'
                ?
                <div className="h-[64px] mx-3 font-bold bg-grayScreen flex flex-row items-center justify-between">
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
                <div className="h-[64px] mx-3 font-bold bg-grayScreen flex flex-row items-center justify-between">
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
                pathname === '/'
                ?
                <div className="h-[64px] bg-grayScreen flex flex-row justify-center items-center">
                    <div onClick={handleClickLogo}>
                        <Image 
                            src={LogoSmall}
                            alt="LogoSmall"
                            width={108}
                            height={24}
                            priority
                        />
                    </div>
                </div>
                :
                <div className="h-[64px] bg-grayScreen flex flex-row justify-between items-center">
                    <div onClick={handleClickBack} className="ml-[10px]">
                    <Image
                        src={ChevronLeft}
                        alt="ChevronLeft"
                        width={24}
                        height={24}
                    />
                    </div>
                    <div onClick={handleClickLogo}>
                        <Image 
                            src={LogoSmall}
                            alt="LogoSmall"
                            width={108}
                            height={24}
                            priority
                        />
                    </div>
                    <div className="w-[24px] mr-[10px]"/>
                </div>
            }
        </div>
    );
};

export default Header;