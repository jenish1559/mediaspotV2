import { auth } from "@/auth"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const DashboardLayout1 = async ({children,params}) => {

const {userId} = auth();
if(!userId){
    redirect('/auth/login')
}

const store = await db.store.findFirst({
    where : {
        id:params.storeId,
        userId
    }
});

if(!store){
    redirect('/');
}

return(
    <>
    <div>
        this will be nav bar
        {children}
    </div>
    </>
)
}

export default  DashboardLayout1;

