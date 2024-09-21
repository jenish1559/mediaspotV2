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
    name: z.string().min(1),
    value: z.string().min(1),
})

const SizeForm = ({ initialData }) => {
    const router = useRouter();
    const params = useParams();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit a size" : "Add a new size";
    const toastMessage = initialData ? "Size updated." : "Size created.";
    const action = initialData ? "save size" : "Create";
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeid}/sizes/${params.sizeId}`, data)
            } else {
                await axios.post(`/api/${params.storeid}/sizes`, data)
            }
            router.push(`/${params.storeid}/sizes`)
            router.refresh();
            toast.success("Size updated.");
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
            await axios.delete(`/api/${params.storeid}/sizes/${params.sizeId}`);
            router.refresh();
            router.push(`/dashboard/${params.storeid}/sizes`);
            toast.success("Size deleted.");
        }
        catch (error) {
            console.log(error);
            toast.error("Make sure you removed all products using this size first.");
        }
        finally {
            setLoading(false);
            setOpen(false);
        }
    }

   

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
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={loading}
                                            placeholder="Size name" />
                                    </FormControl>
                                </FormItem>
                            )} />
                             <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={loading}
                                            placeholder="Size value" />
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

export default SizeForm;