import alchemy from "alchemy";
import { Nextjs } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("ugc", {
  stage: process.env.ALCHEMY_STAGE || "production",
  stateStore: (scope) => new CloudflareStateStore(scope),
});

export const web = await Nextjs("web", {
  cwd: "../../apps/web",
  bindings: {
    NEXT_PUBLIC_CONVEX_URL: alchemy.env.NEXT_PUBLIC_CONVEX_URL!,
    NEXT_PUBLIC_CONVEX_SITE_URL: alchemy.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
  },
  domains: ["ugp.gruckion.com"],
});

console.log(`Web    -> ${web.url}`);

await app.finalize();
