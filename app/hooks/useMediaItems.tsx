"use client"

import { useState, useEffect, useCallback } from "react"
import type { MediaItem } from "@/app/tpyes"

export function useMediaItems() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/media")
      if (!res.ok) throw new Error("Failed to fetch media")
      setItems(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const deleteItem = useCallback(async (id: string) => {
    await fetch(`/api/media/${id}`, { method: "DELETE" })
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  return { items, loading, error, refetch: fetchItems, deleteItem }
}


