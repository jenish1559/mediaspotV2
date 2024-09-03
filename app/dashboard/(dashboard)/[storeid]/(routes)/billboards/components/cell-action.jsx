"use client";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import React from 'react'
import { LuFileEdit, LuMoreHorizontal } from 'react-icons/lu';

const CellAction = ({data}) => {
  return (
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
            <DropdownMenuItem>
                <LuFileEdit className="mr-2 h-4 w-4" />
                Update
            </DropdownMenuItem>
        </DropdownMenuContent>
     </DropdownMenu>
  );
}

export default CellAction