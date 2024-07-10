"use client"
import { useCurrentUser } from "@/hooks/use-current-user"; 
import { logout } from "@/actions/logout";
const SettingPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        logout();
    }
    return(
        <div className="bg-secondary flex p-4 items-center justify-center rounded-xl shadow-sm ">
            
            <button type="submit" onClick={onClick}>
                Sign out
            </button>
        </div>
    )
}

export default SettingPage;