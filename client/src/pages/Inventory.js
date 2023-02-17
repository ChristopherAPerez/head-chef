import React, { useContext, useState } from 'react';
import { UserContext } from '../components/App';

function Inventory() {

    const { user } = useContext(UserContext)

    const [inventory, setInventory] = useState(user.inventories)

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [pic, setPic] = useState("")

    function handleSubmit(e) {

        e.preventDefault();

        fetch("inventories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item_name: name,
                quantity: quantity,
                item_pic: pic,
                user_id: user.id
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((item) => {
                        setInventory([...inventory, item])
                    });
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                    })
                }
            })

    }

    function handleClick() {
        console.log(user)
        console.log(inventory)
      }


    return (
        <>
            <ul>
                {inventory.map((item) => {
                    return <ul key={item.id}>{item.item_name}</ul>
                })}
            </ul>

            <form onSubmit={handleSubmit}>
                <br></br>

                <label>Name:</label><br></br>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <br></br>

                <label>Quantity:</label><br></br>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                <br></br>

                <label>Image:</label><br></br>
                <textarea value={pic} onChange={(e) => setPic(e.target.value)} rows="2" cols="30"></textarea>

                <br></br>

                <input className="button" type="submit" />
            </form>

            <button onClick={handleClick}>click</button>
        </>
    )
}

export default Inventory;