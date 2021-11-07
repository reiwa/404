export const useURL = (text: string) => {
  try {
    const url = new URL(text)

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null
    }

    if (!url.hostname.includes(".")) {
      return null
    }

    if (url.hostname.endsWith(".")) {
      return null
    }

    return url
  } catch (error) {
    return null
  }
}
