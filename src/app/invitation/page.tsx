'use client'
import { useSearchParams } from 'next/navigation'
import UserStore from '@/store/UserStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Invitation = () => {
    const searchParams = useSearchParams();
    const {isLoggedIn} = UserStore();
    const router = useRouter();
    const groupCode = searchParams.get('groupCode');

    useEffect(() => {
        if(!isLoggedIn){
            router.replace(`/?${groupCode}`);
        }
    },[isLoggedIn])

    return (
        <div>
            {groupCode}
        </div>
    );
};

export default Invitation;