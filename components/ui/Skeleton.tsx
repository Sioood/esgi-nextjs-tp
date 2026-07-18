import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-shimmer rounded-sm bg-surface-raised", className)}
      aria-hidden="true"
    />
  );
}

/** Terminal-window skeleton block matching a WindowCard. */
function WindowSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-border-medium bg-surface",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-border-subtle bg-background/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Home page loading state. */
export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-12 w-full max-w-xl rounded-md" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-md" />
        ))}
      </div>
    </div>
  );
}

/** City detail page loading state. */
export function CityPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>
      <WindowSkeleton />
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-96 rounded-md lg:col-span-2" />
        <div className="space-y-6">
          <Skeleton className="h-40 rounded-md" />
          <Skeleton className="h-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}
