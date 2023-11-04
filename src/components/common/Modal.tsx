'use client'
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface ModalType {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

function Modal({ isOpen, onClose, children } : ModalType) {
    const router = useRouter();
    const appDownloadLink = 'https://snackpot.notion.site/9fb1c237d8a745a9895f8c2b8ae47d5f?pvs=4'
    // const appDownloadLink = 'https://play.google.com/store/games?utm_source=apac_med&hl=ko-KR&utm_medium=hasem&utm_content=Oct0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-kr-1003227-med-hasem-py-Evergreen-Oct0121-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700065216954454_creativeid_535244992548_device_c&gclid=Cj0KCQjw4vKpBhCZARIsAOKHoWR6S8aIDXuM66-pD-dBY75GKGm-cViZFi-SVdnbQ6bvj025tVH5xTgaArb3EALw_wcB&gclsrc=aw.ds'
    return isOpen ? (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <div className='flex flex-col justify-center items-center bg-black w-[60%] h-[300px] bg-opacity-20 rounded-md'>
                <div className="bg-white p-8 rounded-lg shadow-lg flex justify-center items-center flex-col">
                    <div onClick={()=>router.push(appDownloadLink)} className=''>
                        {children}
                    </div>
                </div>
                <div className='my-4'/>
                <button className='rounded-lg h-[40px] bg-SystemBrand text-white w-[150px]' onClick={onClose}>일단 둘러볼게요!</button>
            </div>
        </div>
    ) : null;
}

export default Modal;
