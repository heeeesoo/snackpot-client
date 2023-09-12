import ExerciseCard from "./ExerciseCard";

interface exerciseType {
    thumbnail: string;
    title: string;
    youtuberName: string;
    time: number;
    bodyPart: string; 
    level: string;
    calory: number;
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
    return (
        <div className="flex flex-col items-center">
            {
                exerciseList.map((exercise : exerciseType, idx: number) => {
                    return(
                        <div key={idx} className="w-full flex justify-center py-[6px]">
                            <ExerciseCard 
                                thumbnail={exercise.thumbnail}
                                title={exercise.title}
                                youtuberName={exercise.youtuberName}
                                time={exercise.time}
                                bodyPart={exercise.bodyPart}
                                level={exercise.level}
                                calory={exercise.calory}
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