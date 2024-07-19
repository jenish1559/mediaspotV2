import { create } from 'zustand'

export const useStoreModal  = create((set)  => ({
    isOpen : false,
    onOpen :  () => set({ isOpen : true }),
    onClose: () => set({ isOpen : false }),
})); 
