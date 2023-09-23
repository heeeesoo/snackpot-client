'use client'
import { useCallback, useEffect, useState } from "react";
import { getDataClient } from "@/utils/getDataClient";

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
        <div>
            Group
            {
                groupMyList?.map((group : GroupType) => {
                    return(
                        <div key={group.groupNumber}>
                            {group.groupName}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Group;