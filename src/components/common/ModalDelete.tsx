'use client'
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import TokenStore from '@/store/TokenStore';
import UserStore from '@/store/UserStore';

interface ModalDeleteType {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

interface FormData {
    dailyGoalTime: string;
}

function ModalDelete({ isOpen, onClose, children } : ModalDeleteType) {
    const router = useRouter();
    const {logout} = UserStore();
    const {setToken} = TokenStore();

    const onDelete = async () => {
        try {
            const apiURL = process.env.NEXT_PUBLIC_SERVER_URL;
        
            const response = await fetch(`${apiURL}/members`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    'Authorization': TokenStore.getState().accessToken
                },
            });

            console.log(response);

            if (!response.ok){
                console.log('error');
            } else {
                console.log('ok');
                logout();
                setToken('');
                router.replace('/');
            }

        } catch (error) {
            console.error('Error while submitting form data:', error);
            alert(`${error}`);
        }
    };

    return isOpen ? (
        <div className="fixed top-0 z-10 shadow-2xl left-0 w-full h-full flex flex-col items-center justify-center">
            <div className='flex flex-col shadow-2xl justify-center items-center bg-white w-[80%] h-[300px] rounded-md'>
                <div className=" rounded-lg flex justify-center items-center flex-col">
                        <div className=' text-SystemGray3'>계정을 정말 탈퇴하시겠습니까?</div>
                </div>
                <div className='py-8'/>
                <div className='w-[100%] flex justify-center'>
                    <button className='rounded-lg h-[40px] bg-SystemBrand text-white w-[40%]' onClick={onDelete}>예</button>
                    <div className='px-[3px]'></div>
                    <button className='rounded-lg h-[40px] bg-SystemBrand text-white w-[40%]' onClick={onClose}>아니오</button>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalDelete;
