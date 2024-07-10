import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({children}) => {
return(
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-400">
        <Navbar/>
        {children}
    </div>
    )
} 

export default ProtectedLayout;