'use client'
import UserStore from '@/store/UserStore';
import { getDataClient } from "@/utils/getDataClient";
import BasicSecondayButton2 from '@/components/button/BasicSecondayButton2';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { profile } from '@/constant/icon';
import Skeleton from '@/components/common/Skeleton';

interface myListType {
    userName: string;
    userId: number;
    dailyGoalTime: number;
    weeklyGoalTime: number[];
}

const My = () => {
    const {logout, isLoggedIn, username} = UserStore();
    const [mylist, setMyList] = useState<myListType>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dayOfWeek = ['월','화','수','목','금','토','일']

    const secondsToMinutes = (seconds : number) => {
        const minutes = Math.floor(seconds / 60); // 정수 부분을 분으로 계산
        const remainingSeconds = seconds % 60; // 초 단위의 나머지 부분
    
        // return `${minutes}분 ${remainingSeconds}초`;
        return `${minutes}분`;
    }

    useEffect(() => {
        if(!isLoggedIn){
            router.replace('/')
        }
    },[isLoggedIn])

    useEffect(()=>{
        const fetchMyList = async () => {
            try{
                const resultMyList = await getDataClient(`/members/my`);
                setLoading(false);
                resultMyList && setMyList(resultMyList);
            }catch (error){
                console.log('error:', error);
            }
        }
        fetchMyList();
    },[])

    if (loading) return(<div className='pt-[20px] mx-[20px]'><Skeleton /></div>)

    return (
        <div className='flex flex-col items-center'>
            <div className='w-[120px] h-[120px] relative mt-3'>
                <Image
                src={profile}
                alt='profile'
                className="rounded-full border-2 border-white"
                layout='fill'
                objectFit="cover"
                objectPosition="center"
                />
            </div>
            <div className='font-black pt-[16px] text-[28px]'>
                {username}
            </div>
            <div className='pt-[40px]' />
            <div className='bg-white w-fixwidth rounded-[16px] flex justify-between items-center h-[60px] px-[20px]'>
                <div className='text-[14px] text-SystemGray3'>
                    하루 목표 운동 시간
                </div>
                <div className='font-bold'>
                    {mylist?.dailyGoalTime !== undefined ? secondsToMinutes(mylist.dailyGoalTime) : "N/A"}
                </div>
            </div>
            <div className='pt-[20px]'/>
            <div className='h-[128px] bg-white px-[20px] py-[20px] w-fixwidth rounded-[16px]'>
                <div className='flex justify-between'>
                    <div className='font-bold'>
                        최근 일주일간 목표 달성량   
                    </div>
                    <div className='font-bold text-SystemBrand'>
                        60%  
                    </div>
                </div>
            <div className='pt-[16px]'/>
                <div className='flex items-stretch justify-between flex-row'>
                    {
                        // mylist?.weeklyGoalTime.map((goaltime: number, idx: number)=>{
                        //     return(
                        //         <div key={idx} className='flex w-[40px] items-center justify-between flex-col'>
                        //             <div className='text-SystemGray4 text-[12px]'>
                        //                 {dayOfWeek[idx]}
                        //             </div>
                        //             <div className='pt-[8px]'/>
                        //             <div>
                        //                 {/* {goaltime} */}
                        //                 <div>
                        //                     <div style={{ width: '28px', height: '28px' }}>
                        //                     <svg viewBox="0 0 200 200">
                        //                         <circle cx="100" cy="100" r="90" fill="none" stroke="#EBF2FE" strokeWidth="20" />
                        //                         <circle
                        //                         cx="100"
                        //                         cy="100"
                        //                         r="90"
                        //                         fill="none"
                        //                         stroke="#3A81F7"
                        //                         strokeWidth="20"
                        //                         strokeDasharray={`${2 * Math.PI * 90 * Number(goaltime/mylist.dailyGoalTime)} ${2 * Math.PI * 90 * Number(1-goaltime/mylist.dailyGoalTime)}`}
                        //                         strokeDashoffset={2 * Math.PI * 90 * 0.25}
                        //                         />
                        //                     </svg>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     )
                        // })
                    }
                </div>
            </div>
            <div className='pt-[20px]'/>
            <div className='w-fixwidth'>
                <BasicSecondayButton2 text='로그아웃' onClick={logout}/>
            </div>
        </div>
    );
};

export default My;