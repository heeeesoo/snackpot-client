'use client'
import ExerciseCard from "./ExerciseCard";
import { getDataClient } from "@/utils/getDataClient";
import { useEffect, useState, useRef } from "react";
import UserStore from "@/store/UserStore";
import Skeleton from '@/components/common/Skeleton';
import { LikeGray, LikeBlue, Down } from "@/constant/icon";
import Image from "next/image";
import TokenStore from "@/store/TokenStore";
import CategoryDropDown from "../common/CategoryDropDown";

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
interface exerciseListType {
    exerciseList : exerciseType[];
}

const fakeFetch = (delay = 1000) =>
    new Promise((res) => setTimeout(res, delay));

const ExerciseListClient = () => {
    const bodyPartList: { [key: string]: string } = {'전체':'ALL', '전신':'FULL_BODY', '상체':'UPPER_BODY', '하체':'LOWER_BODY', '코어':'CORE', '팔':'ARMS', '다리':'LEGS', '등':'BACK', '가슴':'CHEST', '어깨':'SHOULDERS'};
    const keysBodyPart = Object.keys(bodyPartList);
    const [exerciseUserList, setexerciseUserList] = useState<exerciseType[]>([]);
    const [loading, setLoading] = useState(true);
    const {isLoggedIn} = UserStore();
    const [likeFilter, setLikeFilter] = useState<boolean>(false);
    const [bodyPartFilter, setBodyPartFilter] = useState<string>('전체');
    const [bodyPartToggle, setBodyPartToggle] = useState<boolean>(false);
    const onBodyPartToggle = () => setBodyPartToggle(!bodyPartToggle);

    // 무한 스크롤
    const cursorIdRef = useRef<number>(40);
    const target = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<{ isLoading: boolean }>({
        isLoading: false
    });
    

    const fetchexerciseUserList = async (like:boolean,bodyPartTypes:string,size:number,level:string,timeSpent:number,cursor:boolean) => {
        try{
            let apiURL:string = `/exercises?size=${size}`;
            if(like === true){
                apiURL+=`&like=true`
            }
            if(bodyPartTypes !== '전체'){
                console.log(bodyPartList[bodyPartTypes])
                apiURL+=`&bodyPartTypes=${bodyPartList[bodyPartTypes]}`
            }
            if(cursor == true){
                const cursorId = cursorIdRef.current;
                cursorIdRef.current -= size;
                apiURL += `&cursorId=${cursorId}`;
            }

            console.log(apiURL)
            const resultexerciseUserList = await getDataClient(apiURL);
            
            setLoading(false);
            const updatedExerciseUserList = resultexerciseUserList?.result.data.content || [];

            if(cursor == true){
                setexerciseUserList((prevExerciseUserList) => [...prevExerciseUserList, ...updatedExerciseUserList]);
            }else{
                setexerciseUserList(updatedExerciseUserList)
            }

            console.log('testlist1:', updatedExerciseUserList);
            console.log('testlist2:', exerciseUserList);
        }catch (error){
            console.log('error:', error);
        }
    }

    useEffect(()=>{
        fetchexerciseUserList(false,'전체',10,'level',10,false);
    },[])

    useEffect(()=>{
        if(likeFilter){
            console.log('likeFilter:',likeFilter)
            fetchexerciseUserList(true,bodyPartFilter,10,'level',10,false)
        }else{
            fetchexerciseUserList(false,bodyPartFilter,10,'level',10,false)
        }
    },[bodyPartFilter, likeFilter])

    const fetchItems = async () => {
        setState((prev) => ({
        isLoading: true
        }));
        await fakeFetch();
        await fetchexerciseUserList(false,'전체',10,'level',10,true);
        setState((prev) => ({
        isLoading: false
        }));
    };

    useEffect(() => {
        let observer: IntersectionObserver;
        if (target.current) { // target이 null이 아닌 경우에만 IntersectionObserver 초기화
          observer = new IntersectionObserver(
            async ([e], observer) => {
              if (e.isIntersecting) {
                observer.unobserve(e.target);
                if (cursorIdRef.current >= 0 ) { // 0 이상인 경우에만 fetchItems 실행
                    console.log('cursorIdRef:',cursorIdRef.current)
                    await fetchItems();
                }
                observer.observe(e.target);
              }
            },
            { threshold: 1 }
          );
          observer.observe(target.current);
        }
        return () => observer?.disconnect();
    }, [target]);
    

    const { isLoading } = state;

    if (loading) return(<div className='pt-[20px] mx-[20px]'><Skeleton /></div>)

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-fixwidth">
                <div className={`${likeFilter ? 'bg-SystemSecondaryBrand' : 'bg-white'} flex rounded-[12px] items-center justify-center w-[44px] h-[44px]`} onClick={()=>setLikeFilter(prev=>!prev)}>
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
                    } absolute mt-[10px] py-2 bg-white border w-[100px] border-gray-300 rounded-md shadow-lg`}
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
            <div
                style={{
                textAlign: "center",
                lineHeight: 5,
                fontSize: "2rem",
                border: "1px solid black",
                height: 200,
                background: "#eee"
                }}
            >
                Loading...
            </div>
            )}
            </div>
        </div>
    );
};

export default ExerciseListClient;