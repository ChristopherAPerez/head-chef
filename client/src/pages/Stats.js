import React, { useState, useContext, useEffect } from 'react';
import PieChart from "./PieChart";
import { UserContext } from '../components/App';
import { useNavigate } from "react-router-dom"

function Stats() {

  const navigate = useNavigate()

  const { setStats } = useContext(UserContext)

  const [trigger, setTrigger] = useState(false)

  const { stats } = useContext(UserContext)

  const backgroundColor = [
    '#FFC0CB',
    '#ADD8E6',
    '#90EE90',
    '#FFFFE0',
    '#454545'
  ]

  useEffect(() => {
    fetch("/retrieve_cal_stats").then((r) => {
      if (r.ok) {
        r.json().then((stat) => {
          setStats(stat)
        })
      }
    });
  }, [setStats]);

  function handleMainMenu(){
    navigate("/")
}

  return (
    <div>
      <button className="button" onClick={handleMainMenu}>Main Menu</button>
      <br></br>
      <br></br>
      <PieChart trigger={trigger} setTrigger={setTrigger}/>
      <div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <table className='chartStats'>
        <thead>
          <tr>
            {trigger ? <th>Cooking Time Last 5-Days</th> : <th>Calories Last 5-Days</th>}
          </tr>
        </thead>

        <tbody className='colors'>
          {stats.map((stat, index) => {
            return <tr key={index}>
              <td style={{ backgroundColor: backgroundColor[index], width: "20px", height: "10px", border: "5px solid black" }} ></td>
              <td><b>Date:</b> {stat["date"]}</td>
              {trigger ? <td><b>Prep-time:</b> {stat["total"]}</td> : <td><b>Calories:</b> {stat["total"]}</td>}
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;


