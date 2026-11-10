import { PATHS } from '@/config/routes'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/site/PageHero'

export default function NotFound() {
  return (
    <PageHero
      tone="dark"
      eyebrow="Error 404"
      lines={['This page left']}
      accent="the venue."
      lede="The link may be old or mistyped. Head back home, or see how AI event budgeting works."
      className="min-h-screen"
    >
      <div className="mt-9 flex flex-wrap gap-3">
        <Button to={PATHS.home} size="lg" arrow>
          Back to home
        </Button>
        <Button to={PATHS.useCases} variant="line" size="lg">
          See how it works
        </Button>
      </div>
    </PageHero>
  )
}
