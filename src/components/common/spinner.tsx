export function Spinner ({ className }: { className?: string }) {
  return <div className={`loader ${className ?? ''}`}></div>
}
