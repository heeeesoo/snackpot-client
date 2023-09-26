'use client'
import { getDataClient } from "@/utils/getDataClient";
import { useState, useEffect } from "react";

interface memberType {
    userName: string;
    userId: number;
    checkList: string[];
    consecutiveDays: number;
}

interface statisticsType {
    userName: string;
    userId: number;
    accumulativeTime: number;
}

const GroupId = ({ params }: { params: { groupId: number } }) => {
    const [absenteesList , setAbsenteesList] = useState<string[]>();
    const [membersList , setMembersList] = useState<memberType[]>();
    const [statistics , setStatistics] = useState<statisticsType[]>();
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    useEffect(() => {
        const fetchMyGroupListData = async () => {
          try {
                const resultAbsentee = await getDataClient(`/groups/${params.groupId}/absentees`);
                setLoading1(false) 
                if (resultAbsentee) {
                    setAbsenteesList(resultAbsentee.usernames);
                }

                const resultMember = await getDataClient(`/groups/${params.groupId}/members`);
                setLoading2(false) 
                if (resultMember) {
                    setMembersList(resultMember.memberList);
                }

                const resultStatistics = await getDataClient(`/groups/${params.groupId}/statistics`);
                setLoading3(false) 
                if (resultStatistics) {
                    setStatistics(resultStatistics.statistics);
                }
            } catch (error) {
                console.error('Error in fetchData:', error);
            }
        };
        fetchMyGroupListData();
    }, []);

    if (loading1 && loading2 && loading3) return (<div className="pt-[20px] mx-[20px]">loading</div>)

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-fixwidth justify-between font-bold text-[18px] pb-[8px]">
                오늘 운동하지 않은 회원
                <div className="text-SystemGray3 text-[14px]">
                    {absenteesList?.length}명
                </div>
            </div>
            <div className="flex flex-row overflow-auto w-screen max-w-[500px] h-auto no-scrollbar">
            <div className="flex flex-row items-center  h-[40px] rounded-[16px] mx-[5%]">
                {
                    !loading1 && absenteesList?.map((absentee : string, idx:number) => {
                        return(
                            <div key={idx} className="mx-[6px] w-[80px] h-[40px] bg-SystemBrand flex items-center justify-center text-white rounded-[16px]">
                                {absentee}
                            </div>
                        )
                    })
                }
            </div>
            </div>

            {
                !loading2 && membersList?.map((member: memberType, idx: number) => {
                    return(
                        <div key={idx}>
                            {member.userName}
                        </div>
                    )
                })
            }
            {
                !loading3 && statistics?.map((info : statisticsType, idx: number) => {
                    return(
                        <div key={idx}>
                            {info.accumulativeTime}
                        </div>
                    )
                })
            }

        </div>
    );
};

export default GroupId;
