import { captureException } from "@sentry/node"
import { createClient } from "@supabase/supabase-js"
import fs from "fs/promises"
import { Id, Url } from "integrations/domain"
import { EnvAdapter } from "integrations/infrastructure/adapters/env.adapter"
import { tmpdir } from "os"
import { injectable } from "tsyringe"

@injectable()
export class StorageAdapter {
  constructor(private envAdapter: EnvAdapter) {}

  async upload(props: { bucketId: Id; fileId: Id }) {
    try {
      const supabase = createClient(
        this.envAdapter.supabaseURL,
        this.envAdapter.supabaseKey
      )

      const filePath = `${tmpdir()}/${props.fileId.value}.png`

      const file = await fs.readFile(filePath)

      const upload = await supabase.storage
        .from(props.bucketId.value)
        .upload(props.fileId.value, file, {
          upsert: true,
          contentType: "image/png",
        })

      if (upload.error !== null) {
        return upload.error
      }

      const getPublicUrl = supabase.storage
        .from(props.bucketId.value)
        .getPublicUrl(props.fileId.value)

      if (getPublicUrl.error !== null) {
        return getPublicUrl.error
      }

      if (getPublicUrl.data === null) {
        return new Error("Upload failed")
      }

      return { url: new Url(getPublicUrl.data.publicURL) }
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new Error(error.message)
      }

      return new Error()
    }
  }
}
