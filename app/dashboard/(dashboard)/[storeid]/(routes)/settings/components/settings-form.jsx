"use client"
import Heading from '@/app/dashboard/_components/heading';
import { Button } from '@/components/ui/button';
import { LuTrash } from "react-icons/lu";
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input';
import axios, { Axios } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';


const formSchema = z.object({
    name: z.string().min(1),
})

const SettingsForm = ({ initialData }) => {
    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues : initialData,
    });
    
    const onSubmit = async (data) =>{
        try{

            console.log("storeId",params.storeid)
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeid}`,data)
            router.refresh();
            toast.success("Store updated.")
        }
        catch(error){
            console.log(error)
            toast.error("somthing went www wrong!");
        }
        finally{
            setLoading(false);
        }
    }
    //type SettingsForm = z.infer<typeof formSchema>;
    
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading title="Settings"
                description="Manage store" />

            <Button variant="destructive"
                size="icon"
                disabled={loading}
                onClick={() => setOpen(true)}
                >
                <LuTrash className="h-4 w-4" />
            </Button>
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField 
                            control={form.control} 
                            name="name"
                            render= {({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} 
                                                disabled={loading} 
                                                placeholder="Store name" />
                                    </FormControl>
                                </FormItem>

    )} />

                </div> 
                <Button disabled={loading} className="ml-auto" type="submit" >
                    Save changes
                </Button>
            </form>
        </Form>
        </>
    )
}

export default SettingsForm;