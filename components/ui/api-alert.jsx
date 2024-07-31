import { Alert, AlertDescription, AlertTitle } from "./alert";
import { LuServer,LuCopy } from "react-icons/lu";
import { Badge } from "./badge";
import { Button } from "./button";
import { toast } from "sonner";

const textMap = {
    public : "Public",
    admin : "Admin"
};

const variantMap = {
    public : "secondary",
    admin : "destructive"
};

const onClick = (description) => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to the clipboard.");
}
export const  ApiAlert = ({title, description,variant="public"}) => {

    return(
    <Alert>
        <LuServer className="w-4 h-4"/> 
        <AlertTitle className="flex items-center gap-x-2">
            {title}
            <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge> 
        </AlertTitle>
        <AlertDescription className="mt-4 flex items-center justify-between">
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" >
                {description}
            </code>
            <Button variant="outline" size="icon" onClick={onClick} >
                <LuCopy className="h-4 w-4" />
            </Button>
        </AlertDescription>
    </Alert>
    )
}

