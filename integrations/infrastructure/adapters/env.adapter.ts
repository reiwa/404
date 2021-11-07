import { injectable } from "tsyringe"

@injectable()
export class EnvAdapter {
  get supabaseURL() {
    return process.env.SUPABASE_URL + ""
  }

  get supabaseKey() {
    return process.env.SUPABASE_KEY + ""
  }
}
