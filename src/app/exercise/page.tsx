import ExerciseList from "@/components/exercise/ExerciseList"
async function getData() {
    try {
        const apiURL = process.env.NEXT_PUBLIC_TEST_SERVER_URL
        const res = await fetch(`${apiURL}/exercises`, {
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

export default async function Exercise() {
    const data = await getData();

    console.log(data)

   
    return (
        <div className="w-screen max-w-[500px]">
            <ExerciseList exerciseList={data.exerciseList} />
        </div>
    )
}
