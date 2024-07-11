"use client"
import { logout } from "@/actions/logout"

export const LogoutButton = ({children}) => {
     
    const onClick = () => {
        logout();
    };

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};