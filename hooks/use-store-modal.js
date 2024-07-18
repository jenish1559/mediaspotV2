import { create } from 'zustand'

export const useStoreModal  = create((set)  => ({
    isOpen : false,
    onOpen :  () => set({ isOpen : true }),
    OnClose: () => set({ isOpen : false }),
})); 
