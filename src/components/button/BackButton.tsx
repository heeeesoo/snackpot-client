'use client'
import Image from "next/image";
import { ChevronLeft } from "@/constant/icon";
const BackButton = () => {
    return (
        <div>
            <Image
            src={ChevronLeft}
            alt="ChevronLeft"
            width={20}
            height={20}
            />
        </div>
    );
};

export default BackButton;