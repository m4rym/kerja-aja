import { X, ExternalLink, Flag, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostActionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onDetail: () => void;
  onReport: () => void;
  onShare: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export default function PostActionsSheet({
  isOpen,
  onClose,
  onDetail,
  onReport,
  onShare,
  onSave,
  isSaved,
}: PostActionsSheetProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in"
        onClick={onClose}
        data-testid="overlay-post-actions"
      />

      <div className="pb-16 fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-2xl shadow-xl animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-lg" data-testid="text-actions-title">
            Opsi Postingan
          </h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-actions"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              onDetail();
              onClose();
            }}
            data-testid="button-action-detail"
          >
            <ExternalLink className="w-5 h-5 mr-3" />
            Lihat Detail
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              onSave();
              onClose();
            }}
            data-testid="button-action-save"
          >
            <Bookmark className={`w-5 h-5 mr-3 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Hapus dari Simpanan' : 'Simpan Postingan'}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              onShare();
              onClose();
            }}
            data-testid="button-action-share"
          >
            <Share2 className="w-5 h-5 mr-3" />
            Bagikan
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => {
              onReport();
              onClose();
            }}
            data-testid="button-action-report"
          >
            <Flag className="w-5 h-5 mr-3" />
            Laporkan
          </Button>
        </div>
      </div>
    </>
  );
}
