import { PATHS, ROUTES } from '@/config/routes'
import { BUSINESS, CITIES, TRIAL_CTA } from '@/config/business'
import { MODULES, SOLUTIONS } from '@/data/content'
import { Container } from '@/components/ui/layout'
import logo from '@/assets/logo.png'
import { SiteLink } from './SiteLink'
import { NewsletterForm } from './NewsletterForm'
import { ContactList } from './ContactDetails'

const socials = [
  {
    label: 'LinkedIn',
    size: 17,
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z',
  },
  {
    label: 'X',
    size: 15,
    path: 'M17.8 3h3.3l-7.2 8.2L22.4 21h-6.6l-5.2-6.8L4.6 21H1.3l7.7-8.8L.9 3h6.8l4.7 6.2zm-1.2 16h1.8L6.6 4.9H4.7z',
  },
  {
    label: 'Facebook',
    size: 16,
    path: 'M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H17l.5-4h-4V8.8c0-.5.3-.8.5-.8z',
  },
  {
    label: 'YouTube',
    size: 18,
    path: 'M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.4 0-1.4 0-2.3 1C1.2 5.6 1 7.2 1 7.2S.8 9 .8 10.9v1.7c0 1.9.2 3.7.2 3.7s.2 1.6.9 2.3c.9.9 2 .9 2.6 1 1.8.2 7.5.2 7.5.2s4.6 0 7.8-.3c.4 0 1.4 0 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.7C23.2 9 23 7.2 23 7.2zM9.7 14.6V8.3l6 3.2z',
  },
]

const linkClass = 'hover:text-white'
const colTitle = 'mb-3.5 text-[13px] tracking-[.12em] text-white uppercase'
const list = 'm-0 grid list-none gap-2.5 p-0 text-[14.5px]'

export function Footer() {
  return (
    <footer data-tone="dark" className="overflow-hidden bg-navy pt-20 text-navy-text">
      <Container>
        <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,.9fr))_minmax(0,1.4fr)] lg:gap-x-8 xl:gap-x-10">
          <div className="col-span-2 lg:col-span-1">
            <p className="max-w-[26ch] font-serif text-[24px] leading-[1.2] text-white">Budget every event with confidence.</p>
            <NewsletterForm />
            <div className="mt-5 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={`${s.label} (placeholder link)`}
                  className="grid size-[38px] place-items-center rounded-[10px] border border-navy-line text-[#D7DCE8] hover:bg-navy-2 hover:text-white"
                >
                  <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={colTitle}>Platform</h4>
            <ul className={list}>
              {MODULES.slice(0, 5).map((m) => (
                <li key={m.id}>
                  <SiteLink className={linkClass} to={`${PATHS.platform}/${m.id}`}>
                    {m.label}
                  </SiteLink>
                </li>
              ))}
              <li>
                <SiteLink className={linkClass} to={PATHS.platform}>
                  All tools →
                </SiteLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={colTitle}>Solutions</h4>
            <ul className={list}>
              {SOLUTIONS.map((x) => (
                <li key={x.id}>
                  <SiteLink className={linkClass} to={`${PATHS.solutions}/${x.id}`}>
                    {x.title}
                  </SiteLink>
                </li>
              ))}
              <li>
                <SiteLink className={linkClass} to={PATHS.useCases}>
                  Use cases
                </SiteLink>
              </li>
              <li>
                <SiteLink className={linkClass} to={PATHS.pricing}>
                  Pricing
                </SiteLink>
              </li>
            </ul>
          </div>

          <div className="max-[28rem]:col-span-2">
            <h4 className={colTitle}>Company</h4>
            <ul className={list}>
              <li><SiteLink className={linkClass} to={PATHS.about}>About us</SiteLink></li>
              <li><SiteLink className={linkClass} to={PATHS.blog}>Blog</SiteLink></li>
              <li><SiteLink className={linkClass} to={PATHS.resources}>Resources</SiteLink></li>
              <li><SiteLink className={linkClass} to={PATHS.contact}>Contact</SiteLink></li>
              <li><SiteLink className={linkClass} to={PATHS.demo}>Book a demo</SiteLink></li>
              <li><a className={linkClass} href={ROUTES.signup} target="_blank" rel="noopener">{TRIAL_CTA}</a></li>
              <li><a className={linkClass} href={ROUTES.login} target="_blank" rel="noopener">Log in</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className={colTitle}>Contact</h4>
            <ContactList dark className="gap-4 text-[14.5px]" />
          </div>
        </div>

        <p className="mt-12 text-[14px]">
          Event management software for teams in {CITIES.slice(0, -1).join(', ')} and {CITIES[CITIES.length - 1]}.
        </p>

        <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-navy-line pt-6 text-[13.5px]">
          <span>
            © {new Date().getFullYear()} {BUSINESS.legalName} (ABN {BUSINESS.abn}), trading as {BUSINESS.brand}. All rights reserved.
          </span>
          <nav aria-label="Legal" className="flex flex-wrap gap-5">
            <a className={linkClass} href="#">Privacy Policy</a>
            <a className={linkClass} href="#">Terms of Service</a>
            <a className={linkClass} href="#">Security</a>
          </nav>
        </div>
      </Container>

      {/* Oversized wordmark */}
      <div className="mt-10 px-4 pb-8 md:px-8 md:pb-12">
        <img
          src={logo}
          alt="Event Plan On: AI event budgeting software for Australian event teams"
          className="mx-auto block w-full max-w-[1400px]"
        />
      </div>
    </footer>
  )
}
