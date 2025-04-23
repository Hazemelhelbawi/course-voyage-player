import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const PDFViewer = ({ isOpen, onClose, url }: PDFViewerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0">
        <div className="flex justify-end p-2 absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-white/90 hover:bg-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <iframe
          src={url}
          className="w-full h-full rounded-lg"
          title="PDF Viewer"
        />
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewer;
