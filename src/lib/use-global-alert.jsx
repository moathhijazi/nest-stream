// lib/use-global-alert.js
import { create } from 'zustand'

export const useGlobalAlert = create((set) => ({
  open: false,
  title: '',
  description: '',
  actionText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: null,

  showAlert: ({ title, description, actionText, cancelText, onConfirm }) =>
    set({
      open: true,
      title,
      description,
      actionText: actionText || 'Confirm',
      cancelText: cancelText || 'Cancel',
      onConfirm,
    }),

  closeAlert: () => set({ open: false }),
}))
