// import React, { useContext, createContext, useState, useEffect } from 'react';

// const UserContext = createContext();
// const LogoutUserContext = createContext();
// const LoginUserContext = createContext();

// export function useUser() {
//     return useContext(UserContext)
// }

// export function useLoginUser() {
//     return useContext(LoginUserContext)
// }
// export function useLogoutUser() {
//     return useContext(LogoutUserContext)
// }

// export function UserProvider({ children }) {
//     const [user, setUser] = useState(null)

//     useEffect(() => {
//         fetch("/me").then((r) => {
//             if (r.ok) {
//                 r.json().then((user) => {
//                     setUser(user)
//                 })
//             }
//         });
//     }, []);

//     function logOut() {
//         setUser(null)
//     }

//     return (
//         <UserContext.Provider value={user}>
//             <LogoutUserContext.Provider value={logOut}>
//                 <LoginUserContext.Provider value={setUser}>
//                     {children}
//                 </LoginUserContext.Provider>
//             </LogoutUserContext.Provider>
//         </UserContext.Provider>
//     )
// }