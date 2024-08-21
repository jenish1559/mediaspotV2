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
import AleartModal from '@/components/modals/aleart-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';


const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
})

const BillboardForm = ({ initialData }) => {
    const router = useRouter();
    const params = useParams();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billboard" : "Create billboard";
    const description = initialData ? "Edit billboard" : "Create billboard";
    const toastMessage = initialData ? "Edit billboard" : "Create billboard";
    const action = initialData ? "Edit billboard" : "Create billboard";
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        },
    });

    const onSubmit = async (data) => {
        try {

            setLoading(true);
            await axios.patch(`/api/stores/${params.storeid}`, data)
            router.refresh();
            toast.success("Store updated.");
        }
        catch (error) {
            console.log(error);
            toast.error("somthing went www wrong!");
        }
        finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeid}`);
            router.refresh();
            router.push("/Dashboard");
            toast.success("Store deleted.");
        }
        catch (error) {
            console.log(error);
            toast.error("somthing went www wrong!");
        }
        finally {
            setLoading(false);
            setOpen(false);
        }
    }

   
    //type SettingsForm = z.infer<typeof formSchema>;

    return (
        <>
            <AleartModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className="flex items-center justify-between">
                <Heading title={title}
                    description={description} />

                { initialData && ( 
                    <Button variant="destructive"
                    size="icon"
                    disabled={loading}
                    onClick={() => setOpen(true)}
                >
                    <LuTrash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={loading}
                                            placeholder="Billboard label" />
                                    </FormControl>
                                </FormItem>
                            )} />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit" >
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default BillboardForm;