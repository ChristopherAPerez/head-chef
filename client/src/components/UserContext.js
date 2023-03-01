import React, { useContext, useState, createContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }){

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("/me").then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              setUser(user)
              setRecipes(user.recipes)
              setInventory(user.inventories)
              setLoading(false)
            })
          }
        });
      }, []);

    return(
        <>
        <UserProvider.Provider value={ { user, setUser } }>
            {children}
        </UserProvider.Provider>
        </>
    )

}