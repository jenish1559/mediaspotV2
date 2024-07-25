"use client"
import React, { useState } from 'react'

import { useStoreModal } from '@/hooks/use-store-modal'

import { Modal } from '@/components/ui/modal'
import { StoreModalSchema } from '@/schemas/dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'

export const StoreModal = () => {
    const[loading, setLoading] = useState(false);
    const storeModal = useStoreModal();

    const form = useForm({
        resolver: zodResolver(StoreModalSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values) => {
        try{
            setLoading(true);
            const response = await axios.post("/api/stores",values);
            
            window.location.assign(`/dashboard/${response.data.id}`);
        }
        catch(error){
            toast.error("Something went wrong!")
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <Modal title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                 {...field}
                                                placeholder="store" />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                            )} />
                            <div className="pt-6 space-x-2 flex items-center justify-end">
                            <Button disabled={loading} variant="outline" onClick={storeModal.onClose} >
                                Cancel
                            </Button>
                            <Button disabled={loading} type="submit">
                                Submit
                            </Button>
                            </div>

                        </form>
                    </Form>

                </div>
            </div>
        </Modal>
    )
}
