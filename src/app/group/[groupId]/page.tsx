'use client'
import { getDataClient } from "@/utils/getDataClient";
import { useState, useEffect } from "react";
import { Check, Uncheck, Partial, Reminder, ChevronLeft } from "@/constant/icon";
import Image from "next/image";
import BasicSecondayButton from "@/components/button/BasicSecondayButton";
import BasicButton from "@/components/button/BasicButton";
import copy from 'copy-to-clipboard';
import { useRouter } from "next/navigation";
import Skeleton from "@/components/common/Skeleton";

interface absenteesType {
    name: string;
    profileImage: string|null;
}
interface memberType {
    userName: string;
    userId: number;
    checkList: string[];
    successNum: number;
}

interface statisticsType {
    day: string;
    date: string;
    statics: staticsType[];
}

interface staticsType {
    name: string;
    userId: number;
    time: number;
}

const GroupId = ({ params }: { params: { groupId: number } }) => {
    const router = useRouter();
    const [absenteesList , setAbsenteesList] = useState<absenteesType[]>();
    const [membersList , setMembersList] = useState<memberType[]>();
    const [statistics , setStatistics] = useState<statisticsType[]>();
    const [groupCode, setGroupCode] = useState<string>('');
    const daysOfWeek = ['월','화','수','목','금','토','일'];
    const today = new Date();
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [checkToggle, setCheckToggle] = useState<boolean>(false);
    const [visibleMembers, setVisibleMembers] = useState<number>(1);

    const handleInvitation = (inviteCode:string) => {
        copy(`http://localhost:3000/invitation/?groupCode=${inviteCode}`);
        alert('초대코드가 복사되었습니다. 초대하고 싶은 멤버에게 공유하세요!')
    }

    const handleToggleClick = () => {
        if (membersList) {
            setCheckToggle(!checkToggle);
            setVisibleMembers(checkToggle ? 1 : membersList.length);
        }
    };

    const handleReminderClick = () => {
        alert()
    }

    useEffect(() => {
        const fetchMyGroupListData = async () => {
          try {
                const resultAbsentee = await getDataClient(`/groups/${params.groupId}/absentees`);
                setLoading1(false) 
                if (resultAbsentee) {
                    console.log(resultAbsentee);
                    setAbsenteesList(resultAbsentee.result.data.absentees);
                    setGroupCode(resultAbsentee.result.data.groupCode);
                }

                const resultMember = await getDataClient(`/groups/${params.groupId}/checklist`);
                setLoading2(false) 
                if (resultMember) {
                    console.log(resultMember);
                    setMembersList(resultMember.result.data);
                }

                const resultStatistics = await getDataClient(`/groups/${params.groupId}/statistics`);
                setLoading3(false) 
                if (resultStatistics) {
                    console.log(resultStatistics);
                    setStatistics(resultStatistics.result.data);
                }
            } catch (error) {
                console.error('Error in fetchData:', error);
            }
        };
        fetchMyGroupListData();
    }, []);

    if (loading1 && loading2 && loading3) return (<div className="pt-[20px] mx-[20px]"><Skeleton /></div>)

    return (
        <div className="flex flex-col items-center">
            <div className="flex px-4 items-center justify-between bg-grayScreen w-full h-[64px] fixed top-0 left-0 right-0">
                <Image 
                alt="ChevronLeft"
                src={ChevronLeft}
                height={24}
                width={24}
                onClick={()=>router.back()}
                />
                <button onClick={()=>handleInvitation(`${groupCode}`)}  className="font-semibold text-[14px] text-SystemBrand">초대하기</button>
            </div>
            <div className="pb-[80px]" />
            <div className="flex w-fixwidth justify-between font-bold text-[18px] pb-[8px]">
                오늘 운동하지 않은 회원
                <div className="text-SystemGray3 text-[14px]">
                    {absenteesList?.length}명
                </div>
            </div>
            <div className="flex flex-row overflow-auto w-screen max-w-[500px] h-auto no-scrollbar">
                <div className="flex flex-row items-center  h-[40px] rounded-[16px] mx-[5%]">
                    {
                        !loading1 && absenteesList?.map((absentee : absenteesType, idx:number) => {
                            return(
                                <div key={idx} className="mx-[6px] w-[80px] h-[40px] bg-SystemSecondaryBrand flex items-center justify-center text-gray-500 rounded-[16px]">
                                    {absentee.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-fixwidth pt-[40px]">
                {
                    !loading2 && membersList?.map((member: memberType, idx: number) => {
                        return(
                            <div key={idx} className={`bg-white flex flex-col justify-between mb-[12px] rounded-[16px] px-[20px] py-[20px] ${idx == 0 ? ' h-[150px]' : 'h-[202px]'}`} style={{ display: idx < visibleMembers ? 'block' : 'none' }}>
                                <div className="flex justify-between flex-row items-stretch">
                                    <div className="font-bold text-[16px]">{member.userName}</div>
                                    <div className="flex text-SystemGray3 flex-row"><div className="text-SystemBrand mr-[4px]">{member.successNum}</div> / 7</div>
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
                                <div className="py-2" />
                                {
                                    idx !== 0 
                                    ?
                                    <BasicSecondayButton text="콕 찌르기" imgSrc={Reminder}/>
                                    :
                                    <div></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                checkToggle ?
                <div className="text-SystemGray3 text-[14px]" onClick={handleToggleClick}>접기</div>
                :
                <div className="text-SystemGray3 text-[14px]" onClick={handleToggleClick}>더보기</div>
            }
            <div className="w-fixwidth font-bold text-[18px] pt-[20px]">
                운동 시간 비교
            </div>
            <div className="flex flex-row overflow-auto w-screen max-w-[500px] h-auto no-scrollbar">
                <div className="flex flex-row items-center h-[277px] rounded-[16px] mx-[5%]">
                    {
                        !loading3 && statistics?.map((info : statisticsType, idx: number) => {
                            return(
                                <div key={idx} className="w-[100px]">
                                    {/* {info.date} */}
                                    차트
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <BasicButton onClick={() => router.push('/exercise')} text="운동하러 가기"/>
            <div className="py-4" />
        </div>
    );
};

export default GroupId;
