import { AppFrame } from '@/components/ui/AppFrame'
import { Chip } from '@/components/ui/atoms'
import { CountUp } from '@/components/ui/CountUp'
import { EvHead, Kpi, KpiGrid, Panel, PanelTitle, TaskRow, TwoCol } from './primitives'
import { cn } from '@/lib/cn'

const sidebar = ['Overview', 'Budget', 'Expenses', 'Suppliers', 'Proposals', 'Tasks', 'Guests', 'Reports']

const unit = 'text-[13px] font-semibold text-muted'

/** Static recreation of the product dashboard used as the hero image. */
export function HeroDashboard() {
  return (
    <AppFrame url="app.eventplanon.com/events/partner-summit">
      <div className="grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)]">
        <div className="hidden content-start gap-0.5 border-r border-line bg-[#FBF9F6] px-2.5 py-3.5 sm:grid">
          {sidebar.map((item, i) => (
            <div
              key={item}
              className={cn(
                'flex items-center gap-2 rounded-lg px-[9px] py-[7px] text-[12.5px] font-medium',
                i === 0 ? 'bg-paper text-ink shadow-soft' : 'text-muted',
              )}
            >
              <i className={cn('size-[7px] rounded-[2px]', i === 0 ? 'bg-coral' : 'bg-current opacity-50')} />
              {item}
            </div>
          ))}
        </div>

        <div className="grid min-w-0 gap-3.5 p-[18px]">
          <EvHead
            title="Partner Summit 2027"
            sub="18–19 Mar · Darling Harbour, Sydney · 42 days to go"
            chip={<Chip tone="ok">● On track</Chip>}
          />

          <KpiGrid>
            <Kpi label="Registrations" bar={{ value: 84 }}>
              <CountUp value={842} delay={0.8} /> <span className={unit}>/ 1,000</span>
            </Kpi>
            <Kpi label="Budget used" bar={{ value: 62, tone: 'bg-info' }}>
              $<CountUp value={186.4} decimals={1} delay={0.8} />k
            </Kpi>
            <Kpi label="Tasks done" bar={{ value: 78, tone: 'bg-ok' }}>
              <CountUp value={128} delay={0.8} /> <span className={unit}>/ 164</span>
            </Kpi>
          </KpiGrid>

          <TwoCol>
            <Panel>
              <PanelTitle aside="last 6 weeks">Registrations</PanelTitle>
              <svg viewBox="0 0 300 84" preserveAspectRatio="none" className="block h-[84px] w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="heroSparkFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#E95A78" stopOpacity=".28" />
                    <stop offset="1" stopColor="#E95A78" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 20H300M0 50H300" stroke="#F0EBE3" strokeWidth="1" />
                <path data-spark="area" d="M0 76 L50 68 L100 60 L150 46 L200 38 L250 22 L300 12 L300 84 L0 84Z" fill="url(#heroSparkFill)" />
                <path
                  data-spark="line"
                  pathLength={1}
                  d="M0 76 L50 68 L100 60 L150 46 L200 38 L250 22 L300 12"
                  fill="none"
                  stroke="#E95A78"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle data-spark="dot" cx="296" cy="13" r="4" fill="#fff" stroke="#E95A78" strokeWidth="2.5" />
              </svg>
            </Panel>
            <Panel>
              <PanelTitle aside="5">Due this week</PanelTitle>
              <TaskRow animate label="Confirm AV vendor" done owner="RK" />
              <TaskRow animate label="Finalise keynote run sheet" owner="AM" />
              <TaskRow animate label="Send badge proofs to print" owner="SL" />
              <TaskRow animate label="Catering headcount" owner="JP" />
            </Panel>
          </TwoCol>
        </div>
      </div>
    </AppFrame>
  )
}
