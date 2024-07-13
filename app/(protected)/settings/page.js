"use client"
import * as z  from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingPage = () => {
    const user = useCurrentUser();
    const { update } = useSession();
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState();
    const [success,setSuccess] = useState();

    const form = useForm({
        resolve: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined 
        }

    })
    
    const onSubmit = (values) => {
        startTransition(() => {
            settings(values)
            .then((data) => {
                if(data.success){
                    setSuccess(data.success);
                    update();
                }
                if(data.error){
                    setError(data.error);
                    update();
                }
            })
            .catch(() => setError("Somting went wrong!"))
        })
        
    }
    return(
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ⚙ Settings
                </p>
            </CardHeader>
            <CardContent className="gap-y-4">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">

                        
                        <FormField 
                        control = {form.control}
                        name="name"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field}   disabled={isPending}/>
                                </FormControl>
                            </FormItem>
                         )}
                        />
                        </div>
                        <Button type="submit">
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    
    )
}

export default SettingPage;