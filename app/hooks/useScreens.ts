"use client"

import { useState, useEffect, useCallback } from "react"
import type { Screen } from "@/app/tpyes"

export function useScreens() {
  const [screens, setScreens] = useState<Screen[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchScreens = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/screens")
      if (!res.ok) throw new Error("Failed to fetch screens")
      setScreens(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchScreens()
  }, [fetchScreens])

  const assignMedia = useCallback(
    async (screenId: string, mediaItemId: string) => {
      const res = await fetch(`/api/screens/${screenId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaItemId }),
      })
      if (!res.ok) throw new Error("Failed to assign media")
      await fetchScreens()
    },
    [fetchScreens]
  )

  const removeMedia = useCallback(
    async (screenId: string, mediaItemId: string) => {
      await fetch(`/api/screens/${screenId}/assign`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaItemId }),
      })
      await fetchScreens()
    },
    [fetchScreens]
  )

  return { screens, loading, error, refetch: fetchScreens, assignMedia, removeMedia }
}
