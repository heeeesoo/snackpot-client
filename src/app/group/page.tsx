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
import UserStore from "@/store/UserStore";
import { deleteDataClient } from "@/utils/deleteDataClient";
import Modal from "@/components/common/Modal";

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
    const {username} = UserStore();
    const [userAgent, setUserAgent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 User-Agent 정보를 가져옴
        setUserAgent(window.navigator.userAgent);
        if(hasKakaoTalk(userAgent)){
            openModal()
        }
    }, []);

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

    const hasKakaoTalk = (userAgentString : string) => {
        // 문자열에 'KAKAOTALK'이 포함되어 있는지 확인
        return userAgentString.includes('KAKAOTALK');
    }

    const handleClickGroup = async (groupId : number, e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.id === 'delete' || target.alt === 'delete'){
            console.log('delete');
            try {
                const responseData = await deleteDataClient(`/groups/${groupId}`)
                console.log('delete:',responseData)
                if(responseData.success === true){
                    alert('그룹이 삭제되었습니다.');
                    location.reload();
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            router.push(`/group/${groupId}`);
        }
    }

    if (loading) return (<div className="pt-[20px] mx-[20px]"><GroupSkeleton/></div>)

    return (
        <div className="w-screen max-w-[500px] flex flex-col items-center">
            {userAgent}
            {hasKakaoTalk(userAgent) ? 
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p>앱 다운로드하기</p>
            </Modal>
            : 'diff'}
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
                        <div key={group.groupId} onClick={(e)=>handleClickGroup(group.groupId, e)} className="flex px-[20px] py-[20px] flex-col h-[112px] w-fixwidth bg-white mb-[12px] rounded-[16px]">
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
                            <div className="text-[12px] justify-between flex items-center flex-row mt-[8px] text-SystemGray3">
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
                                <div>{group.groupNumber}명</div>
                                <div>
                                    {
                                    username === group.hostName?
                                    <button className="border-2 border-SystemGray4 w-[60px] rounded-md h-[20px] flex items-center justify-center text-center" id="delete">그룹 삭제</button>
                                    :
                                    <div></div>
                                    }
                                </div>
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