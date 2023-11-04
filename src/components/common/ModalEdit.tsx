'use client'
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import TokenStore from '@/store/TokenStore';
import BasicButton from '@/components/button/BasicButton';
import InputBox from '@/components/input/InputBox';

interface ModalEditType {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

interface FormData {
    dailyGoalTime: string;
}

function ModalEdit({ isOpen, onClose, children } : ModalEditType) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>(); 

    const onSubmit = async (data: FormData) => {
        try {
            const apiURL = process.env.NEXT_PUBLIC_SERVER_URL;
        
            const formDataToSend = {
                dailyGoalTime: Number(data.dailyGoalTime),
            };

            console.log(formDataToSend)
        
            const response = await fetch(`${apiURL}/members/dailyGoalTime`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    'Authorization': TokenStore.getState().accessToken
                },
                body: JSON.stringify(formDataToSend),
            });

            console.log(response);

            if (!response.ok){
                console.log('error');
            } else {
                console.log('ok');
                location.reload();
            }

        } catch (error) {
            console.error('Error while submitting form data:', error);
            alert(`${error}`);
        }
    };

    return isOpen ? (
        <div className="fixed top-0 z-10 shadow-2xl left-0 w-full h-full flex flex-col items-center justify-center">
            <div className='flex flex-col shadow-2xl justify-center items-center bg-white w-[80%] h-[400px] rounded-md'>
                <div className=" rounded-lg flex justify-center items-center flex-col">
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col text-center justify-center items-center'>
                        <div className=' text-SystemGray3'>하루 목표 운동 시간을 수정해주세요</div>
                        <div className='py-4'/>
                        <div className='w-[70%]'>
                            <InputBox title="" label="dailyGoalTime" name="dailyGoalTime" register={register} error={errors.dailyGoalTime?.message} maxValue={1440} maxLength={6} placeholder="0" integerOnly={true} unit='분'/> 
                        </div>
                        <div className='py-4'/>
                        <div className='w-[70%]'>
                            <BasicButton text="수정하기"/>
                        </div>
                    </form>
                </div>
                <div className='py-8'/>
                <button className='rounded-lg h-[40px] bg-SystemBrand text-white w-[150px]' onClick={onClose}>다음에 수정할게요!</button>
            </div>
        </div>
    ) : null;
}

export default ModalEdit;
