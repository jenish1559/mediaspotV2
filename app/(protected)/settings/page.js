"use client"
import { useCurrentUser } from "@/hooks/use-current-user"; 
import { logout } from "@/actions/logout";
const SettingPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        logout();
    }
    return(
        <div>
            {JSON.stringify(user)}
            <button type="submit" onClick={onClick}>
                Sign out
            </button>
        </div>
    )
}

export default SettingPage;