import { auth } from "@/auth"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Navbar from "../../_components/navbar";

const DashboardLayout1 = async ({children,params}) => {

const user = await auth();
const userId = user.id;
if(!user){
    redirect('/auth/login');
}

try{
    const store = await db.store.findFirst({
        where : {
            id: params.storeid,
            userId
        }
    });

    if(!store){
        redirect('/dashboard');
    }
}
catch(error){

    console.log("error123 :" ,error);
}


return(
    <>
    <div>
        <Navbar/>
        {children}
    </div>
    </>
)
}

export default  DashboardLayout1;

