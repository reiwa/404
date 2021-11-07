import { BlitzConfig } from "blitz"

if (typeof process.env.SUPABASE_URL === "undefined") {
  throw new Error("Missing environment variable SUPABASE_URL")
}

const supabaseURL = new URL(process.env.SUPABASE_URL)

const config: BlitzConfig = {
  log: { level: "error" },
  images: {
    domains: [supabaseURL.host],
  },
}

module.exports = config
