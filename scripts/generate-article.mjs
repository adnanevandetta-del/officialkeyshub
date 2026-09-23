#!/usr/bin/env node
/**
 * Auto-blog generator for Official Keys Hub.
 *
 * Picks the next `queued` keyword from content/blog/keywords.json, asks the
 * Claude API to write a house-style article, writes it as an MDX draft in
 * content/blog/, and flips the keyword to `drafted`. A GitHub Action runs this
 * on a schedule and opens a PR; merging the PR publishes the article.
 *
 * Env:
 *   ANTHROPIC_API_KEY  (required)
 *   ANTHROPIC_MODEL    (optional, default "claude-sonnet-5")
 *
 * Run: npm run generate:article
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const KEYWORDS_FILE = path.join(ROOT, "content", "blog", "keywords.json");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const BLOG_APP_DIR = path.join(ROOT, "app", "blog");

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
const SITE = "https://www.officialkeyshub.com";

function fail(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function reservedSlugs() {
  const set = new Set();
  // hand-written .tsx article folders
  try {
    for (const entry of fs.readdirSync(BLOG_APP_DIR, { withFileTypes: true })) {
      if (entry.isDirectory() && entry.name !== "[slug]") set.add(entry.name);
    }
  } catch {}
  // existing MDX files
  try {
    for (const f of fs.readdirSync(CONTENT_DIR)) {
      if (f.endsWith(".mdx")) set.add(f.replace(/\.mdx$/, ""));
    }
  } catch {}
  return set;
}

function buildPrompt(item) {
  const wanted = item.title ? `Suggested title: "${item.title}". ` : "";
  return `You are an expert SEO content writer for Official Keys Hub, an independent online store that sells GENUINE Microsoft software licenses (Windows, Office, Windows Server, Visio, Project, SQL Server, Visual Studio) and popular antivirus keys.

Write one original, genuinely helpful blog article targeting the keyword: "${item.keyword}". ${wanted}

BRAND FACTS you may use (do not contradict, do not invent others):
- Licenses are genuine and activate directly on Microsoft's servers.
- Instant delivery by email/WhatsApp after payment.
- 30-day money-back guarantee; free replacement if a key fails.
- Independent reseller operating lawfully under EU resale rights (UsedSoft v. Oracle).
- 24/7 support on WhatsApp and email.
- Product catalog lives at ${SITE}/products.

STYLE:
- Helpful, trustworthy, plain English. UK/US neutral. No hype, no fake urgency.
- 900-1400 words. Skimmable: short paragraphs, "##" and "###" headings, bullet/numbered lists, and a comparison table where useful.
- Include a short "## Frequently asked questions" section with 3-4 Q&As (### question, then answer).
- Add 1-3 relevant internal links using root-relative markdown links, e.g. [Windows 11 Pro](/products/windows-11-pro), [our blog](/blog), or a specific product/guide. Only link to plausible paths under /products or /blog.
- Do NOT invent statistics, prices, reviews, or legal claims beyond the brand facts above. If you mention a price, keep it general ("from around $30") rather than exact.
- Do NOT include a top-level "# H1" heading (the page renders the title separately). Start with a 1-2 sentence intro paragraph, then the first "##" section.
- Output GitHub-flavored Markdown for the body (this becomes MDX; avoid raw HTML and avoid import/export statements).

Respond with ONLY a JSON object (no markdown fences, no commentary) with exactly these fields:
{
  "title": "60 chars or fewer, compelling, includes the main keyword",
  "description": "meta description, 150 chars or fewer",
  "excerpt": "1-2 sentence summary for the blog card, 160 chars or fewer",
  "category": "one of: Buying, Activation, Comparison, Guide, Legal, Security",
  "readTime": "e.g. \\"8 min\\"",
  "keywords": "comma-separated list of 5-8 keywords",
  "body_mdx": "the full article body in Markdown/MDX"
}`;
}

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 6000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    fail(`Anthropic API error ${res.status}: ${text.slice(0, 500)}`);
  }
  const json = await res.json();
  const text = (json.content || []).map((b) => b.text || "").join("").trim();
  if (!text) fail("Empty response from Anthropic API.");
  return text;
}

function parseArticle(text) {
  // Be forgiving: extract the outermost JSON object.
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) fail("No JSON object found in model response.");
  let obj;
  try {
    obj = JSON.parse(text.slice(start, end + 1));
  } catch (e) {
    fail(`Could not parse model JSON: ${e.message}`);
  }
  for (const f of ["title", "description", "excerpt", "category", "readTime", "keywords", "body_mdx"]) {
    if (!obj[f] || typeof obj[f] !== "string") fail(`Model output missing field: ${f}`);
  }
  return obj;
}

function yamlEscape(s) {
  return String(s).replace(/"/g, '\\"');
}

function main() {
  if (!API_KEY) fail("ANTHROPIC_API_KEY is not set.");

  const queue = JSON.parse(fs.readFileSync(KEYWORDS_FILE, "utf8"));
  const items = queue.keywords || [];
  const item = items.find((k) => k.status === "queued");
  if (!item) {
    console.log("No queued keywords left — nothing to generate. Add more to content/blog/keywords.json.");
    process.exit(0);
  }

  console.log(`→ Generating article for keyword: "${item.keyword}" (model: ${MODEL})`);

  callClaude(buildPrompt(item))
    .then((text) => {
      const a = parseArticle(text);
      const reserved = reservedSlugs();
      let slug = slugify(item.slug || a.title || item.keyword);
      if (reserved.has(slug)) slug = `${slug}-${new Date().getFullYear()}`;
      let n = 2;
      const base = slug;
      while (reserved.has(slug)) slug = `${base}-${n++}`;

      const today = new Date().toISOString().slice(0, 10);
      const image =
        item.image ||
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80";

      const frontmatter = [
        "---",
        `title: "${yamlEscape(a.title)}"`,
        `description: "${yamlEscape(a.description)}"`,
        `excerpt: "${yamlEscape(a.excerpt)}"`,
        `category: "${yamlEscape(a.category)}"`,
        `date: "${today}"`,
        `readTime: "${yamlEscape(a.readTime)}"`,
        `keywords: "${yamlEscape(a.keywords)}"`,
        `image: "${yamlEscape(image)}"`,
        `draft: false`,
        "---",
        "",
      ].join("\n");

      fs.mkdirSync(CONTENT_DIR, { recursive: true });
      const outFile = path.join(CONTENT_DIR, `${slug}.mdx`);
      fs.writeFileSync(outFile, frontmatter + a.body_mdx.trim() + "\n", "utf8");

      item.status = "drafted";
      item.slug = slug;
      item.draftedAt = today;
      fs.writeFileSync(KEYWORDS_FILE, JSON.stringify(queue, null, 2) + "\n", "utf8");

      console.log(`✓ Wrote ${path.relative(ROOT, outFile)}`);
      console.log(`  Title: ${a.title}`);

      // Expose values to the GitHub Action.
      if (process.env.GITHUB_OUTPUT) {
        fs.appendFileSync(
          process.env.GITHUB_OUTPUT,
          `slug=${slug}\ntitle=${a.title}\ngenerated=true\n`
        );
      }
      if (process.env.GITHUB_STEP_SUMMARY) {
        fs.appendFileSync(
          process.env.GITHUB_STEP_SUMMARY,
          `### 📝 New draft article\n- **Title:** ${a.title}\n- **Slug:** \`${slug}\`\n- **Keyword:** ${item.keyword}\n- **File:** \`content/blog/${slug}.mdx\`\n`
        );
      }
    })
    .catch((e) => fail(e.message || String(e)));
}

main();
