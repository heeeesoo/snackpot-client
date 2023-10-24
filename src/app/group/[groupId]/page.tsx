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
import TokenStore from "@/store/TokenStore";
import UserStore from "@/store/UserStore";
import GroupChart from "@/components/group/GroupChart";
import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCj8cmzn94XS6HfqVXvMnmRvSH66LcrblQ",
    authDomain: "snackpot-2aff6.firebaseapp.com",
    projectId: "snackpot-2aff6",
    storageBucket: "snackpot-2aff6.appspot.com",
    messagingSenderId: "772201837506",
    appId: "1:772201837506:web:b594806bf50b8f72e89c5b",
    measurementId: "G-RBMVKFLVBN"
};

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
    // fcm token
    const [fcmToken, setFcmToken] = useState<string>('')
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    const getToken = async() => {
        const messaging = firebase.messaging();
        const token = await messaging.getToken({
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

        return token;
    }

    const getMessageToken = async() => {
        const token = await getToken();
        setFcmToken(token);
        const msg = `gettoken : ${token}`
        alert(msg)
    }

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
    const [visibleMembers, setVisibleMembers] = useState<boolean>(false);
    const [visibleStatistics, setVisibleStatistics] = useState<number>(0);
    const {userid} = UserStore();

    const handleInvitation = (inviteCode:string) => {
        copy(`https://snackpot-client.vercel.app/invitation/?groupCode=${inviteCode}`);
        alert('초대코드가 복사되었습니다. 초대하고 싶은 멤버에게 공유하세요!')
    }

    const handleToggleClick = () => {
        if (membersList) {
            setCheckToggle(!checkToggle);
            setVisibleMembers(checkToggle ? false : true);
        }
    };

    const submitFCMToken = async () => {
        try {
            getMessageToken();
            // const apiURL = process.env.NEXT_PUBLIC_SERVER_URL;
            // const formDataToSend = {
            //     fcmToken: fcmToken
            // };
            // const response = await fetch(`${apiURL}/notification`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "Accept": "application/json",
            //         'Authorization': TokenStore.getState().accessToken
            //     },
            //     body: JSON.stringify(formDataToSend),
            // });
            // const responseData = await response.json();
            // if (!response.ok){
            //     console.log('error');
            //     alert(responseData.result.message);
            // } else {
            //     console.log('token submit ok')
            // }
        } catch (error) {
            alert(error)
        }
    }

    const handleReminderClick = async (toUserId : number) => {        
        try {
            submitFCMToken();
            const apiURL = process.env.NEXT_PUBLIC_SERVER_URL;
            const formDataToSend = {
                groupId: params.groupId,
                toUserId: toUserId
            };
            const response = await fetch(`${apiURL}/notification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    'Authorization': TokenStore.getState().accessToken
                },
                body: JSON.stringify(formDataToSend),
            });
            const responseData = await response.json();
            if (!response.ok){
                console.log('error');
                alert(responseData.result.message);
            } else {
                console.log('okreminder');
                alert('콕 찌르기 성공!');
            }
        } catch (error) {
            alert(error)
        }
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

    console.log(statistics?.[visibleStatistics].statics)

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
                <div className="flex flex-row items-center h-[40px] rounded-[16px] mx-[5%]">
                    {
                        (!loading1 && absenteesList?.length==0) &&
                        <div className="flex w-full text-center items-center justify-center text-SystemGray3">
                            모든 회원이 오늘 운동을 완료했어요!
                        </div>
                    }
                    {
                        !loading1 && absenteesList?.map((absentee : absenteesType, idx:number) => {
                            return(
                                <div key={idx} className="flex-col justify-around mx-[6px] w-[100px] h-[40px] bg-white flex items-center text-gray-500 rounded-[16px]">
                                    {absentee.name}
                                    {/* <button onClick={()=>handleReminderClick(idx)} className="h-[30px] w-[80px] rounded-[16px] flex items-center font-semibold text-[12px] text-SystemBrand justify-center  bg-SystemSecondaryBrand">
                                        <Image
                                        src={Reminder}
                                        alt="Reminder"
                                        width={16}
                                        height={16}
                                        />
                                        콕 찌르기
                                    </button> */}
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
                            <div key={idx} className={`bg-white flex flex-col justify-between mb-[12px] rounded-[16px] px-[20px] py-[20px] h-[150px]`} style={{ display: member.userId==userid ? 'block' : 'none' }}>
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
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-fixwidth pt-[20px]">
                {
                    !loading2 && membersList?.map((member: memberType, idx: number) => {
                        return(
                            <div key={idx} className={`bg-white flex flex-col justify-between mb-[12px] rounded-[16px] px-[20px] py-[20px] h-[202px]`} style={{ display: member.userId!=userid && visibleMembers ? 'block' : 'none' }}>
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
                                <BasicSecondayButton onClick={()=>handleReminderClick(member.userId)} text="콕 찌르기" imgSrc={Reminder}/>
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
            <div className="w-fixwidth flex flex-col font-bold text-[18px] pt-[20px]">
                운동 시간 비교
                <div className="flex flex-row justify-around items-center bg-white mt-[12px] h-[40px] rounded-[20px]">
                {
                    daysOfWeek.map((day:string,idx:number)=>{
                        return(
                            <div key={idx} className={`flex w-[32px] text-[12px] h-[32px] rounded-full justify-center items-center flex-row ${idx===visibleStatistics ? 'bg-SystemBrand text-white' : 'text-SystemGray4'}`}onClick={()=>setVisibleStatistics(idx)}>
                                {day}
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div className="flex flex-row overflow-auto w-screen max-w-[500px] h-auto no-scrollbar">
                <div className="flex flex-row h-[300px] rounded-[16px] mx-[5%]">
                    <div className="pt-[20px]">
                        {!loading3 && <GroupChart dataGroup={statistics?.[visibleStatistics].statics} />}
                    </div>
                    {
                        // !loading3 && statistics?.[visibleStatistics].statics.map((info : staticsType, idx: number) => {
                        //     return(
                        //         <div key={idx} className="flex flex-col text-SystemGray3 justify-end items-center w-[70px]">
                        //             <div className={`w-[24px] h-[${100-26}px]`}></div>
                        //             {/* <div className={`w-[24px] h-[${100-Math.floor(info.time/60)}px]`}></div> */}
                        //             {/* <div className="text-[12px]">{26}분</div> */}
                        //             <div className="text-[12px]">{Math.floor(info.time/60)}분</div>
                        //             {/* <div className={`w-[24px] h-[${Math.floor(info.time/60)}px] rounded-t-lg bg-SystemGray3`}></div> */}
                        //             <div className={`w-[24px] h-[26px] rounded-t-lg bg-SystemGray3`}></div>
                        //             <div className="text-[12px] pt-[3px]">{info.name}</div>
                        //         </div>
                        //     )
                        // })
                    }
                </div>
            </div>
            <div className="py-[50px]"/>
            <div className="fixed bottom-0 left-0 right-0 p-4 text-center">
                <BasicButton onClick={() => router.push('/exercise')} text="운동하러 가기"/>
            </div>
        </div>
    );
};

export default GroupId;
