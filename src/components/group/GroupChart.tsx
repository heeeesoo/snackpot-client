'use client'
import { LineChart, Line, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';

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

    const newArray = dataGroup.map((item : GroupChartType) => ({
        userId: item.userId,
        name: item.name,
        time: Math.ceil(item.time / 60)
    }));

    newArray.sort((a : GroupChartType, b : GroupChartType) => b.time - a.time);

    const renderCustomizedLabel = (props : any) => {
        const { x, y, width, height, value } = props;
        const radius = 10;
      
        return (
          <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#FFFFFF" />
            <text x={x + width / 2} y={y - radius} className='text-[14px]' fill="#CCCCDC" textAnchor="middle" dominantBaseline="middle">
              {Math.ceil(value)}분
            </text>
          </g>
        );
      };      

    return (
        <div className='w-[100vw] '>
            <BarChart width={100 * dataGroup.length + 50} height={250} data={newArray}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                {/* <Bar dataKey="time" fill="#CCCCDC" >
                    <LabelList dataKey="name" content={renderCustomizedLabel} />
                <Bar /> */}
                <Bar dataKey="time" fill="#CCCCDC" minPointSize={5}>
            <LabelList dataKey="time" content={renderCustomizedLabel} />
          </Bar>
            </BarChart>
        </div>
    );
};

export default GroupChart;