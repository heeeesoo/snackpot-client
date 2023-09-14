interface BasicSecondayButtonProps {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BasicSecondayButton = ({
    text,
    onClick
} : BasicSecondayButtonProps) => {
    return (
        <button onClick={onClick} className="h-[56px] font-bold w-fixwidth text-SystemBrand bg-SystemSecondaryBrand rounded-[16px]">
            {text}
        </button>
    );
};

export default BasicSecondayButton;