import Link from "next/link"
import { siteConfig } from "@/config"

export const OpenSource = () => (
  <Link href={siteConfig.links.github} target={"_blank"}>
    <button className="btn m-4">开源贡献</button>
  </Link>
)
