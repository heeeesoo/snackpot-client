'use client'
import InputBox from '@/components/input/InputBox';
import { useForm } from 'react-hook-form';
import BasicButton from '@/components/button/BasicButton';
import UserStore from '@/store/UserStore';
import { useRouter } from 'next/navigation';
import firebase from "firebase/app";
import "firebase/messaging";
import { useState, useEffect } from 'react';
import TokenStore from '@/store/TokenStore';
import { useSearchParams } from 'next/navigation'
import GroupCodeStore from '@/store/GroupCodeStore';

const firebaseConfig = {
    apiKey: "AIzaSyCj8cmzn94XS6HfqVXvMnmRvSH66LcrblQ",
    authDomain: "snackpot-2aff6.firebaseapp.com",
    projectId: "snackpot-2aff6",
    storageBucket: "snackpot-2aff6.appspot.com",
    messagingSenderId: "772201837506",
    appId: "1:772201837506:web:b594806bf50b8f72e89c5b",
    measurementId: "G-RBMVKFLVBN"
};

interface FormData {
    userName: string;
}

const SignIn = () => {
    // fcm token
    const [fcmToken, setFcmToken] = useState<string>('')
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    const getToken = async() => {
        const messaging = firebase.messaging();
        const token = await messaging.getToken({
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

        return token;
    }
    
    useEffect(() => {
        async function getMessageToken() {
            const token = await getToken();
            console.log('fcm token:',token);
            setFcmToken(token);
        }
        getMessageToken();
    }, []);

    const searchParams = useSearchParams();
    const {login, setUserName, setUserId} = UserStore();
    const {accessToken, setToken} = TokenStore();
    const {groupCode} = GroupCodeStore();
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
                name: data.userName,
                fcmToken: fcmToken
            };

            console.log(formDataToSend)
        
            const response = await fetch(`${apiURL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
                body: JSON.stringify(formDataToSend),
            });

            const responseData = await response.json();
            console.log(response);
            console.log(responseData);

            if (!response.ok){
                console.log('error');
                alert(responseData.result.message);
            } else {
                console.log('ok');
                login();
                setUserName(data.userName);
                setToken(responseData.result.data.accessToken);
                setUserId(responseData.result.data.memberId);
                console.log(responseData.result.data.id)
                if(groupCode !== ""){
                    router.replace(`/invitation?groupCode=${groupCode}`)
                }else {
                    router.replace('/group');
                }
            }

            
            // const apiUrl = `${searchParams}` === 'name=signup' ? `${process.env.NEXT_PUBLIC_SERVER_URL}/mvp/auth/sign-up` : `${process.env.NEXT_PUBLIC_SERVER_URL}/mvp/auth/login`;
        
            // const formDataToSend = {
            //     userName: data.userName,
            //     fcmToken: fcmToken
            // };

            // console.log(formDataToSend)
        
            // const response = await fetch(apiUrl, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "Accept": "application/json",
            //     },
            //     body: JSON.stringify(formDataToSend),
            // });

            // console.log(response);

            // if (!response.ok) {
            //     const errorResponseData = await response.json();
            //     if (errorResponseData.code === -2100){
            //         alert('알림을 허용해주세요.')
            //     } else {
            //         alert(errorResponseData.result.message);
            //     }
            //     // throw new Error(`${error}`)
            //     return;
            // } else {
            //     const responseData = await response.json();
            //     console.log('Server response:', responseData);
            //     setToken(responseData.result.data.accessToken);
            //     setMemberId(responseData.result.data.id);
            //     setMemberName(data.userName);
            //     login();
            //     router.replace('/');
            // }
        

        } catch (error) {
            console.error('Error while submitting form data:', error);
            alert(`${error}`);
        }
    };

    return (
        <div className="relative flex flex-col pt-[30px]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-between min-h-[80vh]">
                <InputBox title="닉네임을 입력해주세요" label="userName" name="userName" register={register} error={errors.userName?.message} maxLength={6} placeholder="닉네임 (최대 6자)" noSpecialChar={true}/>
                <BasicButton text="로그인하기"/>
            </form>
        </div>
    );
};

export default SignIn;