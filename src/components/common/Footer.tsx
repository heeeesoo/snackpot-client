'use client'
import Link from "next/link";
import Image from "next/image";
import { FooterLinks } from "@/constant";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();
    const pathnames = [
        '/',
    ];

    return (
        <div>
            {
                pathnames.some(path => pathname == path) ?
                    null
                    :
                    <div className="h-[70px] w-full bg-white flex flex-row justify-center">
                        {FooterLinks.map((footerLink) => {
                            const isSelected = pathname == footerLink.href ? true : false;
                            return(
                                <Link href={footerLink.href} key={footerLink.key} className="flex flex-col items-center justify-center w-1/3">
                                    <Image 
                                        src={isSelected ? footerLink.imgActive : footerLink.img}
                                        width={24}
                                        height={24}
                                        alt="footer"
                                    />
                                    <div className={`${isSelected ? 'text-SystemBrand' : 'text-SystemGray4'} text-[12px]`}>
                                        {footerLink.text}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
            }
        </div>
    );
};

export default Footer;