"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Select } from "@/components/ui/select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
const SettingPage = () => {
    const user = useCurrentUser();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const form = useForm({
        resolve: zodResolver(SettingsSchema),
        defaultValues: {
            role: user?.role || undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
        }

    })
    const onSubmit = (values) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.success) {
                        setSuccess(data.success);
                        update();
                    }
                    if (data.error) {
                        setError(data.error);
                    }
                })
                .catch(() => setError("Somting went wrong!"))
        })

    }
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ⚙ Settings
                </p>
            </CardHeader>
            <CardContent className="gap-y-4">
                <ScrollArea className="h-[400px] p-2" >
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">


                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="John doe" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="email" placeholder="Johndoe@example.com" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="password" placeholder="********" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    New Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="password" placeholder="********" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Role
                                        </FormLabel>
                                        <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value={UserRole.USER}>
                                                    User
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="isTwoFactorEnabled"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>
                                                        Two Factor Authentication
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Enable two factor authentication for your account
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit">
                            Save
                        </Button>
                    </form>
                </Form>
                </ScrollArea>
            </CardContent>
        </Card>

    )
}

export default SettingPage;