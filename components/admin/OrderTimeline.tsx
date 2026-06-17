import type { OrderEvent } from "@/types";
import StatusBadge from "./StatusBadge";

export default function OrderTimeline({ timeline }: { timeline: OrderEvent[] }) {
  return (
    <ol className="relative border-l border-neutral-200 ml-3 flex flex-col gap-6">
      {timeline.map((event, i) => (
        <li key={i} className="pl-6">
          <span className="absolute -left-2 w-4 h-4 rounded-full bg-brand-green-light border-2 border-brand-green flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
          </span>
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={event.status} />
            <time className="text-xs text-neutral-400">
              {new Date(event.date).toLocaleString("es-MX")}
            </time>
          </div>
          {event.note && (
            <p className="text-xs text-neutral-500 mt-1">{event.note}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
