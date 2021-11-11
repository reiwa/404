export type AppShotMinimal = {
  id: string
  title: string
  hostname: string
  file: {
    id: string
    width: number
    height: number
    url: string
  } | null
}
