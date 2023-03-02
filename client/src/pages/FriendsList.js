import React, { useContext, useState } from 'react';
import FriendCard from './FriendCard';
import MenuCard from './MenuCard';
import { UserContext } from '../components/App';
import { useNavigate } from "react-router-dom"

function FriendsList() {

    const navigate = useNavigate()

    const { friends } = useContext(UserContext)

    const [page, setPage] = useState("")
    const [menu, setMenu] = useState(null)
    const [recipes, setRecipes] = useState([])

    function handleMainMenu() {
        navigate("/")
    }

    return (
        <>
            <button className="button" onClick={handleMainMenu}>Main Menu</button>
            <br></br>
            <br></br>
            <div className='friendContainer'>
                <table className='friendTable'>
                    <tbody>
                        <tr >
                            <td>
                                <b>Friends</b>
                            </td>
                        </tr>
                        {friends.map((friend) => {
                            return <FriendCard
                                key={friend.id}
                                friend={friend}
                                setPage={setPage}
                                setMenu={setMenu}
                                setRecipes={setRecipes}
                            />
                        })}
                    </tbody>
                </table>
                <table className='friendMenuTable'>
                    <tbody>
                        <tr >
                            <td>
                                <b>Latest Menu Post</b>
                            </td>
                        </tr>
                        {
                            page === "menu" ?
                                <>
                                    <MenuCard menu={menu} recipes={recipes} />
                                </>
                                :
                                <></>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FriendsList;