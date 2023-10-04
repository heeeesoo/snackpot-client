'use client'
import { useForm } from 'react-hook-form';
import BasicButton from '@/components/button/BasicButton';
import InputBox from '@/components/input/InputBox';
import { useRouter } from 'next/navigation';
import TokenStore from '@/store/TokenStore';

interface FormData {
    groupName: string;
}

const Create = () => {
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
                groupName: data.groupName,
            };

            console.log(formDataToSend)
        
            const response = await fetch(`${apiURL}/groups`, {
                method: 'POST',
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
                router.push('/group');
            }

        } catch (error) {
            console.error('Error while submitting form data:', error);
            alert(`${error}`);
        }
    };

    return (
        <div className="relative flex flex-col pt-[30px]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-between min-h-[80vh]">
                <InputBox title="그룹의 이름을 입력해주세요" label="groupName" name="groupName" register={register} error={errors.groupName?.message} maxLength={8} placeholder="그룹명 (최대 8자)" noSpecialChar={true}/>
                <BasicButton text="그룹 생성하기"/>
            </form>
        </div>
    );
};

export default Create;