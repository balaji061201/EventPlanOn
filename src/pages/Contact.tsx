import { PATHS } from '@/config/routes'
import { definitionFor } from '@/data/seo'
import { PageHero } from '@/components/site/PageHero'
import { ContactSection } from '@/components/site/ContactDetails'
import { TrialNote } from '@/components/site/TrialNote'
import { ClosingScene } from '@/components/story/ClosingScene'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={['Talk to a real']}
        accent="Australian team."
        lede={definitionFor(PATHS.contact)}
      >
        <TrialNote className="mt-6" />
      </PageHero>
      <ContactSection heading={false} className="pt-0 md:pt-0" />
      <ClosingScene />
    </>
  )
}
