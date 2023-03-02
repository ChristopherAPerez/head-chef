import React from 'react';

function FriendsCard({ friend, setMenu, setRecipes }) {

    function handleClick() {
        fetch(`/friend_last_menu/${friend.id}`).then((r) => {
            if (r.ok) {
                r.json().then((menu) => {
                    setMenu(menu)
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