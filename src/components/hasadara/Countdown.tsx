
export default function Countdown({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center h-64">
      <span className="text-9xl font-extrabold text-yellow-800 animate-bounce">
        {value}
      </span>
    </div>
  )
}
