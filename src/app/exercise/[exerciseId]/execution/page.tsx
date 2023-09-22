'use client'
import ExerciseStore from "@/store/ExerciseStore";
import YouTube from 'react-youtube';

const Execution = ({ params }: { params: { exerciseId: number } }) => {

    const {videoId, calory, time} = ExerciseStore();
    return (
        <div className="h-screen bg-black">
            Execution {params.exerciseId}
            <YouTube
            className="h-[90vh]"
                videoId={videoId}
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1, //자동재생 O
                        rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                        modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                        controls: 0, // 동영상 플레이어 컨트롤을 표시
                        loop: 1,
                        playlist: videoId, 
                        mute: 1, // 음소거 설정
                    },
                }}
                //이벤트 리스너 
                onEnd={(e)=>{e.target.stopVideo(0);}}      
                />
        </div>
    );
};

export default Execution;