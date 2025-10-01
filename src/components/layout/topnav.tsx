"use client"

import { ThemeModeToggle } from './theme-mode-toggle'

export default function TopNav() {
  return (
    <header className="h-16 bg-white border-b flex items-center px-4 justify-between">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <ThemeModeToggle />
      </div>
    </header>
  )
}
