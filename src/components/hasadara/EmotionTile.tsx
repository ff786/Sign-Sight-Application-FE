
type Props = {
  emoji: string
  label: string
  tone: string
}

export default function EmotionTile({ emoji, label, tone }: Props) {
  return (
    <div className={`emotion-tile ${tone} text-black`}>
      <span className="text-4xl">{emoji}</span>
      {label}
    </div>
  )
}
