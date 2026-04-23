export type MediaType = "VIDEO" | "IMAGE" | "PDF"

export interface MediaItem {
  id: string
  name: string
  type: MediaType
  url: string
  size: number
  userId: string
  createdAt: string
}

export interface ScreenMedia {
  id: string
  screenId: string
  mediaItemId: string
  order: number
  assignedAt: string
  mediaItem: MediaItem
}

export interface Screen {
  id: string
  name: string
  position: number
  userId: string
  media: ScreenMedia[]
}
