import Image from "next/image"
import { RunningMan } from "@/constant/icon"
import SignIn from "@/components/auth/SignIn"
import SignUp from "@/components/auth/SignUp"

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <Image
          alt="runningman"
          src={RunningMan}
          width={120}
          height={120}
          className="pb-[20px]"
        />
        <div className="font-bold text-[24px] text-center pb-[12px]">
          항상 운동 결심 <br />
          작심 3일 이었다면?
        </div>
        <div className="text-SystemGray3 text-[14px] text-center font-normal">
          그룹으로 묶어 운동하는 snackpot과 함께 <br />
          평생 운동 습관 만들어요!
        </div>
      </div>
      <div className="h-[20vh]">
        <SignIn />
        <SignUp />
      </div>
    </div>
  )
}
