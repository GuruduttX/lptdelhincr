import { ArrowRight } from "lucide-react";

export function MobileCTA({ onBook }: { onBook: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-white/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
      <button onClick={onBook} className="btn-primary w-full">
        Book Free Demo <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </div>
  );
}
