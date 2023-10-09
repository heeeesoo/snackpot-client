import ExerciseList from "@/components/exercise/ExerciseList"
async function getData() {
    try {
        const apiURL = process.env.NEXT_PUBLIC_SERVER_URL
        const res = await fetch(`${apiURL}/exercises?cursorId=0&bodyPartTypes=&like=true&level=EASY&timeSpent=0&size=5`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            cache: 'no-store'
        });

        console.log(res)

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

export default async function Exercise() {
    const responseData = await getData();

    console.log('hi:',responseData)
    console.log('hi:',responseData.result.data.content)

   
    return (
        <div className="w-screen max-w-[500px]">
            <ExerciseList exerciseList={responseData.result.data.content} />
        </div>
    )
}
