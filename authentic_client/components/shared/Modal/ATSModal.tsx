
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-h-[90vh]
          overflow-hidden
          p-0
        "
      >
        <div className="flex h-full max-h-[90vh] flex-col">
          {/* Header */}
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle className={cn(titleClassName)}>
              {title}
            </DialogTitle>

            {description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          {/* Scrollable Content */}
          <div
            className={cn(
              "flex-1 overflow-y-auto px-6 py-4",
              descriptionClassName
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {(onCancel || onConfirm) && (
            <DialogFooter className="border-t px-6 py-4">
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
                  {onConfirmText || "Continue"}
                </Button>
              )}
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ATSModal;