"use client";

import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

export default function AleartModal({ isOpen, onClose, onConfirm, loading }) {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }
    return (
        <Modal title="Are you sure?"
            description="This action cannot be undone."
            isOpen={isOpen}
            onClose={onClose} >
            <div className="pt-6 space-x-6 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    continue
                </Button>
            </div>
        </Modal>
    )
}

