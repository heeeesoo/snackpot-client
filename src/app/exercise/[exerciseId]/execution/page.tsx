'use client'
import ExerciseStore from "@/store/ExerciseStore";
import { useEffect, useState } from "react";
import YouTube from 'react-youtube';

const Execution = ({ params }: { params: { exerciseId: number } }) => {
    const { videoId, calory, time } = ExerciseStore();
    const [remainingTime, setRemainingTime] = useState(time);

    useEffect(() => {
        // 1초마다 remainingTime을 1초씩 감소시킵니다.
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        // remainingTime이 0보다 작거나 같으면 clearInterval로 interval을 중지합니다.
        if (remainingTime <= 0) {
            clearInterval(intervalId);

            // 시간이 0 이하로 떨어졌을 때 POST 요청을 보냅니다.
            fetch(`${process.env.NEXT_PUBLIC_TEST_SERVER_URL}/exercise/finish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exerciseId: params.exerciseId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('POST 요청 실패');
                    }
                    // POST 요청이 성공한 경우에 수행할 작업을 여기에 추가하세요.
                    console.log('ok')
                })
                .catch((error) => {
                    console.error('POST 요청 오류:', error);
                });
        }

        // 컴포넌트가 언마운트되거나 다시 렌더링될 때 clearInterval로 interval을 정리합니다.
        return () => clearInterval(intervalId);
    }, [params.exerciseId, remainingTime]);

    return (
        <div className="h-screen ">
            <div className="text-2xl mt-4">Time Remaining: {remainingTime} seconds</div>
            <YouTube
                className="h-[90vh]"
                videoId={videoId}
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1,
                        rel: 0,
                        modestbranding: 1,
                        controls: 0,
                        loop: 1,
                        playlist: videoId,
                        mute: 1,
                    },
                }}
                onEnd={(e) => { e.target.stopVideo(0); }}
            />
        </div>
    );
};

export default Execution;
