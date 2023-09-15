async function getReveiwData(exerciseId : number) {
    try {
        const apiURL = process.env.NEXT_PUBLIC_TEST_SERVER_URL
        console.log(`${apiURL}/exercises/${exerciseId}/reviews`)
        const res = await fetch(`${apiURL}/exercises/${exerciseId}/reviews`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            cache: 'no-store'
        });

        if (!res.ok) {
          console.log('Error:', res.status, res.statusText);
          throw new Error('Failed to fetch data');
        }
        
        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

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
    userProfileImg: string;
    createdAt: string;
    content: string;
}

export default async function ReviewList({
    exerciseId
}:ReviewListType){
    const reveiwData : ReveiwListType = await getReveiwData(exerciseId)
    console.log(reveiwData)
    return (
        <div className="">
            <div className="font-bold pb-[12px]">
                리뷰
            </div>
            <div className="flex flex-row overflow-auto w-screen max-w-[400px] h-auto no-scrollbar">
                <section className="flex flex-row mr-fixmargin">
                    {
                        reveiwData.reviews.map((review : ReviewDataType, idx : number) => {
                            return (
                                <button key={idx} className="text-left justify-between flex flex-col py-[20px] px-[20px] w-[240px] mr-[15px] bg-white rounded-[16px] h-[172px]">
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
                </section>
            </div>
        </div>
    );
};
