"use client"
import React, { useState } from 'react'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LuStore, LuCheck , LuChevronsUpDown, LuPlusCircle } from "react-icons/lu";
import { cn } from '@/lib/utils'
import { CommandSeparator } from 'cmdk'

const StoreSwitcher = ({className, items=[]}) =>  {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label : item.name,
        value : item.id
    }))

    const currentStore = formattedItems.find((item) => item.value == params.storeid);


    const [open,setOpen] = useState(false);

    const onStoreSelect = ({store}) => {
        setOpen(false);
        router.push(`/dashboard/${store.value}`);
    }
  return (
    <Popover open={open} 
             onOpenChange={setOpen}>
        <PopoverTrigger asChild >
            <Button variant="outline"
            size="sm"
             role="combobox" 
            area-expanded={open}
            area-lable="select a store"
            className={cn("w-[200px] justify-between", className)}>
            <LuStore className="mr-2 w-4 h-4"/>
            {currentStore?.label}
            <LuChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50"/>
        </Button>
        </PopoverTrigger>
        <PopoverContent>
             <Command>
                <CommandList>
                    <CommandInput placeholder="Search store..." />
                    <CommandEmpty>No store found.</CommandEmpty>
                    <CommandGroup heading="Store">
                        {formattedItems.map((store) => (
                            <CommandItem key={store.value}
                                         onSelect={() => onStoreSelect(store)}
                                         className="text-sm" >
                                <LuStore className="mr-3 w-4 h-4"/>
                                {store.label}
                                <LuCheck className={cn("ml-auto h-4 w-4",
                                                        currentStore?.value == store.value
                                                         ? "opacity-100" : "opacity-0" )} />
                            </CommandItem>
                        ) )}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator/>
                <CommandList>
                    <CommandGroup>
                        <CommandItem onSelect={() => {
                            setOpen(false);
                            storeModal.onOpen();
                        }}>
                         <LuPlusCircle className="mr-2 h-4 w-4" />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
    
  )
}

export default StoreSwitcher