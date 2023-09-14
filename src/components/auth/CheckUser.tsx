'use client'
import UserStore from "@/store/UserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CheckUser = () => {
    const router = useRouter();
    const {isLoggedIn} = UserStore();

    useEffect(() => {
        if(isLoggedIn){
            router.replace('/group')
        }
    })
    return (
        <div>
            
        </div>
    );
};

export default CheckUser;