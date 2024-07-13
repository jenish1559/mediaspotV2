"use client"

import { FormError } from "../form-error";

const { useCurrentRole } = require("@/hooks/use-current-role")

export const RoleGate = ({children, allowedRole}) => {
    const role = useCurrentRole();

    if(role !== allowedRole){
        return(<FormError message="You do not have permission to view this content!" />)
    }
     
    return(<>
    {children}
    </>
    )
}