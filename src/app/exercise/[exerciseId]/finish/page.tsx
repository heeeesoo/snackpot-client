'use client'
import ExerciseStore from "@/store/ExerciseStore";
import { Time, Calory, ThumbsDown, ThumbsUp } from "@/constant/icon";
import Image from "next/image";
import BasicButton from "@/components/button/BasicButton";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useRouter } from "next/navigation";
import TokenStore from "@/store/TokenStore";
import { ChangeEvent } from "react";

interface FormData {
    ratingType: string;
    reviewContent: number;
}

const ExerciseFinish = ({ params }: { params: { exerciseId: number } }) => {
    const { videoId, calory, time } = ExerciseStore();
    const router = useRouter();
    const maxLength = 20; // 원하는 최대 글자 수
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FormData>(); 
    const watchRatingType = watch('ratingType');

    const onSubmit = async (data: FormData) => {
        try {
            const apiURL = process.env.NEXT_PUBLIC_SERVER_URL;
        
            const formDataToSend = {
                exerciseId: params.exerciseId,
                ratingType: data.ratingType,
                reviewContent: data.reviewContent
            };

            console.log(formDataToSend)
        
            const response = await fetch(`${apiURL}/reviews`, {
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
                router.push('/exercise');
            }

        } catch (error) {
            console.error('Error while submitting form data:', error);
            alert(`${error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-screen max-w-[500px]">
            <div className="text-SystemGray3 bg-white h-[76px] w-fixwidth rounded-[16px] flex flex-row justify-center items-center">
                <div className="flex flex-col justify-center items-center w-[45%]">
                    <div className="flex flex-row text-[12px]">
                        <Image
                        src={Time}
                        alt="Time"
                        width={16}
                        height={16}
                        className="mx-[4px]"
                        />
                        시간
                    </div>
                    <div className="font-bold text-black">
                        {
                            time >= 60 ? 
                                time % 60 ==0?
                                    `${Math.floor(time/60)}분` :
                                    `${Math.floor(time/60)}분 ${time%60}초`:
                                `${time%60}초`
                        }
                    </div>
                </div>
                <div className="h-[24px] w-[0.5px] bg-SystemGray3"/>
                <div className="flex flex-col justify-center items-center w-[45%]">
                    <div className="flex flex-row text-[12px] justify-center items-center">
                        <Image
                        src={Calory}
                        alt="Calory"
                        width={16}
                        height={16}
                        className="mx-[4px]"
                        />
                        열량
                    </div>
                    <div className="font-bold text-black">
                        {calory} kcal
                    </div>
                </div>
            </div>
            <div className="font-bold text-[20px] pt-[40px]">
                오늘 운동 어땠나요?
            </div>
            <div className="flex flex-row w-fixwidth justify-between items-center pt-[20px]">
                <label htmlFor="thumbsUp" className={`w-[48%] flex justify-center items-center ${watchRatingType != 'BAD' ? 'bg-SystemBrand' : 'bg-white'} h-[170px] rounded-[16px]`}>
                    <input
                        type="radio"
                        id="thumbsUp"
                        value="GOOD"
                        {...register("ratingType")}
                        style={{ display: "none" }} // 라디오 버튼을 숨깁니다.
                    />
                    <Image
                        src={ThumbsUp}
                        alt="ThumbsUp"
                        height={88}
                        width={88}
                    />
                </label>
                <label htmlFor="thumbsDown" className={`w-[48%] flex justify-center items-center ${watchRatingType != 'BAD' ? 'bg-white' : 'bg-SystemBrand'} h-[170px] rounded-[16px]`}>
                    <input
                        type="radio"
                        id="thumbsDown"
                        value="BAD"
                        {...register("ratingType")}
                        style={{ display: "none" }} // 라디오 버튼을 숨깁니다.
                    />
                        <Image
                            src={ThumbsDown}
                            alt="ThumbsDown"
                            height={88}
                            width={88}
                        />
                </label>
            </div>
            <div className="font-bold text-[20px] pt-[40px] flex justify-center items-center text-center">
                운동이 도움이 되었다면 <br />
                리뷰를 작성해주세요
            </div>
            <textarea
                className="w-fixwidth h-[180px] my-[20px] align-top text-left pt-2 px-2"
                placeholder="리뷰를 통해 직접 효과가 있는지 공유해요!"
                {...register("reviewContent", { 
                    maxLength: {
                        value: maxLength,
                        message: `최대 ${maxLength}자까지 입력 가능합니다`
                    }
                 })}
                style={{ wordWrap: 'break-word' }
            }
            />
            {errors.reviewContent && (
                <span className="text-red-500 mb-4 mt-[-20px]">{errors.reviewContent.message}</span>
            )}
            <div className="w-fixwidth">
                <BasicButton text="운동 완료"/>
            </div>
            <div className="my-[10px]"/>
        </form>
    );
};

export default ExerciseFinish;