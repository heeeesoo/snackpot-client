'use client';

import { UseFormRegister } from 'react-hook-form';

interface CustomFormInputProps {
    title: string;
    subtitle?: string;
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    defaultValue?: string | number;
    placeholder?: string;
    unit?: string;
    type?: string;
    min?: number | string;
    max?: number | string;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    integerOnly?: boolean;
    noSpecialChar?: boolean;
}

function isInteger(value: any): boolean {
    return Number.isInteger(Number(value));
}

function isValidInput(value: string): boolean {
    const regex = /^[a-zA-Z0-9\u3131-\uD79D]+$/; // 알파벳, 숫자, 한글의 정규식
    return regex.test(value);
}

export default function InputEditBox({
    title,
    subtitle,
    name,
    label,
    register,
    error,
    defaultValue,
    placeholder,
    unit,
    type,
    min,
    max,
    maxLength,
    minValue,
    maxValue,
    integerOnly = false,
    noSpecialChar = false,
}: CustomFormInputProps) {
    const maxLengthValidation = maxLength ? {
        value: maxLength,
        message: `최대 ${maxLength}자까지 입력 가능합니다.`,
    } : undefined;

    const minValidation = minValue !== undefined ? {
        value: minValue,
        message: `최소 값은 ${minValue}입니다.`,
    } : undefined;

    const maxValidation = maxValue !== undefined ? {
        value: maxValue,
        message: `최대 값은 ${maxValue}입니다.`,
    } : undefined;

    const inputType = integerOnly ? 'number' : type;

    const validateInteger = integerOnly ? {
        validate: {
            isInteger: (value: any) => isInteger(value) || '정수만 입력 가능합니다.',
        },
    } : undefined;

    const validateSpecial = noSpecialChar ? {
        validate: {
            isValidInput: (value: any) => isValidInput(value) || '알파벳, 숫자, 한글만 입력 가능합니다. 빈칸을 빼주세요.',
        },
    } : undefined;


    return (
        <div className=' rounded-lg h-[50px] flex flex-col items-center justify-center'>
            <div className="flex items-center justify-between pb-[3px]">
                <label htmlFor={name}>{title}</label>
                <div className="text-SystemBrand text-[12px]">{subtitle}</div>
            </div>
            <div className='flex '>
            <input
                {...register(name, {
                    required: `필수 입력입니다.`,
                    maxLength: maxLengthValidation,
                    min: minValidation,
                    max: maxValidation,
                    ...validateInteger,
                    ...validateSpecial
                })}
                defaultValue={defaultValue}
                placeholder={placeholder}
                min={min}
                max={max}
                className='w-[85%] outline-none border-b-2 text-right'
            />
            {unit && <span className='w-[15%] text-SystemGray3' >{unit}</span>}
            </div>
            {error && <div className="text-red-500 text-[12px] mt-1">{error}</div>}
        </div>
        // <div className="flex flex-col w-full text-[16px] text-SystemGray2 text-center rounded-lg">
            // <div className="flex items-center justify-between pb-[3px]">
            //     <label htmlFor={name}>{title}</label>
            //     <div className="text-SystemBrand text-[12px]">{subtitle}</div>
            // </div>
        //     <div className="flex justify-between w-full rounded-xl">
        //         <input
        //             {...register(name, {
        //                 required: `필수 입력입니다.`,
        //                 maxLength: maxLengthValidation,
        //                 min: minValidation,
        //                 max: maxValidation,
        //                 ...validateInteger,
        //                 ...validateSpecial
        //             })}
        //             defaultValue={defaultValue}
        //             className="focus:outline-none text-left bg-black rounded-xl h-[60px] pl-[20px]  text-SystemGray1 placeholder-SystemGray2 outline-grayScreen"
        //             placeholder={placeholder}
        //             // type={inputType}
        //             min={min}
        //             max={max}
        //         />
        //         {unit && <span className="flex items-center mr-4 text-SystemGray3">{unit}</span>}
        //     </div>
        //     {error && <div className="text-red-500 text-[12px] mt-1">{error}</div>}
        // </div>
    );
}

