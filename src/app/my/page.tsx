'use client'
import UserStore from '@/store/UserStore';
import BasicButton from '@/components/button/BasicButton';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const My = () => {
    const {logout, isLoggedIn} = UserStore();
    const router = useRouter();

    useEffect(() => {
        if(!isLoggedIn){
            router.replace('/')
        }
    },[isLoggedIn])

    return (
        <div className='flex flex-col items-center'>
            My
            <BasicButton text='logout' onClick={logout}/>
        </div>
    );
};

export default My;