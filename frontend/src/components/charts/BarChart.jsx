import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChart = ({ data, xKey, yKey, color = '#4F46E5' }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={yKey} fill={color} />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
};

export default BarChart;
