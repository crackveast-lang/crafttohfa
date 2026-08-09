import { Container } from "./Container";
import { Sparkle } from "@/components/doodles";
import { formatINR } from "@/lib/format";
import { getActiveFestival, getOrderDeadlineCopy } from "@/lib/festival";
import { siteConfig } from "@/site.config";

/**
 * Thin lavender strip above the header. The festival clause disappears on its own
 * once the order-by date passes — no one has to remember to take it down.
 */
export function AnnouncementBar() {
  const festival = getActiveFestival();
  const deadline = festival ? getOrderDeadlineCopy(festival) : null;

  return (
    <div className="bg-plum text-white">
      <Container>
        <div className="flex min-h-9 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-1.5 text-center text-[0.78rem] font-medium tracking-wide">
          <span className="inline-flex items-center gap-1.5">
            <Sparkle className="size-3.5 shrink-0" aria-hidden="true" />
            Free shipping above {formatINR(siteConfig.shipping.freeAbove)}
          </span>

          {deadline ? (
            <>
              <span aria-hidden="true" className="hidden opacity-50 sm:inline">
                ·
              </span>
              <span className="font-semibold">{deadline}</span>
            </>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
