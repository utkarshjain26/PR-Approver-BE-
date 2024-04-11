import { createContext, useState } from "react";

export const UserContext=createContext({});

export function UserContextProvider({children}){
    const [userInfo,setUserInfo]=useState({});
    const [search,setSearch]=useState('');
    const [refresh,setRefresh]=useState(false);
    const [sock,setSock]=useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    return (
        <UserContext.Provider value={{
            userInfo,setUserInfo,
            search,setSearch,
            refresh,setRefresh,
            popupOpen,setPopupOpen
        }}>
            {children}
        </UserContext.Provider>
    )
}