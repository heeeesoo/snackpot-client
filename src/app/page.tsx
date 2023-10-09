import Image from "next/image"
import { RunningMan } from "@/constant/icon"
import BasicButton from "@/components/button/BasicButton"
import BasicSecondayButton2 from "@/components/button/BasicSecondayButton2"
import Link from "next/link"
import CheckUser from "@/components/auth/CheckUser"

export default function Home() {
  return (
    <div className="flex flex-col justify-around h-[90vh]"> 
      <div className="h-[100px]">
        <CheckUser />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image
          alt="runningman"
          src={RunningMan}
          width={120}
          height={120}
          className="pb-[20px]"
        />
        <div className="font-bold text-[24px] text-center pb-[12px]">
          항상 운동 결심 <br />
          작심삼일이었다면?
        </div>
        <div className="text-SystemGray3 text-[14px] text-center font-normal">
          그룹으로 묶어 운동하는 snackpot과 함께 <br />
          평생 운동 습관 만들어요!
        </div>
      </div>
      <div className="h-[200px] flex flex-col items-center justify-center">
        <Link href={'/signin'} className="w-full flex justify-center">
          <BasicButton text="로그인" />
        </Link>
        <div className="py-[8px]"></div>
        <Link href={'/signup'} className="w-fixwidth flex justify-center">
          <BasicSecondayButton2 text="회원가입" />
        </Link>
      </div>
    </div>
  )
}
