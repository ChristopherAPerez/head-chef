import React from 'react';

function FriendsCard({ friend, setMenu, setPage, setRecipes }) {

    function handleClick() {
        fetch(`/friend_last_menu/${friend.id}`).then((r) => {
            if (r.ok) {
                r.json().then((menu) => {
                    setMenu(menu)
                    setPage('menu')
                    setRecipes(menu.recipes)
                })
            } else {
                r.json().then((err) => {
                    alert(err.error)
                })
            }
        });
    }

    return (
        <>
            <tr>
                <td className='friendTabletd'>
                    <span onClick={handleClick}><b>{friend.username}</b></span>
                </td>
            </tr>
        </>
    )
}

export default FriendsCard;