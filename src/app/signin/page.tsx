'use client'
import InputBox from '@/components/input/InputBox';
import { useForm } from 'react-hook-form';
import BasicButton from '@/components/button/BasicButton';
import UserStore from '@/store/UserStore';
import { useRouter } from 'next/navigation';

interface FormData {
    userName: string;
}

const SignIn = () => {
    const {login, setUserName} = UserStore();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>(); 

    const onSubmit = async (data: FormData) => {
        try {
            const apiURL = process.env.NEXT_PUBLIC_TEST_SERVER_URL;
        
            const formDataToSend = {
                userName: data.userName,
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

            console.log(response);

            if (!response.ok){
                console.log('error');
            } else {
                console.log('ok');
                login();
                setUserName(data.userName);
                router.replace('/group');
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