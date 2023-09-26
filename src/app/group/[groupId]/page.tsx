'use client'
import { getDataClient } from "@/utils/getDataClient";
import { useState, useEffect } from "react";
import { Check, Uncheck, Partial, Reminder } from "@/constant/icon";
import Image from "next/image";
import BasicSecondayButton from "@/components/button/BasicSecondayButton";

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
    const daysOfWeek = ['월','화','수','목','금','토','일'];
    const today = new Date();
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

    console.log(today.getDay())

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
            <div className="w-fixwidth pt-[20px]">
                {
                    !loading2 && membersList?.map((member: memberType, idx: number) => {
                        return(
                            <div key={idx} className="bg-white flex flex-col justify-between mb-[12px] rounded-[16px] px-[20px] py-[20px] h-[202px]">
                                <div className="flex justify-between flex-row items-stretch">
                                    <div>{member.userName}</div>
                                    <div>{member.consecutiveDays}/7</div>
                                </div>
                                <div className="flex justify-between items-stretch">
                                    {
                                        member.checkList.map((check:string, idx:number) => {
                                            return(
                                                <div key={idx} className={`w-full ${idx === today.getDay()-1 ? 'border border-SystemGray6' : ''} h-[70px] rounded-[16px] justify-center flex flex-col items-center`}>
                                                    <div className="text-SystemGray4 mb-[8px] text-[12px]">
                                                        {daysOfWeek[idx]}
                                                    </div>
                                                    {
                                                        check === 'CHECK' ?
                                                        <div className="rounded-full flex items-center justify-center bg-SystemBrand w-[32px] h-[32px]">
                                                            <Image
                                                            src={Check}
                                                            alt="Check"
                                                            width={16}
                                                            height={16}
                                                            />
                                                        </div>
                                                        :
                                                        check === 'UNCHECK' ?
                                                        <div className="rounded-full flex items-center justify-center bg-white w-[32px] h-[32px]">
                                                            <Image
                                                            src={Uncheck}
                                                            alt="Check"
                                                            width={16}
                                                            height={16}
                                                            />
                                                        </div>
                                                        :
                                                        <div className="rounded-full flex items-center justify-center bg-SystemSecondaryBrand w-[32px] h-[32px]">
                                                            <Image
                                                            src={Partial}
                                                            alt="Check"
                                                            width={16}
                                                            height={16}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <BasicSecondayButton text="콕 찌르기" imgSrc={Reminder}/>
                            </div>
                        )
                    })
                }
            </div>
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
