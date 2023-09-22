'use client'
import ExerciseStore from "@/store/ExerciseStore";
import { useEffect } from "react";

interface ExerciseStoreType {
    videoId: string;
    calory: number;
    time: number;
} 

const ExerciseStoreCard = ({
    videoId,
    calory,
    time
} : ExerciseStoreType) => {
    const {setExercise, removeExercise} = ExerciseStore();
    useEffect(() => {
        setExercise(videoId, calory, time);
        console.log('hi')
    },[])
    return (
        <div>
        </div>
    );
};

export default ExerciseStoreCard;