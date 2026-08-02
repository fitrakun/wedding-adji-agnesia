import { expect, test } from "@playwright/test";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const forbidden = /(?:canva-page|full-page|page-\d+|invitation-0\d)\.(?:png|jpe?g|webp|avif)/i;

test("production source cannot reference flattened Canva pages", async () => {
  async function files(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true });
    return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
  }
  const sourceFiles = (await files(path.join(process.cwd(), "src"))).filter(file => /\.(?:ts|tsx|css)$/.test(file));
  for (const file of sourceFiles) expect(await readFile(file, "utf8"), file).not.toMatch(forbidden);
  const publicFiles = await files(path.join(process.cwd(), "public", "assets"));
  expect(publicFiles.map(file => path.basename(file)).filter(name => forbidden.test(name))).toEqual([]);
});
