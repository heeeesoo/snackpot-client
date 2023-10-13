'use client'
import { getDataClient } from "@/utils/getDataClient";
import { useState, useEffect } from "react";
// async function getReveiwData(exerciseId : number) {
//     try {
//         const apiURL = process.env.NEXT_PUBLIC_SERVER_URL
//         const res = await fetch(`${apiURL}/reviews/exercises/${exerciseId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Accept": "application/json",
//             },
//             cache: 'no-store'
//         });

//         if (!res.ok) {
//           console.log('Error:', res.status, res.statusText);
//           throw new Error('Failed to fetch data');
//         }
        
//         const data = await res.json();
//         return data;

//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

interface ReviewListType {
    exerciseId : number;
}

interface ReveiwListType {
    totalReviewNum: number;
    reviews: ReviewDataType[];
}

interface ReviewDataType {
    reviewId: number;
    userName: string;
    userProfileImg: string | null;
    createdAt: string;
    content: string;
}

export default function ReviewList({
    exerciseId
}:ReviewListType){
    // const reveiwData : ReveiwListType = await getReveiwData(exerciseId)
    const [loading, setLoading] = useState(true);
    const [reviewData, setReviewData] = useState<ReviewDataType[]>();

    const fetchReviewData = async () => {
        try{
            let apiURL:string = `/reviews/exercises/${exerciseId}?size=10`;
            const resultReviewData = await getDataClient(apiURL);
            setLoading(false);
            resultReviewData && setReviewData(resultReviewData.result.data.reviews.content);
            console.log('review1:',resultReviewData.result.data.reviews.content)
        }catch (error){
            console.log('error:', error);
        }
    }

    useEffect(() => {
        fetchReviewData();
    },[])

    return (
        <div className="">
            <div className="font-bold pb-[12px]">
                리뷰
            </div>
            <div className="flex flex-row overflow-auto w-[90vw] max-w-[485px] h-auto no-scrollbar">
                <section className="flex flex-row ">
                    {
                        reviewData?.length==0 &&
                        <div className=" text-SystemGray3">
                            아직 리뷰가 없어요!
                        </div>
                    }
                    <div className="flex mr-[15px]">
                        {
                            reviewData?.map((review : ReviewDataType, idx : number) => {
                                return (
                                    <button key={idx} className="text-left justify-between flex flex-col py-[20px] px-[20px] mr-[15px] w-[240px] bg-white rounded-[16px] h-[172px]">
                                        <div className="text-[14px] text-SystemGray1 font-normal">
                                            {review.content}
                                        </div>
                                        <div>
                                            {review.userName}
                                        </div>
                                    </button>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </div>
    );
};
