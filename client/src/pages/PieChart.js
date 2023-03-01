import React, { useContext, useState } from 'react';
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

import { UserContext } from '../components/App';
import { MenuContext } from '../components/App';

Chart.register(ArcElement);

export default function PieChart( { trigger, setTrigger } ) {

  const [dataTrigger, setDataTrigger] = useState("prep")
  const { stats, setStats } = useContext(UserContext)

    const label = stats.map((stat) => stat["date"])
    const total_data = stats.map((stat) => stat["total"])

    const backgroundColor = [
        '#FFC0CB',
        '#ADD8E6',
        '#90EE90',
        '#FFFFE0',
        '#454545'
    ]

    const hoverBackgroundColor = [
        '#FF69B4',
        '#0000FF',
        '#008000',
        '#FFFF00',
        '#000000'
    ]

    const data = {
        labels: label,
        datasets: [
            {
                label: 'total',
                backgroundColor: backgroundColor,
                hoverBackgroundColor: hoverBackgroundColor,
                data: total_data
            }
        ],
    }

    function handleClick() {
        console.log(label)
        console.log(total_data)
    }

    function handleSwitch() {
        fetch(`/retrieve_${dataTrigger}_stats`).then((r) => {
          if (r.ok) {
            r.json().then((stat) => {
              setStats(stat)
              setTrigger(!trigger)
            })
          }
        });
        if (dataTrigger === "cal"){
            setDataTrigger("prep")
        } else {
            setDataTrigger("cal")
        }
      }

    return (
        <div className='chartDoughnut'>
                <Doughnut
                    data={data}
                    options={{
                        title: {
                            display: true,
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                    onClick={handleSwitch}
                />
        </div >
    );

}