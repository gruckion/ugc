# UGC Creator Platform

A UGC-first marketplace built around trust, escrow, and real-world workflow. Designed to fix the problems creators and brands experience on existing platforms like Fiverr.

## One-Line Summary

> A UGC platform where scripts are approved before filming, payments are secured upfront, timelines only start after product delivery, and trust is enforced by the system.

## Core Concept

**For Brands:** Guided brief creation with AI script generation. Creators can't be contacted until everything is locked and payment is secured.

**For Creators:** Every brief is execution-ready. Payment is guaranteed. No chasing, no ambiguity, no scope creep.

---

## Documentation Index

| Document | Description | Status |
|----------|-------------|--------|
| [raw_requirements.md](./raw_requirements.md) | Full platform specification | Complete |
| [user-personas.md](./user-personas.md) | 7 user personas (Brand, Creator, Admin) | Complete |
| [user-flows.md](./user-flows.md) | Mermaid diagrams for Brand & Creator flows | Complete |
| [features.md](./features.md) | Feature breakdown (MVP vs Phase 2) | Complete |

---

## Project Status

**Phase:** Product Discovery

**Completed:**

- Platform concept and USP
- Brand user flow (18 steps)
- Creator user flow (16 steps)
- User personas (7 defined)
- Feature prioritization (MVP vs Phase 2)

**Open Questions:** See [user-flows.md](./user-flows.md#questions-for-product-sponsor)

**Next Steps:**

- Data model design
- Subscription tier definition
- Trust system specification
- Technical architecture

---

## Key Differentiators

1. **Script-first workflow** - Brands approve scripts before contacting creators
2. **Escrow by default** - Payment secured before work begins
3. **Entity-based identity** - Brand reputation can't be reset with new email
4. **Fair timelines** - Deadlines start after product delivery confirmation
5. **Auto-approval** - Silence can't be used as leverage against creators
6. **Separate AI lane** - AI-generated content never uses creator work

---

## Document Structure

```
ugc/
├── README.md              # This file - project overview
├── raw_requirements.md    # Full specification (concept, USP, flows)
├── user-personas.md       # Brand, Creator, Admin personas
├── user-flows.md          # Mermaid flow diagrams
└── features.md            # MVP vs Phase 2 feature breakdown
```
