'use client'
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { getDataClient } from "@/utils/getDataClient";
import ExerciseCard from "@/components/exercise/ExerciseCard";
import Image from "next/image";
import { LikeGray, LikeBlue, Down } from "@/constant/icon";

interface exerciseType {
    thumbnail: string;
    title: string;
    youtuberName: string;
    timeSpent: number;
    bodyPartTypes: string[]; 
    level: string;
    calories: number;
    isLiked: boolean;
    exerciseId: number;
}


const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

const ExerciseListClient: NextPage = () => {
    const bodyPartList: { [key: string]: string } = {'전체':'ALL', '전신':'FULL_BODY', '상체':'UPPER_BODY', '하체':'LOWER_BODY', '코어':'CORE', '팔':'ARMS', '다리':'LEGS', '등':'BACK', '가슴':'CHEST', '어깨':'SHOULDERS'};
    const keysBodyPart = Object.keys(bodyPartList);
    const [bodyPartFilter, setBodyPartFilter] = useState<string>('전체');
    const [bodyPartToggle, setBodyPartToggle] = useState<boolean>(false);
    const onBodyPartToggle = () => setBodyPartToggle(!bodyPartToggle);
    const timeSpentList: { [key: string]: number } = {'전체' : 10000000, '20분 이하' : 1200, '15분 이하' : 900, '10분 이하' : 600, '5분 이하' : 300}
    const keysTimeSpentPart = Object.keys(timeSpentList);
    const [timeSpentFilter, setTimeSpentFilter] = useState<string>('전체');
    const [timeSpentToggle, setTimeSpentToggle] = useState<boolean>(false);
    const onTimeSpentToggle = () => setTimeSpentToggle(!timeSpentToggle)
    const [exerciseUserList, setExerciseUserList] = useState<exerciseType[]>([]);
    const likeFilterNum = useRef<number>(0);
    const [likeFilter, setLikeFilter] = useState<boolean>(false);
    const [state, setState] = useState<{ isLoading: boolean }>({
        isLoading: false
    });
    const fetchexerciseUserList = async (like:boolean, bodyPartTypes:string, size:number, level:string, timeSpent:number,cursor:boolean) => {
        try {
            let apiURL:string = `/exercises?size=${size}`;
            if (like === true) {
                apiURL += `&like=true`;
            }
            if(bodyPartTypes !== '전체'){
                console.log(bodyPartList[bodyPartTypes])
                apiURL+=`&bodyPartTypes=${bodyPartList[bodyPartTypes]}`
            }
            apiURL+=`&timeSpent=${timeSpent}`
            console.log(apiURL, bodyPartFilter);
            const resultexerciseUserList = await getDataClient(apiURL);
            const updatedExerciseUserList = resultexerciseUserList?.result.data.content || [];
            
            setExerciseUserList(updatedExerciseUserList)
            console.log('testlist0:', resultexerciseUserList);
            console.log('testlist1:', updatedExerciseUserList);
            console.log('testlist1-2:', updatedExerciseUserList[updatedExerciseUserList.length - 1].exerciseId);
            console.log('testlist2:', exerciseUserList);
        } catch (error) {
            console.log('error:', error);
        }
    }


    useEffect(()=>{
        fetchexerciseUserList(false,bodyPartFilter,80,'level',timeSpentList[timeSpentFilter], true);
    },[])

    useEffect(() => {
        console.log('!!!!!!!!:',likeFilter);
        if(likeFilter){
            console.log('YES')
            fetchexerciseUserList(true,bodyPartFilter,80,'level',timeSpentList[timeSpentFilter], true);
        }
    },[likeFilter])

    useEffect(()=>{
        console.log(timeSpentList[timeSpentFilter])
        if(likeFilter){
            console.log('likeFilter:',likeFilter)
            fetchexerciseUserList(true,bodyPartFilter,80,'level',timeSpentList[timeSpentFilter], false)
        }else{
            fetchexerciseUserList(false,bodyPartFilter,80,'level',timeSpentList[timeSpentFilter], false)
        }
    },[bodyPartFilter, likeFilter, timeSpentFilter])
    

    const handleLikeFilter = () => {
        likeFilterNum.current += 1
        setLikeFilter(prev=>!prev)
        console.log('LikeFilterNum:', likeFilterNum.current)
    }

    const { isLoading } = state;

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-fixwidth">
                <div className={`${likeFilter ? 'bg-SystemSecondaryBrand' : 'bg-white'} flex rounded-[12px] items-center justify-center w-[44px] h-[44px]`} onClick={handleLikeFilter}>
                    <Image 
                    src={`${likeFilter ? LikeBlue : LikeGray}`}
                    width={20}
                    height={20}
                    alt="LikeBlue"
                    />
                </div>
                <div className="mx-[4px]" />
                <div
                className="  text-SystemGray3 w-[100px] h-[44px] rounded-[12px] bg-white relative z-10"
                onClick={onBodyPartToggle}
                >
                    <div className={`flex justify-center items-center h-[44px] rounded-[12px] ${bodyPartFilter!=='전체' && 'bg-SystemSecondaryBrand'}`}>
                        <div className={`${bodyPartFilter!=='전체' && 'text-SystemBrand'}`}>
                            {bodyPartFilter==='전체' ? '운동 부위' : `${bodyPartFilter} 운동`}
                        </div>
                        <div className="px-[3px]"/>
                        <Image
                        src={Down}
                        alt="Down"
                        width={20}
                        height={20}
                        />
                    </div>
                    <div
                        className={`dropdown-menu ${
                        bodyPartToggle ? "block" : "hidden"
                        } absolute mt-[10px] py-2 bg-white border w-[100px] border-gray-100 rounded-md shadow-lg`}
                    >
                        {
                            keysBodyPart.map((value: string, idx) => {
                                return(
                                    <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={()=>setBodyPartFilter(value)}
                                    key={idx}
                                    >
                                        {value}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="ml-[5px]" />
                <div
                className="  text-SystemGray3 w-[100px] h-[44px] rounded-[12px] bg-white relative z-10"
                onClick={onTimeSpentToggle}
                >
                    <div className={`flex justify-center items-center h-[44px] rounded-[12px] ${timeSpentFilter!=='전체' && 'bg-SystemSecondaryBrand'}`}>
                        <div className={`${timeSpentFilter!=='전체' && 'text-SystemBrand'}`}>
                            {timeSpentFilter==='전체' ? '시간' : `${timeSpentFilter}`}
                        </div>
                        <div className="px-[3px]"/>
                        <Image
                        src={Down}
                        alt="Down"
                        width={20}
                        height={20}
                        />
                    </div>
                    <div
                        className={`dropdown-menu ${
                        timeSpentToggle ? "block" : "hidden"
                        } absolute mt-[10px] py-2 bg-white border w-[100px] border-gray-100 rounded-md shadow-lg`}
                    >
                        {
                            keysTimeSpentPart.map((value: string, idx) => {
                                return(
                                    <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={()=>setTimeSpentFilter(value)}
                                    key={idx}
                                    >
                                        {value}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div className="">
                    {/* 시간 */}
                </div>
            </div>
            
            <div className="pb-[18px]" />
        {
                exerciseUserList?.map((exercise: exerciseType, idx:number) => {
                    return(
                        <div key={exercise.exerciseId} className="w-full flex justify-center py-[6px]">
                            <ExerciseCard 
                                thumbnail={exercise.thumbnail}
                                title={exercise.title}
                                youtuberName={exercise.youtuberName}
                                time={exercise.timeSpent}
                                bodyPartTypes={exercise.bodyPartTypes}
                                level={exercise.level}
                                calory={exercise.calories}
                                isLiked={exercise.isLiked}
                                exerciseId={exercise.exerciseId}
                                likeFilter={likeFilter}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ExerciseListClient;