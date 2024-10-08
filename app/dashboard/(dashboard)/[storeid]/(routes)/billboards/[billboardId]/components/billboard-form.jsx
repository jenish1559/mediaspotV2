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
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AleartModal from '@/components/modals/aleart-modal';
import { useOrigin } from '@/hooks/use-origin';
import ImageUpload from '@/components/ui/image-upload';


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
    const description = initialData ? "Edit a billboard" : "Add a new billboard";
    const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
    const action = initialData ? "save billboard" : "Create";
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log("hello");
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeid}/billboards/${params.billboardId}`, data)
            } else {
                await axios.post(`/api/${params.storeid}/billboards`, data)
            }
            router.refresh();
            //router.push(`/${params.storeid}/billboards`)
            toast.success("Store updated.");
        }
        catch (error) { 
            console.log(error);
            toast.error("something went wrong.");
        }
        finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeid}/billboards/${params.billboardId}`);
            router.refresh();
            router.push(`/dashboard/${params.storeid}/billboards`);
            toast.success("Billboard deleted.");
        }
        catch (error) {
            console.log(error);
            toast.error("Make sure you removed all categories using this billboard first.");
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
                <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background image</FormLabel>
                                    <FormControl>
                                        <ImageUpload value={field.value ? [field.value] : []}
                                                    disabled={loading}
                                                    onChange={(url) => field.onChange(url)}
                                                    onRemove={() => onChange("")}/>
                                    </FormControl>
                                </FormItem>
                            )} />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
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
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default BillboardForm;