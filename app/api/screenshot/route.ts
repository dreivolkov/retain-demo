import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const maxDuration = 60;

const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.tar";

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export async function POST(req: NextRequest) {
  let targetUrl: string;
  try {
    const body = await req.json();
    if (!body?.url || typeof body.url !== "string") {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }
    targetUrl = normalizeUrl(body.url);
    new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

  // Disable WebGL/graphics acceleration — required in serverless environments
  chromium.setGraphicsMode = false;

  let browser;
  try {
    browser = await puppeteer.launch({
      args: isLocal ? [] : chromium.args,
      executablePath: isLocal
        ? process.env.CHROME_EXECUTABLE_PATH
        : await chromium.executablePath(CHROMIUM_PACK_URL),
      headless: "shell",
      defaultViewport: { width: 1440, height: 900 },
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 30000 });
    const buffer = await page.screenshot({ type: "png" });
    await browser.close();

    const base64 = Buffer.from(buffer).toString("base64");
    return NextResponse.json({ image: `data:image/png;base64,${base64}` });
  } catch (err) {
    if (browser) {
      try {
        await browser.close();
      } catch {
        // ignore
      }
    }
    const message = err instanceof Error ? err.message : "Screenshot failed";
    return NextResponse.json(
      { error: `Couldn't capture that page (${message}). Double-check the URL and try again.` },
      { status: 502 }
    );
  }
}
