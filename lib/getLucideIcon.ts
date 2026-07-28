import * as LucideIcons from 'lucide-react'

export function getLucideIcon(iconName: string) {
  const icons = LucideIcons as any
  return icons[iconName] || LucideIcons.HelpCircle
}
