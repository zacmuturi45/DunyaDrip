import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function SalesChart({ data }) {
    return (
        <div className='charts_main'>
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray={'3 3'} />
                    <XAxis dataKey={'date'} />
                    <YAxis />
                    <Tooltip />
                    <Line type={'monotone'} dataKey={'total'} stroke='#8884d8' strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
