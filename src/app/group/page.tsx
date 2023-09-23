'use client'
import { useCallback, useEffect, useState } from "react";
import { getDataClient } from "@/utils/getDataClient";

interface GroupType {

}

const Group = () => {
    const [groupMyList, setGroupMyList] = useState<any>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMyGroupListData = async () => {
          try {
                const result = await getDataClient('/groups');
                console.log('mygrouplist:',result);
                result && setGroupMyList(result);
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
        </div>
    );
};

export default Group;