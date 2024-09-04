"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { LuCopy, LuFileEdit, LuMoreHorizontal } from 'react-icons/lu';
import { MdDeleteOutline } from "react-icons/md";
import { toast } from 'sonner';
import AleartModal from '@/components/modals/aleart-modal';

const CellAction = ({data}) => {
    const router = useRouter();
    const params = useParams();
    console.log(data);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = (id) => {
        navigator.clipboard.writeText(id);
        toast.success("Billboard Id copied to the clipboard.");
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeid}/billboards/${data.id}`);
            router.refresh();
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

  return (
    <>
    <AleartModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" >
                <span className="sr-only">Open Menu</span>
                <LuMoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel >
                Action
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.Id)}>
                <LuCopy className="mr-2 h-4 w-4" />
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/dashboard/${params.storeid}/billboards/${data.id}`)}>
                <LuFileEdit className="mr-2 h-4 w-4" />
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
                <MdDeleteOutline className="mr-2 h-5 w-5" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
     </DropdownMenu>
     </>
  );
}

export default CellAction