
type Props = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export default function PrimaryButton({ children, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-10 py-4 rounded-full text-xl font-bold bg-yellow-700 text-white shadow-lg hover:bg-yellow-800 hover:scale-105 transition disabled:opacity-50"
    >
      {children}
    </button>
  )
}
