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
    dailyGoalTime: number;
}

const SignUp = () => {
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

    const {login , setUserName, setUserId} = UserStore();
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
                dailyGoalTime: Number(data.dailyGoalTime),
                fcmToken: fcmToken
            };

            console.log(formDataToSend)
        
            const response = await fetch(`${apiURL}/auth/signup`, {
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
                setToken(responseData.result.data.accessToken);
                setUserName(data.userName);
                setUserId(responseData.result.data.memberId);
                if(groupCode !== ""){
                    router.replace(`/invitation?groupCode=${groupCode}`);
                }else{
                    router.replace('/group');
                }
            }


        } catch (error) {
            console.error('Error while submitting form data:', error);
            alert(`${error}`);
        }
    };

    return (
        <div className="flex flex-col pt-[30px]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-between min-h-[80vh]">
                <div className='w-full flex flex-col items-center'>
                    <InputBox title="닉네임을 입력해주세요" label="userName" name="userName" register={register} error={errors.userName?.message} maxLength={6} placeholder="닉네임 (최대 6자)" noSpecialChar={true}/>
                    <div className='py-5'/>
                    <InputBox title="하루 목표 운동 시간을 입력해주세요" label="dailyGoalTime" name="dailyGoalTime" register={register} error={errors.dailyGoalTime?.message} maxLength={6} placeholder="0" integerOnly={true} unit='분'/>
                </div>
                <BasicButton text="가입하기"/>
            </form>
        </div>
    );
};

export default SignUp;