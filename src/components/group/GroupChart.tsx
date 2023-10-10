'use client'
import { LineChart, Line, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

interface GroupChartType{
    userId: number;
    name: string;
    time: number;
}

interface GroupChartListType{
    dataGroup: GroupChartType[]
}

const GroupChart = ({
    dataGroup
}:any) => {
    console.log('chart:',dataGroup)

    return (
        <div className='w-[100vw]'>
            <BarChart width={300} height={250} data={dataGroup}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="time" fill="#3A81F7" />
            </BarChart>
        </div>
    );
};

export default GroupChart;