const ExerciseId = ({ params }: { params: { exerciseId: string } }) => {
    return (
        <div>
            {params.exerciseId}
        </div>
    );
};

export default ExerciseId;