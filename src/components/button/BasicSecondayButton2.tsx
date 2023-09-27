import Image from "next/image";
interface BasicSecondayButtonProps {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    imgSrc?: string | undefined; // imgSrc를 옵셔널로 선언
}

const BasicSecondayButton2 = ({
    text,
    onClick,
    imgSrc
}: BasicSecondayButtonProps) => {
    return (
        <button onClick={onClick} className="h-[56px] flex items-center font-bold justify-center font-semibold w-full text-SystemBrand bg-SystemSecondaryBrand rounded-[16px]">
            {imgSrc && (
                <Image
                    src={imgSrc}
                    alt="imgSrc"
                    width={16}
                    height={16}
                    className="mr-[4px]"
                />
            )}
            {text}
        </button>
    );
};

export default BasicSecondayButton2;
