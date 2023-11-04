'use client'
import { useSearchParams } from 'next/navigation'
import UserStore from '@/store/UserStore';
import GroupCodeStore from '@/store/GroupCodeStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TokenStore from "@/store/TokenStore";

const Invitation = () => {
    const searchParams = useSearchParams();
    const {isLoggedIn} = UserStore();
    const {setGroupCode} = GroupCodeStore();
    const router = useRouter();
    const groupCode = searchParams.get('groupCode');

    useEffect(() => {
        const fetchInvitation = async () => {
            try {
                const apiURL = process.env.NEXT_PUBLIC_SERVER_URL;
                const formDataToSend = {
                    groupCode: groupCode
                };
                const response = await fetch(`${apiURL}/groups/join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        'Authorization': TokenStore.getState().accessToken
                    },
                    body: JSON.stringify(formDataToSend),
                });
                const responseData = await response.json();

                console.log('invite:', responseData);

                if (!response.ok){
                    console.log('error');
                    alert(responseData.result.message);

                    if(responseData.code === -1200){
                        router.push('/group')
                    }
                } else {
                    console.log('okinvite');
                    alert('그룹 가입이 완료되었습니다.');
                    setGroupCode('');
                    router.push('/group');
                }

            } catch (error) {
                console.error('Error while submitting form data:', error);
                alert(`${error}`);
            }
        }
        if(!isLoggedIn){
            router.replace(`/?groupCode=${groupCode}`);
            setGroupCode(`${groupCode}`)
        }else{
            console.log('login');
            fetchInvitation();
        }
    },[isLoggedIn])

    return (
        <div className='flex items-center justify-center'>
            그룹 가입 진행중입니다
        </div>
    );
};

export default Invitation;