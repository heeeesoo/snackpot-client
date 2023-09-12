'use client'
import InputBox from '@/components/input/InputBox';
import { useForm } from 'react-hook-form';
import BasicButton from '@/components/button/BasicButton';

interface FormData {
    nickname: string;
}

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>(); 

    const onSubmit = async (data: FormData) => {
        try {
            console.log('submit:',data.nickname)
            // const apiUrl = `${searchParams}` === 'name=signup' ? `${process.env.NEXT_PUBLIC_SERVER_URL}/mvp/auth/sign-up` : `${process.env.NEXT_PUBLIC_SERVER_URL}/mvp/auth/login`;
        
            // const formDataToSend = {
            //     nickname: data.nickname,
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
            //     setMemberName(data.nickname);
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
                <InputBox title="닉네임을 입력해주세요" label="nickname" name="nickname" register={register} error={errors.nickname?.message} maxLength={6} placeholder="닉네임 (최대 6자)" noSpecialChar={true}/>
                <BasicButton text="로그인하기"/>
            </form>
        </div>
    );
};

export default SignIn;