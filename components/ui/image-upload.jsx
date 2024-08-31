"use client"

import { useEffect, useState } from "react"
import { Button } from "./button";
import { LuImagePlus, LuTrash } from "react-icons/lu";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

const ImageUpload = ({ disabled, onChange, onRemove, value }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onUpload = (result) => {
        onChange(result.info.secure_url);
    }
    
    console.log("value :",value);

    return (
        <div>
            
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                   
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden ">
                        <div className="z-10 absolue top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive">
                                <LuTrash className="h-4 w-4" />
                            </Button>
                        </div>
                        <p>{url}</p>
                        <Image fill className="object-cover" alt="Image" src={url} />
                    </div>
                ))}
            </div>

            <CldUploadWidget onUploadAdded={onUpload} uploadPreset="custom1">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return(
                        <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
                            <LuImagePlus className="h-4 w-4 mr-2"/>
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload