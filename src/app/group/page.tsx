'use client'
import { useCallback, useEffect, useState } from "react";
import { getDataClient } from "@/utils/getDataClient";
import { Crown, Plus, Create } from "@/constant/icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Skeleton from "@/components/common/Skeleton";
import GroupSkeleton from "@/components/group/GroupSkeleton";
import BasicSecondayButton from "@/components/button/BasicSecondayButton";
import BasicSecondayButton2 from "@/components/button/BasicSecondayButton2";


interface GroupType {
    groupId: number;
    groupName: string;
    startDate: string;
    hostName: string;
    groupNumber: number;
    memberProfileImageList: any[];
}

const Group = () => {
    const [groupMyList, setGroupMyList] = useState<GroupType[]>();
    const [totalNum, setTotalNum] = useState<number>(100);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchMyGroupListData = async () => {
          try {
                const responseData = await getDataClient('/groups?&size=30');
                const responseDataTotalNum = await getDataClient('/members/total-num');
                console.log(responseData)
                console.log('mygrouplist:',responseData.result.data.content);
                console.log('mygrouplist[0]:',responseData.result.data.content[0]);
                setGroupMyList(responseData.result.data.content);
                setTotalNum(responseDataTotalNum.result.data.totalNum)

                // setGroupMyList(responseData.result.data.content);
                // if (responseData !== null) {
                //     setGroupMyList(responseData.result.data.content);
                // }
                  
                // responseData.result.data.content && setGroupMyList(responseData.result.data.content);
                setLoading(false);
            } catch (error) {
                console.error('Error in fetchData:', error);
            }
        };
        fetchMyGroupListData();
    }, []);

    const handleClickCreate = () => {
        router.push('/group/create');
    }

    const handleClickGroup = (groupId : number) => {
        router.push(`/group/${groupId}`);
    }

    if (loading) return (<div className="pt-[20px] mx-[20px]"><GroupSkeleton/></div>)

    return (
        <div className="w-screen max-w-[500px] flex flex-col items-center">
            {
                groupMyList?.length==0 &&
                <div className=" w-fixwidth h-[80vh] flex flex-col justify-center items-center">
                    <Image
                    src={Create}
                    alt="Create"
                    width={120}
                    height={120}
                    />
                    <div className="pt-[20px]"/>
                    <div className="font-bold text-[24px] flex-col justify-center text-center">
                        <div className="flex"><div className="text-SystemBrand">현재 {totalNum}명이 &nbsp;</div> 그룹을 만들어 </div>
                        <div>매일 건강해지고 있어요!</div>
                    </div>
                    <div className="pt-[12px]"/>
                    <div className="text-center text-[14px] text-SystemGray3">
                        유튜브 영상만 보고 운동을 잘 하지 않았다면? <br/>
                        지금 당장 그룹을 만들어 습관을 만들어요!
                    </div>
                    <div className="pt-[36px]"/>
                    <BasicSecondayButton2 text="그룹 만들러가기" onClick={()=>router.push('/group/create')} />
                </div>
            }
            {
                groupMyList?.map((group : GroupType) => {
                    return(
                        <div key={group.groupId} onClick={()=>handleClickGroup(group.groupId)} className="flex px-[20px] py-[20px] flex-col h-[112px] w-fixwidth bg-white mb-[12px] rounded-[16px]">
                            <div className="flex flex-row items-stretch justify-between">
                                <div className="font-bold flex flex-row items-center">
                                    {group.groupName}
                                </div>
                                <div className="flex flex-row items-center text-[12px] text-SystemGray3">
                                    <Image
                                    alt="Crown"
                                    src={Crown}
                                    width={16}
                                    height={16}
                                    className="pr-[4px]"
                                    />
                                    {group.hostName}
                                </div>
                            </div>
                            <div className="text-[12px] text-SystemGray3">
                                {group.startDate} ~
                            </div>
                            <div className="text-[12px] flex items-center flex-row mt-[8px] text-SystemGray3">
                                {/* <div className="flex flex-row mr-[8px] ml-[8px]">
                                {
                                    group.memberProfileImageList!==null && group.memberProfileImageList.map((image:string, idx:number) => {
                                        return(
                                            <div key={idx} className="w-[24px] h-[24px] relative ml-[-8px]">
                                                {
                                                    idx < 8 ?
                                                    <Image
                                                    src={image}
                                                    alt="profileimage"
                                                    className="rounded-full border-2 border-white"
                                                    layout='fill'
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                    />
                                                    :
                                                    <div></div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                </div> */}
                                {group.groupNumber}명
                            </div>
                        </div>
                    )
                })
            }
            <div className="fixed bottom-[100px] rounded-full right-4" onClick={handleClickCreate}>
                <button className="bg-SystemBrand shadow-2xl hover:bg-blue-700 text-center flex items-center justify-center text-[40px] h-[56px] w-[56px] text-white font-bold rounded-full">
                    <Image
                    alt="plus"
                    src={Plus}
                    width={24}
                    height={24}
                    />
                </button>
            </div>
        </div>
    );
};

export default Group;