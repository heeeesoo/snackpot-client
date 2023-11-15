'use client'
import ExerciseStore from "@/store/ExerciseStore";
import { useEffect, useState, useRef } from "react";
import YouTube, { YouTubeProps } from 'react-youtube';
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/exercise/ProgressBar";
import TokenStore from "@/store/TokenStore";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { ChevronLeftWhite } from "@/constant/icon";
import Image from "next/image";

const Execution = ({ params }: { params: { exerciseId: number } }) => {
    const { videoId, calory, time } = ExerciseStore();
    const [remainingTime, setRemainingTime] = useState(time);
    const timerCheckNumber = useRef<number>(0)

    // remainingTime을 분과 초로 나눕니다.
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    // 분과 초를 "00" 형식으로 변환합니다.
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    
    const router = useRouter();

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
        console.log('ready')
    }

    const onPlayerPlay: YouTubeProps['onPlay'] = (event) => {
        console.log('Video is playing!');
        timerCheckNumber.current += 1
        // 여기에 동영상이 시작됐을 때 수행할 작업 추가
        timerCheck(timerCheckNumber.current)

    };

    const timerCheck = (num : number) => {
        let intervalId: any;
        if(num == 1){
            intervalId = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        // remainingTime이 0보다 작거나 같으면 clearInterval로 interval을 중지합니다.
        if (remainingTime <= 1) {
            clearInterval(intervalId);

            // 시간이 0 이하로 떨어졌을 때 POST 요청을 보냅니다.
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/exercises/finish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    'Authorization': TokenStore.getState().accessToken
                },
                body: JSON.stringify({ exerciseId: params.exerciseId }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('POST 요청 실패');
                }
                // POST 요청이 성공한 경우에 수행할 작업을 여기에 추가하세요.
                console.log('ok');
                router.push(`/exercise/${params.exerciseId}/finish`);
            })
            .catch((error) => {
                console.error('POST 요청 오류:', error);
            });
        }

        // 컴포넌트가 언마운트되거나 다시 렌더링될 때 clearInterval로 interval을 정리합니다.
        return () => clearInterval(intervalId);
    }

    const opts: YouTubeProps['opts'] = {
        width: "100%",
        height: "100%",
        loading: "lazy",
        playerVars: {
            // autoplay: true,
            // rel: 0,
            // modestbranding: 1,
            // controls: 0,
            loop: 1,
            playlist: videoId,
            // mute: 1,
            // start: 3,
            // end: 8
        },
    };

    return (
        <div className="h-screen">
            <div className="text-2xl text-[32px] text-center flex items-center font-bold justify-center w-[50px] h-[56px] text-white mt-4 ml-4 absolute bg-black opacity-80 rounded-[16px] top-0 left-0">
                <div className="w-[130px] justify-center items-center flex" onClick={() => router.back()}>
                <Image
                    src={ChevronLeftWhite}
                    alt="ChevronLeftWhite"
                    height={30}
                    width={30}
                    />
                </div>
            </div>
            <div className="text-2xl text-[32px] text-center flex items-center font-bold justify-center w-[155px] h-[56px] text-white mt-4 mr-4 absolute bg-black opacity-80 rounded-[16px] top-0 right-0">
                <div className="w-[125px] flex items-center justify-center text-center">
                    {formattedMinutes} : {formattedSeconds}
                </div>
            </div>
            <YouTube
                className="h-[100vh]"
                videoId={videoId}
                opts={opts}
                onEnd={(e) => { e.target.stopVideo(0); }}
                onReady={onPlayerReady}
                onPlay={onPlayerPlay}
            />
            {/* <iframe
                className="h-[100vh] w-[100vw]"
                id={videoId}
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com`}
            ></iframe> */}
            {/* <LiteYouTubeEmbed 
                id={videoId} //예시
                title="hey"
                noCookie={true} //default가 false라서 꼭 명시하기
            /> */}
            {/* <div className="w-[100%] absolute bottom-0">
                <ProgressBar time={time}/>
            </div> */}
        </div>
    );
};

export default Execution;
