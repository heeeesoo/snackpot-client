import VideoCard from "@/components/exercise/VideoCard";
import Image from "next/image";
import Link from "next/link";
interface ExerciseDataType {
    thumbnail: string;
    youtuberThumbnail: string;
    effect: string;
    videoId: string;
    title: string;
    youtuberName: string;
    youtuberChannelId: string;
    youtuberDescription: string;
    time: number;
    bodyPart: string;
    level: string;
    calory: number;
    like: boolean;
}
async function getData(exerciseId : number) {
    try {
        const apiURL = process.env.NEXT_PUBLIC_TEST_SERVER_URL
        console.log(`${apiURL}/exercises/${exerciseId}`)
        const res = await fetch(`${apiURL}/exercises/${exerciseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            cache: 'no-store'
        });

        if (!res.ok) {
          console.log('Error:', res.status, res.statusText);
          throw new Error('Failed to fetch data');
        }
        
        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default async function ExerciseId({ params }: { params: { exerciseId: number } }) {
    const data : ExerciseDataType= await getData(params.exerciseId);
    console.log(data)

    return (
        <div className="flex flex-col">
            <Link href={'/'}>
                <Image
                src={data.thumbnail}
                width={200}
                height={200}
                alt="thumbnail"
                />
            </Link>
            <VideoCard />
            {data.title}
            {data.youtuberName}
            {data.youtuberDescription}
            <div>
                {data.time}
                {data.level}
                {data.bodyPart}
            </div>
            <div>
                {data.effect}
            </div>
            <div>
                {data.bodyPart}
            </div>
        </div>
    );
};
