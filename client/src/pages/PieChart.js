import React, { useContext } from 'react';
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

import { UserContext } from '../components/App';

Chart.register(ArcElement);

export default function PieChart() {

    const { user } = useContext(UserContext)

    const names = user.inventories.map((item) => item.item_name)
    const quantity = user.inventories.map((item) => item.quantity)

    console.log(names)
    console.log(quantity)

    const state = {
        labels: names,
        datasets: [
            {
                label: 'department',
                backgroundColor: [
                    '#B21F00',
                    '#C9DE00'
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000'
                ],
                data: quantity
            }
        ]
    }

    return (
        <div className='charts'>
            <Doughnut
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Average Employee Salary According to the Department',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    );

}