/**
 * Post-build step: writes a static HTML file per route with that page's own <title>, meta description,
 * canonical URL, social tags, JSON-LD and a text fallback, so search engines and AI answer engines that do
 * not run JavaScript still see real content. Also writes sitemap.xml and robots.txt, and enforces SEO limits.
 *
 * Run automatically by `npm run build`. Needs `dist/` from `vite build`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

// Load the TypeScript data modules through Vite so aliases and extensionless imports resolve.
const vite = await createServer({ root, appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' })
const { ALL_PATHS, getSeo, SITE_URL, OG_IMAGE } = await vite.ssrLoadModule('/src/data/seo.ts')
const { FAQS, USE_CASES, MODULES, SOLUTIONS } = await vite.ssrLoadModule('/src/data/content.ts')
const { BLOG_POSTS, getPost } = await vite.ssrLoadModule('/src/data/blog.ts')
await vite.close()

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const absolute = (p) => `${SITE_URL}${p === '/' ? '' : p}`

const template = await readFile(join(dist, 'index.html'), 'utf8')

function setTag(html, pattern, tag) {
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

const faqHtml = () =>
  `<h2>Frequently asked questions</h2>${FAQS.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.short)}</p><p>${esc(f.detail)}</p>`).join('')}`

function fallbackBody(path, seo) {
  const nav = [
    ['/', 'Home'],
    ['/platform', 'Platform'],
    ['/solutions', 'Solutions'],
    ['/use-cases', 'Use cases'],
    ['/ai', 'AI budgeting'],
    ['/pricing', 'Pricing'],
    ['/blog', 'Blog'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ]
    .map(([p, l]) => `<li><a href="${p}">${l}</a></li>`)
    .join('')
  let main = `<h1>${esc(seo.title.replace(/ \| Event Plan On$/, ''))}</h1><p>${esc(seo.definition)}</p><p>${esc(seo.description)}</p>`

  if (path === '/use-cases') {
    main += USE_CASES.map(
      (u) =>
        `<h2>${esc(u.title)}</h2><p>${esc(u.who)}</p><p>Problem: ${esc(u.problem)}</p><p>Solution: ${esc(u.solution)}</p><p>Event types: ${esc(u.eventTypes.join(', '))}</p>`,
    ).join('')
  } else if (path === '/solutions') {
    main += SOLUTIONS.map((x) => `<h2><a href="/solutions/${x.id}">${esc(x.title)}</a></h2><p>${esc(x.headline)} ${esc(x.text)}</p>`).join('')
  } else if (path.startsWith('/solutions/')) {
    const x = SOLUTIONS.find((y) => y.id === path.slice(11))
    if (x) main += `<h2>${esc(x.headline)}</h2><p>${esc(x.text)}</p><ul>${x.points.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
  } else if (path === '/platform') {
    main += MODULES.map((m) => `<h2>${esc(m.title)}</h2><p>${esc(m.text)}</p>`).join('')
  } else if (path.startsWith('/blog/')) {
    const post = getPost(path.slice(6))
    if (post) {
      main += `<p>${esc(post.intro)}</p>${post.sections
        .map(
          (s) =>
            `<h2>${esc(s.heading)}</h2>${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}${s.list ? `<ul>${s.list.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}`,
        )
        .join('')}<p>${esc(post.takeaway)}</p>`
    }
  } else if (path === '/blog') {
    main += `<ul>${BLOG_POSTS.map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a>: ${esc(p.excerpt)}</li>`).join('')}</ul>`
  }
  if (seo.faq) main += faqHtml()
  return `<noscript><header><nav aria-label="Primary"><ul>${nav}</ul></nav></header><main>${main}</main></noscript>`
}

const problems = []
const seen = new Map()
const placeholders = new Set()
const paths = ALL_PATHS()

const page = (path) => {
  const seo = getSeo(path)
  const url = absolute(path)

  if (seo.title.length >= 60) problems.push(`${path}: title is ${seo.title.length} chars (limit: under 60) "${seo.title}"`)
  if (seo.description.length >= 155) problems.push(`${path}: description is ${seo.description.length} chars (limit: under 155)`)
  for (const [kind, value] of [['title', seo.title], ['description', seo.description]]) {
    const key = `${kind}:${value}`
    if (seen.has(key)) problems.push(`${path}: duplicate ${kind} (also used by ${seen.get(key)})`)
    seen.set(key, path)
  }
  JSON.stringify(seo.jsonLd).match(/\[[^\]"]{1,60}\]/g)?.forEach((m) => placeholders.add(m))

  let html = template
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
  html = setTag(html, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(seo.description)}" />`)
  html = setTag(html, /<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  html = setTag(html, /<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${esc(seo.title)}" />`)
  html = setTag(html, /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${esc(seo.description)}" />`)
  html = setTag(html, /<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${url}" />`)
  html = setTag(html, /<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${esc(seo.title)}" />`)
  html = setTag(html, /<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`)
  html = html.replace(
    '</head>',
    `${seo.jsonLd.map((d) => `    <script type="application/ld+json" data-seo>${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('\n')}\n  </head>`,
  )
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${fallbackBody(path, seo)}`)
  return html
}

for (const path of paths) {
  const html = page(path)
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
  .map((p) => {
    const post = p.startsWith('/blog/') ? getPost(p.slice(6)) : undefined
    return `  <url><loc>${absolute(p)}</loc><lastmod>${post ? post.date : today}</lastmod></url>`
  })
  .join('\n')}\n</urlset>\n`
await writeFile(join(dist, 'sitemap.xml'), sitemap)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`prerender: wrote ${paths.length} pages, sitemap.xml and robots.txt (social image: ${OG_IMAGE})`)
if (placeholders.size) {
  console.warn(`prerender: placeholders still in schema markup (replace in src/config/business.ts): ${[...placeholders].join(' ')}`)
}
if (problems.length) {
  console.error('\nprerender: SEO checks failed:\n' + problems.map((p) => `  - ${p}`).join('\n'))
  process.exit(1)
}
console.log('prerender: all titles under 60 chars, all descriptions under 155 chars, all unique.')
