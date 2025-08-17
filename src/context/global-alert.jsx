"use client"

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useGlobalAlert } from "@/lib/use-global-alert"

export function GlobalAlertDialog() {
  const { open, title, description, actionText, cancelText, onConfirm, closeAlert } = useGlobalAlert()

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    closeAlert()
  }

  return (
    <AlertDialog open={open} onOpenChange={closeAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}