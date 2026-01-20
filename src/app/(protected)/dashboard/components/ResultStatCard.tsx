// components/ResultStatCard.tsx
import { Card, CardContent } from "@/src/components/ui/card"
import { LucideIcon } from "lucide-react"

interface ResultStatCardProps {
  icon: LucideIcon
  iconColor: string
  iconBg: string
  label: string
  value: string | number
  valueColor?: string
}

export function ResultStatCard({
  icon: Icon,
  iconColor,
  iconBg,
  label,
  value,
  valueColor,
}: ResultStatCardProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm">{label}</p>
          <p className={`text-2xl font-bold ${valueColor ?? ""}`}>{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}