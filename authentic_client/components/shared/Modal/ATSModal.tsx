import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

export type TATSModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    titleClassName?: string;
    descriptionClassName?: string;
    onConfirmClassName?: string;
    description?: string;
    onConfirmText?: string;
    children: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    onConfirmDisabled?: boolean;
};

const ATSModal = ({
    open,
    setOpen,
    title,
    description,
    children,
    onConfirmText,
    onCancel,
    onConfirm,
    titleClassName,
    descriptionClassName,
    onConfirmClassName,
    onConfirmDisabled = false,
}: TATSModal) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}  >
            <DialogContent >
                <DialogHeader >
                    <DialogTitle className={cn(titleClassName)}>
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                <div className={cn(descriptionClassName)}>{children}</div>
                <DialogFooter>
                    {onCancel && (
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="mr-2"
                        >
                            Cancel
                        </Button>
                    )}
                    {onConfirm && (
                        <Button
                            className={cn(onConfirmClassName)}
                            onClick={onConfirm}
                            disabled={onConfirmDisabled}
                        >
                            {onConfirmText ? onConfirmText : "Continue"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ATSModal;