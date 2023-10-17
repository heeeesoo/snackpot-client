'use client'
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { getDataClient } from "@/utils/getDataClient";

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

const Test: NextPage = () => {
    const [exerciseUserList, setExerciseUserList] = useState<exerciseType[]>([]);
    const cursorIdRef = useRef<number>(40);
    const target = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<{ isLoading: boolean }>({
        isLoading: false
    });
    const fetchexerciseUserList = async (like:boolean, bodyPartTypes:string, size:number, level:string, timeSpent:number) => {
        try {
            let apiURL:string = `/exercises?size=${size}`;
            const cursorId = cursorIdRef.current;
            cursorIdRef.current -= size;
            if (like === true) {
                apiURL += `&like=true`;
            }
            apiURL += `&cursorId=${cursorId}`;
            console.log(apiURL);
            const resultexerciseUserList = await getDataClient(apiURL);

            const updatedExerciseUserList = resultexerciseUserList?.result.data.content || [];
            setExerciseUserList((prevExerciseUserList) => [...prevExerciseUserList, ...updatedExerciseUserList]);

            console.log('testlist1:', updatedExerciseUserList);
            console.log('testlist2:', exerciseUserList);
        } catch (error) {
            console.log('error:', error);
        }
    }
    const fetchItems = async () => {
        let cursorId = cursorIdRef.current
        setState((prev) => ({
        isLoading: true
        }));
        await fakeFetch();
        await fetchexerciseUserList(false,'전체',10,'level',10);
        setState((prev) => ({
        isLoading: false
        }));
    };
    
    useEffect(() => {
        let observer: IntersectionObserver;
        if (target) {
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
          observer.observe(target.current as Element);
        }
        return () => observer.disconnect();
    }, [target]);

    const { isLoading } = state;

    return (
        <div>
        {
            exerciseUserList.map((value, id) => {
                return(
                    <div key={id}>
                        {value.exerciseId}
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

export default Test;