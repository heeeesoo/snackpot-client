interface BasicButtonProps {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BasicButton = ({
    text,
    onClick
} : BasicButtonProps) => {
    return (
        <button onClick={onClick} className="h-[56px] font-bold text-white text-[16px] w-full bg-SystemBrand rounded-[16px]">
            {text}
        </button> 
    );
};

export default BasicButton;