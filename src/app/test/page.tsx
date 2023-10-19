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
    const [exerciseUserList, setExerciseUserList] = useState<exerciseType[]>([]);
    const exerciseLastIdRef = useRef<number>(60);
    const target = useRef<HTMLDivElement>(null);
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
                console.log('ADD LIKE')
            }
            if(bodyPartTypes !== '전체'){
                console.log(bodyPartList[bodyPartTypes])
                apiURL+=`&bodyPartTypes=${bodyPartList[bodyPartTypes]}`
            }
            if(exerciseLastIdRef.current > 0 && like==false) {
                apiURL += `&cursorId=${exerciseLastIdRef.current}`;
            }
            console.log(apiURL, bodyPartFilter);
            const resultexerciseUserList = await getDataClient(apiURL);
            const updatedExerciseUserList = resultexerciseUserList?.result.data.content || [];
            if(cursor){
                setExerciseUserList((prevExerciseUserList) => [...prevExerciseUserList, ...updatedExerciseUserList]);
            }else{
                setExerciseUserList(updatedExerciseUserList)
            }
            
            if(likeFilterNum.current % 2 == 1){
                setExerciseUserList(updatedExerciseUserList)
            }

            console.log('testlist0:', resultexerciseUserList);
            console.log('testlist1:', updatedExerciseUserList);
            console.log('testlist1-2:', updatedExerciseUserList[updatedExerciseUserList.length - 1].exerciseId);
            exerciseLastIdRef.current = updatedExerciseUserList[updatedExerciseUserList.length - 1].exerciseId - 1;
            console.log('testlist2:', exerciseUserList);
        } catch (error) {
            console.log('error:', error);
        }
    }

    const fetchItems = async () => {
        setState((prev) => ({
        isLoading: true
        }));
        await fakeFetch();
        console.log('fetch:',bodyPartFilter)
        await fetchexerciseUserList(false,bodyPartFilter,10,'level',10, true);
        setState((prev) => ({
        isLoading: false
        }));
    };

    useEffect(()=>{
        fetchexerciseUserList(false,bodyPartFilter,10,'level',10, true);
    },[])

    useEffect(() => {
        console.log('!!!!!!!!:',likeFilter);
        if(likeFilter){
            console.log('YES')
            fetchexerciseUserList(true,bodyPartFilter,10,'level',10, true);
        }
    },[likeFilter])

    useEffect(()=>{
        if(likeFilter){
            console.log('likeFilter:',likeFilter)
            fetchexerciseUserList(true,bodyPartFilter,10,'level',10, false)
        }else{
            fetchexerciseUserList(false,bodyPartFilter,10,'level',10, false)
        }
    },[bodyPartFilter, likeFilter])
    
    useEffect(() => {
        let observer: IntersectionObserver;
        if (target) {
          observer = new IntersectionObserver(
            async ([e], observer) => {
              if (e.isIntersecting) {
                observer.unobserve(e.target);
                if (exerciseLastIdRef.current > 0) { // 0 이상인 경우에만 fetchItems 실행
                    console.log('fetchItem:',bodyPartFilter)
                    await fetchItems();
                }
                observer.observe(e.target);
              }
            },
            { threshold: 1 }
          );
          observer.observe(target.current as Element);
        }
        return () => observer.disconnect();
    }, [target]);

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
                
                {/* <CategoryDropDown /> */}

                <div className="">
                    {/* 시간 */}
                </div>
            </div>
            
            <div className="pb-[18px]" />
        {
                exerciseUserList?.map((exercise: exerciseType, idx:number) => {
                    return(
                        <div key={idx} className="w-full flex justify-center py-[6px]">
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
        <div ref={target}>
            {isLoading && (
            <div role="status" className="h-[59px] flex justify-center items-center">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
            )}
        </div>
        </div>
    );
};

export default ExerciseListClient;