import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FB3E7A', '#FFBB28', '#FF8042'];
const data = [
    { label: 'Group A', value: 400 },
    { label: 'Group B', value: 300 },
    { label: 'Group C', value: 300 },
    { label: 'Group D', value: 200 },
];
export default function EventRevenue() {
    const [activeIndex, setActiveIndex] = useState(null);
    const onPieEnter = (_, index) => {
        setActiveIndex(data[index].label);
    };
    const onPieLeave = () => {
        setActiveIndex(null);
    };
    const theme = useTheme();
    return (
        <React.Fragment>
            <Typography
                component="div"
                sx={{ mt: 2, mb: 1, color: "#ffff", fontSize: 14 }}
            >
                <b>Total Revenue</b>
            </Typography>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={60}
                        fill={theme.palette.primary.main}
                        paddingAngle={5}
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={data[index].label}
                                fill={COLORS[index % COLORS.length]}
                                fillOpacity={activeIndex === index ? 0.5 : 1}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <Typography
                component="div"
                sx={{ mt: 2, mb: 1, color: "#ffff", fontSize: 14 }}
            >
                <b>Rs 2500000</b>
            </Typography>
        </React.Fragment>
    );
}
