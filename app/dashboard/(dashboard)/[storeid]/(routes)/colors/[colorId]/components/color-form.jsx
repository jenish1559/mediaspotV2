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


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/,{
        message: 'String must be a valid hex code',
    }),
})

const ColorForm = ({ initialData }) => {
    const router = useRouter();
    const params = useParams();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Edit a color" : "Add a new color";
    const toastMessage = initialData ? "Color updated." : "Color created.";
    const action = initialData ? "save color" : "Create";
    
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
                await axios.patch(`/api/${params.storeid}/colors/${params.colorId}`, data)
            } else {
                await axios.post(`/api/${params.storeid}/colors`, data)
            }
            router.push(`/dashboard/${params.storeid}/colors`)
            router.refresh();
            toast.success(toastMessage);
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
            await axios.delete(`/api/${params.storeid}/colors/${params.colorId}`);
            router.refresh();
            router.push(`/dashboard/${params.storeid}/colors`);
            toast.success("Color deleted.");
        }
        catch (error) {
            console.log(error);
            toast.error("Make sure you removed all products using this color first.");
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
                                            placeholder="Color name" />
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
                                        <div className="flex items-center gap-x-4">
                                        <Input {...field}
                                            disabled={loading}
                                            placeholder="Color value" />
                                            <div className="border p-4 rounded-full"
                                                style={{backgroundColor: field.value}}></div>
                                        </div>
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

export default ColorForm;