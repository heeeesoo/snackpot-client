import ExerciseCard from "./ExerciseCard";

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