# Features

This document breaks down all platform features into MVP (Minimum Viable Product) and Phase 2 priorities.

**Prioritization Criteria:**

- **MVP:** Required for core user flows to function
- **Phase 2:** Enhances experience but not blocking launch
- **Future:** Nice-to-have, complex, or scale-dependent

---

## Core Features (MVP)

### Brand Features

| Feature                  | Description                                                     | User Flow Step |
|--------------------------|-----------------------------------------------------------------|----------------|
| Brand account creation   | Create brand entity with name, email, and password              | Brand 2        |
| Brand entity persistence | Trust history, reviews, disputes attach to entity (not email)   | Brand 2        |
| Subscription selection   | Choose tier, add payment method                                 | Brand 3        |
| Brand dashboard          | View active briefs, orders, trust status                        | Brand 5        |
| Guided brief creation    | Structured form: product, audience, deliverables, usage, budget | Brand 6        |
| Script approval          | Review, edit, approve AI-generated script                       | Brand 8        |
| Creator sourcing         | Open to marketplace, invite creators, invite-only               | Brand 9        |
| Manual creator selection | Review profiles, accept creators                                | Brand 10       |
| Order management         | Track order status through workflow states                      | Brand 12-14    |
| Submission review        | View deliverables, approve or request revisions                 | Brand 14       |
| Revision requests        | Request in-scope changes (limited, tracked)                     | Brand 14       |

### Creator Features

| Feature                   | Description                                              | User Flow Step |
|---------------------------|----------------------------------------------------------|----------------|
| Creator account creation  | Free signup with name, email, password                   | Creator 2      |
| Creator profile setup     | Niches, content styles, languages, turnaround, portfolio | Creator 3      |
| Creator dashboard         | View matched briefs, active orders, deadlines, score     | Creator 5      |
| Brief discovery           | Browse execution-ready briefs with locked details        | Creator 6      |
| Brief application         | Apply with confirmation (no long pitches)                | Creator 7      |
| Order confirmation        | See payment secured status                               | Creator 8      |
| Product delivery tracking | View shipping/tracking details                           | Creator 9      |
| Deliverable submission    | Upload final content                                     | Creator 11     |
| Revision completion       | Complete in-scope revisions                              | Creator 12     |
| Payout receipt            | Receive funds after approval                             | Creator 13     |

### Platform Features

| Feature              | Description                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------|
| AI script generation | Generate AIDA scripts, hooks, CTAs, shot lists from brief                                        |
| Script locking       | Lock script, deliverables, usage after approval                                                  |
| Escrow system        | Hold payment securely until approval                                                             |
| Order state machine  | Enforced states: Awaiting Delivery → In Production → Submitted → Revision → Approved → Completed |
| Timeline management  | Deadlines start only after product delivery confirmed                                            |
| Auto-approval        | Release payment if brand doesn't respond within window                                           |
| Commission deduction | Deduct platform fee on approval                                                                  |
| Basic matching       | Surface briefs to creators based on profile                                                      |

---

## Phase 2 Features

### Enhanced Brand Features

| Feature                   | Description                                         | Dependency          |
|---------------------------|-----------------------------------------------------|---------------------|
| Multi-user brand accounts | Invite team members, shared history                 | Brand entity system |
| Brand verification        | Connect domain, social accounts for Verified status | OAuth integration   |
| Ad account connection     | Link Meta/TikTok/Google ads for usage tracking      | OAuth integration   |
| Auto-accept configuration | Set criteria: level, score, badges, history         | Trust system        |
| Saved scripts/templates   | Reuse approved scripts for future briefs            | Brief system        |
| Saved creators            | Quick access to trusted creators                    | Order history       |

### Enhanced Creator Features

| Feature               | Description                            | Dependency            |
|-----------------------|----------------------------------------|-----------------------|
| Identity verification | KYC for higher trust visibility        | Verification provider |
| Location confirmation | Shipping address for physical products | Profile system        |
| Creator wallet        | Batch payouts, withdrawal scheduling   | Payment system        |
| Portfolio uploads     | Host portfolio content on platform     | Storage system        |

### Advanced Platform Features

| Feature                     | Description                                               | Dependency            |
|-----------------------------|-----------------------------------------------------------|-----------------------|
| Reliability scores          | Auto-calculated from behaviour (on-time, revisions, etc.) | Order history         |
| Integrity scores            | Brand behaviour tracking (approvals, disputes, payments)  | Order history         |
| Experience levels           | Progress through levels based on completed work           | Score system          |
| Trust badges                | Automatic, behaviour-based badges (On-Time Pro, etc.)     | Score system          |
| Auto-accept execution       | Automatically accept creators meeting criteria            | Trust system          |
| Reviews system              | Two-way reviews after completion                          | Order completion      |
| Usage compliance monitoring | Track ad usage against agreed scope                       | Ad account connection |
| Usage extension offers      | Notify brand, offer paid extension                        | Compliance monitoring |

---

## Future Considerations

### Advanced Marketplace

| Feature                 | Description                                     | Complexity |
|-------------------------|-------------------------------------------------|------------|
| AI matching algorithm   | ML-based creator recommendations                | High       |
| Creator search filters  | Advanced filtering by niche, rate, availability | Medium     |
| Brief templates library | Pre-built brief structures by industry          | Medium     |
| Bulk brief creation     | Create multiple similar briefs at once          | Medium     |

### Trust & Safety

| Feature                   | Description                               | Complexity |
|---------------------------|-------------------------------------------|------------|
| Dispute resolution system | Formal process with admin mediation       | High       |
| Brand entity linking      | Detect and merge duplicate brand accounts | High       |
| Fraud detection           | Identify suspicious behaviour patterns    | High       |
| Content moderation        | Review submitted content for violations   | Medium     |

### AI & Automation

| Feature                     | Description                                       | Complexity |
|-----------------------------|---------------------------------------------------|------------|
| AI-generated video lane     | Platform-created content (separate from creators) | High       |
| Smart revision suggestions  | AI-assisted revision scoping                      | Medium     |
| Automated compliance alerts | Proactive usage violation detection               | Medium     |

### Enterprise

| Feature                       | Description                                | Complexity |
|-------------------------------|--------------------------------------------|------------|
| Agency multi-brand management | Unified dashboard for multiple brands      | High       |
| White-label options           | Custom branding for enterprise clients     | High       |
| API access                    | Programmatic brief creation and management | High       |
| Advanced analytics            | Performance reporting, ROI tracking        | Medium     |

---

## Feature-to-User-Flow Mapping

### Brand Flow Coverage

| Flow Step           | MVP Features                      | Phase 2 Features                      |
|---------------------|-----------------------------------|---------------------------------------|
| 1. Entry            | -                                 | -                                     |
| 2. Account creation | Brand account, entity persistence | -                                     |
| 3. Subscription     | Subscription selection            | -                                     |
| 4. Onboarding       | -                                 | Multi-user, verification, ad accounts |
| 5. Dashboard        | Brand dashboard                   | Saved scripts, saved creators         |
| 6. Create brief     | Guided brief creation             | Brief templates                       |
| 7. AI script        | AI script generation              | -                                     |
| 8. Script lock      | Script approval, locking          | -                                     |
| 9. Creator sourcing | Open/invite sourcing              | Auto-accept config                    |
| 10. Selection       | Manual selection                  | Auto-accept execution                 |
| 11. Booking         | Escrow system                     | -                                     |
| 12. Shipping        | Order management                  | -                                     |
| 13. Production      | Order state machine               | -                                     |
| 14. Review          | Submission review, revisions      | -                                     |
| 15. Approval        | Auto-approval, commission         | -                                     |
| 16. Compliance      | -                                 | Usage monitoring, extension offers    |
| 17. Completion      | -                                 | Reviews, trust progression            |
| 18. Repeat          | -                                 | Saved scripts/creators                |

### Creator Flow Coverage

| Flow Step           | MVP Features                    | Phase 2 Features                |
|---------------------|---------------------------------|---------------------------------|
| 1. Entry            | -                               | -                               |
| 2. Account creation | Creator account                 | -                               |
| 3. Profile          | Profile setup                   | Portfolio uploads               |
| 4. Verification     | -                               | Identity verification, location |
| 5. Dashboard        | Creator dashboard               | -                               |
| 6. Discovery        | Brief discovery, basic matching | Advanced matching               |
| 7. Application      | Brief application               | Auto-accept                     |
| 8. Confirmation     | Order confirmation              | -                               |
| 9. Delivery         | Product tracking                | -                               |
| 10. Production      | -                               | -                               |
| 11. Submission      | Deliverable submission          | -                               |
| 12. Revisions       | Revision completion             | -                               |
| 13. Payout          | Payout receipt                  | Creator wallet                  |
| 14. Trust           | -                               | Scores, levels, badges          |
| 15. Reviews         | -                               | Reviews system                  |
| 16. Repeat          | -                               | Saved brands                    |

---

## MVP Scope Summary

**Total MVP Features:** 22 features across Brand, Creator, and Platform

**Key MVP Capabilities:**

1. Brands can create accounts, subscribe, and create briefs
2. AI generates scripts that brands approve and lock
3. Creators can sign up, build profiles, and discover briefs
4. Creators apply, brands select, payment goes to escrow
5. Orders flow through states with timeline management
6. Deliverables submitted, reviewed, revised if needed
7. Payment released on approval (or auto-approval)

**Explicitly NOT in MVP:**

- Trust scores, badges, levels (Phase 2)
- Auto-accept (Phase 2)
- Multi-user brand accounts (Phase 2)
- Ad account connection and usage monitoring (Phase 2)
- Reviews system (Phase 2)
- Dispute resolution (Future)
- AI-generated video lane (Future)
