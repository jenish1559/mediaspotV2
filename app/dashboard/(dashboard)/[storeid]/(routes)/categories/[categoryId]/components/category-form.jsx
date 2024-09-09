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
import { Select, SelectContent, SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';


const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
})

const CategoryForm = ({ initialData, billboards}) => {
    const router = useRouter();
    const params = useParams();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category" : "Add a new category";
    const toastMessage = initialData ? "Category updated." : "Category created.";
    const action = initialData ? "save category" : "Create";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboards : []
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log("hello");
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeid}/categories/${params.categoryId}`, data)
            } else {
                await axios.post(`/api/${params.storeid}/categories`, data)
            }
            router.refresh();
            router.push(`/${params.storeid}/categories`)
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
            await axios.delete(`/api/${params.storeid}/categories/${params.billboardId}`);
            router.refresh();
            router.push(`/dashboard/${params.storeid}/categories`);
            toast.success("Category deleted.");
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


    return (
        <>
            <AleartModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className="flex items-center justify-between">
                <Heading title={title}
                    description={description} />

                {initialData && (
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
                                            placeholder="Category name" />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Select disabled={loading}
                                        onValueChange={field.onValueChange}
                                        value={field.value}
                                        defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue defaultValue={field.value}
                                                         placeholder="Select a billboard"   />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem key={billboard.id}
                                                            value={billboard.id} >
                                                                {billboard.label}
                                                            </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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

export default CategoryForm;