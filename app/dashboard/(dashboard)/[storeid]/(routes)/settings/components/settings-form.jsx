import Heading from '@/app/dashboard/_components/heading';
import { Button } from '@/components/ui/button';
import { LuTrash } from "react-icons/lu";
import React from 'react'

const SettingsForm = ({ initialData }) => {
    return (
        <div className="flex items-center justify-between">
            <Heading title="Settings"
                description="Manage store" />

            <Button variant="destructive"
                size="icon"
                >
                <LuTrash className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default SettingsForm;