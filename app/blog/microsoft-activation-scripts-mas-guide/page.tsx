import { permanentRedirect } from "next/navigation";

// This article was retired: a store selling genuine licenses should not host a
// guide to unauthorized activation tools. Old links and search traffic are sent
// permanently (308) to the closest genuine-keys article instead.
export default function RetiredMasGuide() {
  permanentRedirect("/blog/cheap-windows-keys-safe");
}
