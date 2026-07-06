import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/facilities",
  "/sustainability",
  "/clients",
  "/contact",
];

const OUT_DIR = ".output/public";
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;

function routeToFile(route) {
  if (route === "/") return join(OUT_DIR, "index.html");
  return join(OUT_DIR, route.slice(1), "index.html");
}

async function waitForServer(ms = 15000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Production server did not start in time");
}

async function prerender() {
  const server = spawn("node", [".output/server/index.mjs"], {
    env: { ...process.env, PORT: String(PORT), NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  server.stderr?.on("data", (chunk) => process.stderr.write(chunk));

  try {
    await waitForServer();

    for (const route of ROUTES) {
      const res = await fetch(`${BASE}${route}`);
      if (!res.ok) {
        throw new Error(`Prerender failed for ${route}: HTTP ${res.status}`);
      }
      const html = await res.text();
      const file = routeToFile(route);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, html);
      console.log(`  ✓ ${route} → ${file}`);
    }

    console.log(`Prerendered ${ROUTES.length} routes into ${OUT_DIR}`);
  } finally {
    try {
      server.kill("SIGTERM");
    } catch {
      // process may already be stopped
    }
  }
}

prerender()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
