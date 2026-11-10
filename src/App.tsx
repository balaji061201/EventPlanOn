import { lazy, Suspense, useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import { initSmoothScroll } from '@/lib/smooth'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { TransitionProvider } from '@/components/site/TransitionProvider'
import Home from '@/pages/Home'

/* Inner pages load on demand so the home page stays light */
const Platform = lazy(() => import('@/pages/Platform'))
const ModuleDetail = lazy(() => import('@/pages/ModuleDetail'))
const Solutions = lazy(() => import('@/pages/Solutions'))
const SolutionDetail = lazy(() => import('@/pages/SolutionDetail'))
const UseCases = lazy(() => import('@/pages/UseCases'))
const Ai = lazy(() => import('@/pages/Ai'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Demo = lazy(() => import('@/pages/Demo'))
const Resources = lazy(() => import('@/pages/Resources'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function SiteLayout() {
  useEffect(() => initSmoothScroll(), [])
  usePageMeta()

  return (
    <TransitionProvider>
      <a
        href="#main"
        className="absolute top-2 -left-[9999px] z-[400] rounded-[10px] bg-ink px-4 py-2.5 text-white focus:left-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </TransitionProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="platform" element={<Platform />} />
        <Route path="platform/:id" element={<ModuleDetail />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/:id" element={<SolutionDetail />} />
        <Route path="use-cases" element={<UseCases />} />
        <Route path="ai" element={<Ai />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="demo" element={<Demo />} />
        <Route path="resources" element={<Resources />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
