'use client'
import UserStore from '@/store/UserStore';
import { getDataClient } from "@/utils/getDataClient";
import BasicSecondayButton2 from '@/components/button/BasicSecondayButton2';
import BasicButton from '@/components/button/BasicButton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { profile2, RunningMan } from '@/constant/icon';
import Skeleton from '@/components/common/Skeleton';
import TokenStore from '@/store/TokenStore';

interface myListType {
    userName: string;
    // userId: number;
    dailyGoalTime: number;
    weeklyGoalTime: weeklyGoaltimeType[];
    profileImg: null| string;
}

interface weeklyGoaltimeType {
    day: string;
    time: number;
}

const My = () => {
    const {logout, isLoggedIn, username} = UserStore();
    const {setToken} = TokenStore();
    const [mylist, setMyList] = useState<myListType>();
    const [nullTimeCount, setNullTimeCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [countLoading, setCountLoading] = useState(false);
    const router = useRouter();
    const dayOfWeek = ['월','화','수','목','금','토','일']

    const secondsToMinutes = (seconds : number) => {
        const minutes = Math.floor(seconds / 60); // 정수 부분을 분으로 계산
        const remainingSeconds = seconds % 60; // 초 단위의 나머지 부분

        // return `${minutes}분 ${remainingSeconds}초`;
        return `${seconds}분`;
    }

    const logoutAccount = () => {
        logout();
        setToken('');

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
                console.log('mylist:',resultMyList)
                resultMyList && setMyList(resultMyList.result.data);
                console.log('mylist2:',resultMyList.result.data);
                let nullCount = 0
                for(let i =0 ; i<resultMyList.result.data.weeklyGoalTime.length; i++){
                    if(resultMyList.result.data.weeklyGoalTime[i].time == null){
                        nullCount += 1
                    }
                }
                setNullTimeCount(7 - nullCount)
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
                src={profile2}
                alt='profile'
                className="rounded-full border-2 border-white"
                layout='fill'
                objectFit="cover"
                objectPosition="center"
                />
            </div>
            <div className=' pt-[16px] text-[28px]'>
                {username}
            </div>
            <div className='pt-[40px]' />
            <div className='bg-white w-fixwidth rounded-[16px] flex justify-between items-center h-[60px] px-[20px]'>
                <div className='text-[16px] text-SystemGray3'>
                    하루 목표 운동 시간
                </div>
                <div className=''>
                    {mylist?.dailyGoalTime !== undefined ? secondsToMinutes(mylist.dailyGoalTime) : "N/A"}
                </div>
            </div>
            <div className='pt-[20px]'/>
            <div className='h-[128px] bg-white px-[20px] py-[20px] w-fixwidth rounded-[16px]'>
                <div className='flex justify-between'>
                    <div className=''>
                        이번주 목표 달성 횟수
                    </div>
                    <div className=' text-SystemBrand'>
                        {/* 60%   */}
                        {countLoading && (
                            <>
                                {nullTimeCount}회
                            </>
                        )}
                        {nullTimeCount}회
                    </div>
                </div>
            <div className='pt-[16px]'/>
                <div className='flex items-stretch justify-between flex-row'>
                    {
                        mylist?.weeklyGoalTime.map((goaltime: any, idx: number)=>{
                            return(
                                <div key={idx} className='flex w-[40px] items-center justify-between flex-col'>
                                    <div className='text-SystemGray3 text-[15px]'>
                                        {dayOfWeek[idx]}
                                    </div>
                                    <div className='pt-[8px]'/>
                                    <div>
                                        <div>
                                            <div style={{ width: '28px', height: '28px' }}>
                                            <svg viewBox="0 0 200 200">
                                                <circle cx="100" cy="100" r="80" fill="none" stroke="#EBF2FE" strokeWidth="50" />
                                                <circle
                                                cx="100"
                                                cy="100"
                                                r="80"
                                                fill="none"
                                                stroke="#3A81F7"
                                                strokeWidth="50"
                                                // strokeDasharray={`${2 * Math.PI * 90 * Number(0.9)} ${2 * Math.PI * 90 * Number(0.9)}`}
                                                strokeDasharray={`${2 * Math.PI * 90 * (Math.ceil((goaltime.time/(mylist.dailyGoalTime*60)*100))/100)} ${2 * Math.PI * 90 * (1-Math.ceil((goaltime.time/(mylist.dailyGoalTime*60)*100))/100)}`}
                                                strokeDashoffset={2 * Math.PI * 90 * 0.25}
                                                />
                                            </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='pt-[20px]'/>
            <div className='w-fixwidth'>
                <BasicButton text='로그아웃' onClick={logoutAccount}/>
            </div>
        </div>
    );
};

export default My;