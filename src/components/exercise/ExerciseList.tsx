'use client'
import ExerciseCard from "./ExerciseCard";
import { getDataClient } from "@/utils/getDataClient";
import { useEffect, useState } from "react";
import UserStore from "@/store/UserStore";
import Skeleton from '@/components/common/Skeleton';
import { LikeGray, LikeBlue } from "@/constant/icon";
import Image from "next/image";

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

const ExerciseList = ({
    exerciseList
} : exerciseListType) => {
    console.log('exerciseList-comp:',exerciseList)
    const [exerciseUserList, setexerciseUserList] = useState<any>();
    const [loading, setLoading] = useState(true);
    const {isLoggedIn} = UserStore();

    useEffect(()=>{
        const fetchexerciseUserList = async () => {
            try{
                const resultexerciseUserList = await getDataClient(`/exercises?cursorId=0&like=true&level=EASY&timeSpent=0&size=5`);
                setLoading(false);
                resultexerciseUserList && setexerciseUserList(resultexerciseUserList.result.data.content);
                console.log('login exercise list1:',resultexerciseUserList.result.data.content)
                console.log('login exercise list2:',exerciseUserList)
            }catch (error){
                console.log('error:', error);
            }
        }
        isLoggedIn && fetchexerciseUserList();
    },[])

    // if (loading) return(<div className='pt-[20px] mx-[20px]'><Skeleton /></div>)

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-fixwidth">
                <div className="">
                    <Image 
                    src={LikeBlue}
                    width={20}
                    height={20}
                    alt="LikeBlue"
                    />
                </div>
                <div className="">
                    운동 부위
                </div>
                <div className="">
                    시간
                </div>
            </div>
            {
                isLoggedIn ?
                    !loading ?
                    exerciseUserList.map((exercise: exerciseType, idx:number) => {
                        return(
                            <div key={idx} className="w-full flex justify-center py-[6px]">
                                <ExerciseCard 
                                    thumbnail={exercise.thumbnail}
                                    title={exercise.title}
                                    youtuberName={exercise.youtuberName}
                                    time={exercise.timeSpent}
                                    // bodyPartTypes={exercise.bodyPartTypes}
                                    level={exercise.level}
                                    calory={exercise.calories}
                                    isLiked={exercise.isLiked}
                                    exerciseId={exercise.exerciseId}
                                />
                            </div>
                        )
                    })
                    :
                    <div>skeleton</div>
                :
                    exerciseList.map((exercise : exerciseType, idx: number) => {
                        return(
                            <div key={idx} className="w-full flex justify-center py-[6px]">
                                <ExerciseCard 
                                    thumbnail={exercise.thumbnail}
                                    title={exercise.title}
                                    youtuberName={exercise.youtuberName}
                                    time={exercise.timeSpent}
                                    // bodyPartTypes={exercise.bodyPartTypes}
                                    level={exercise.level}
                                    calory={exercise.calories}
                                    isLiked={exercise.isLiked}
                                    exerciseId={exercise.exerciseId}
                                />
                            </div>
                        )
                    })
            }
        </div>
    );
};

export default ExerciseList;