# User Personas

This document defines the primary user personas for the UGC Creator App platform.

---

## 1. Brand Users

### 1.1 Experienced Brand Manager

**Name:** Sarah, Marketing Director
**Company Type:** Established D2C brand with 50+ employees
**Experience:** 3+ years working with UGC creators

**Goals:**
- Source high-quality UGC content at scale
- Reduce time spent on back-and-forth communication
- Maintain consistent brand messaging across multiple creators
- Track ad usage compliance automatically

**Pain Points (on current platforms):**
- Endless messages and negotiations with creators
- Vague briefs leading to unusable content
- Chasing creators for revisions
- No visibility into whether usage rights are being honoured
- Team members creating duplicate accounts, losing history

**What She Values:**
- Efficiency and speed
- Predictable workflows
- Professional creators who deliver on time
- Clear audit trails for compliance

**Platform Behaviour:**
- Creates multiple briefs simultaneously
- Uses auto-accept for trusted creators
- Invites team members to collaborate
- Connects ad accounts for usage monitoring

---

### 1.2 New Brand Owner

**Name:** Marcus, Founder
**Company Type:** Early-stage e-commerce startup, 3 employees
**Experience:** First time commissioning UGC content

**Goals:**
- Get professional UGC content without expertise
- Avoid being taken advantage of
- Stay within budget
- Learn best practices

**Pain Points (on current platforms):**
- Doesn't know what to ask for
- Overwhelmed by creator options
- Unclear on usage rights and pricing
- Worried about paying for work that doesn't match expectations

**What He Values:**
- Guidance and structure
- Transparent pricing
- Protection from bad outcomes
- Learning as he goes

**Platform Behaviour:**
- Follows guided brief creation carefully
- Relies on AI-generated scripts
- Starts with single briefs before scaling
- Reads creator reviews thoroughly

---

### 1.3 Agency Account Manager

**Name:** Priya, Account Manager
**Company Type:** Digital marketing agency managing 15+ brands
**Experience:** 5+ years in performance marketing

**Goals:**
- Manage UGC campaigns for multiple clients efficiently
- Maintain quality standards across all accounts
- Provide clients with clear reporting
- Scale content production without scaling headcount

**Pain Points (on current platforms):**
- Managing multiple accounts is chaotic
- No unified view across clients
- Difficult to enforce agency standards
- Clients want visibility but platforms don't support it

**What She Values:**
- Multi-brand management
- Consistent processes
- Scalable workflows
- Professional reputation

**Platform Behaviour:**
- Creates brand entities for each client
- Establishes agency-wide creator relationships
- Uses saved scripts and templates
- Monitors all active orders from one dashboard

---

## 2. Creator Users

### 2.1 Professional UGC Creator

**Name:** Jordan, Full-time Creator
**Experience:** 2+ years creating UGC, 200+ completed projects
**Content Types:** Talking head, product demos, lifestyle

**Goals:**
- Maximise income while minimising admin
- Work with serious brands only
- Build long-term client relationships
- Protect creative work from misuse

**Pain Points (on current platforms):**
- Time wasted on enquiries that go nowhere
- Brands who don't know what they want
- Chasing payments
- Scope creep and endless revisions
- Usage rights violations

**What They Value:**
- Payment security
- Clear scope before starting
- Efficient workflows
- Professional treatment

**Platform Behaviour:**
- Completes verification for higher visibility
- Targets auto-accept eligibility
- Builds repeat relationships with trusted brands
- Maintains high reliability score

---

### 2.2 Emerging Creator

**Name:** Alex, Part-time Creator
**Experience:** 6 months creating content, 15 completed projects
**Content Types:** Talking head, basic product reviews

**Goals:**
- Build a portfolio and reputation
- Learn industry standards
- Generate consistent side income
- Grow into full-time creation

**Pain Points (on current platforms):**
- Competing with established creators
- Not knowing if briefs are legitimate
- Inconsistent income
- Learning what "good" looks like

**What They Value:**
- Fair opportunity regardless of experience
- Clear expectations
- Payment protection
- Growth pathway

**Platform Behaviour:**
- Takes diverse briefs to build portfolio
- Studies successful creators' profiles
- Focuses on reliability to build trust score
- Gradually increases rates as reputation grows

---

### 2.3 Specialist Creator

**Name:** Mei, Niche Expert
**Experience:** 4 years in specific vertical (beauty/skincare)
**Content Types:** Tutorial, before/after, ingredient breakdowns

**Goals:**
- Command premium rates for expertise
- Work only with brands that align with values
- Maintain authenticity and credibility
- Control how content is used

**Pain Points (on current platforms):**
- Generic marketplaces don't surface expertise
- Brands don't understand specialist value
- Risk of association with poor-quality products
- Usage violations damage personal brand

**What They Value:**
- Recognition of expertise
- Brand vetting capability
- Strict usage controls
- Premium positioning

**Platform Behaviour:**
- Maintains detailed niche profile
- Reviews brand history before accepting
- Negotiates specific usage terms
- Commands higher rates due to specialisation

---

## 3. Platform Administrators

### 3.1 Trust & Safety Admin

**Name:** Internal Role
**Responsibility:** Platform integrity and dispute resolution

**Goals:**
- Maintain fair marketplace for all users
- Resolve disputes quickly and fairly
- Identify and prevent abuse patterns
- Protect platform reputation

**Key Activities:**
- Review flagged disputes
- Link duplicate brand entities
- Investigate usage violations
- Enforce payment and delivery rules
- Merge brand histories where abuse is detected

**Tools Needed:**
- Dispute management dashboard
- Entity linking and merging
- Behavioural pattern detection
- Communication templates
- Escalation workflows

---

## Persona Relationships

```
Brand Users                          Creator Users
    │                                      │
    ├── Experienced Brand ◄──────────────► Professional Creator
    │   (auto-accept, scale)               (reliable, premium)
    │                                      │
    ├── New Brand ◄──────────────────────► Emerging Creator
    │   (guided, learning)                 (building reputation)
    │                                      │
    └── Agency ◄─────────────────────────► Specialist Creator
        (multi-brand, process)             (niche, premium)
                        │
                        ▼
              Platform Admin
              (trust, disputes)
```

---

## Key Insights by Persona

| Persona | Primary Motivation | Biggest Fear | Success Metric |
|---------|-------------------|--------------|----------------|
| Experienced Brand | Scale without chaos | Quality inconsistency | Orders per month |
| New Brand | Get it right first time | Wasting money | First successful delivery |
| Agency | Efficiency across clients | Client dissatisfaction | Client retention |
| Professional Creator | Income + efficiency | Non-payment, scope creep | Monthly earnings |
| Emerging Creator | Build reputation | No opportunities | Jobs completed |
| Specialist Creator | Premium recognition | Brand misalignment | Rate per video |
| Platform Admin | Fair marketplace | Abuse patterns | Dispute resolution rate |
