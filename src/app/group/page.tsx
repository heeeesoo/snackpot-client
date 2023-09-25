'use client'
import { useCallback, useEffect, useState } from "react";
import { getDataClient } from "@/utils/getDataClient";
import { Crown } from "@/constant/icon";
import Image from "next/image";

interface GroupType {
    groupName: string;
    groupId: number;
    hostName: string;
    startDate: string;
    groupNumber: number;
}

const Group = () => {
    const [groupMyList, setGroupMyList] = useState<GroupType[]>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMyGroupListData = async () => {
          try {
                const result = await getDataClient('/groups');
                console.log('mygrouplist:',result.groupList);
                result && setGroupMyList(result.groupList);
                setLoading(false);
            } catch (error) {
                console.error('Error in fetchData:', error);
            }
        };
        fetchMyGroupListData();
    }, []);

    if (loading) return (<div className="pt-[20px] mx-[20px]">loading</div>)

    return (
        <div className="w-screen max-w-[500px] flex flex-col items-center">
            {
                groupMyList?.map((group : GroupType) => {
                    return(
                        <div key={group.groupNumber} className="flex px-[20px] py-[20px] flex-col h-[112px] w-fixwidth bg-white mb-[12px] rounded-[16px]">
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
                                {group.startDate}
                            </div>
                            <div className="text-[12px] text-SystemGray3">
                                {group.groupNumber}명
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Group;