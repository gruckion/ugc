# UGC Platform User Flows

This document contains the user flow diagrams for the UGC Creator App, visualizing the end-to-end journeys for both Brands and Creators.

---

## Questions for Product Sponsor

The following questions need clarification before finalizing the implementation:

### 1. Auto-accept Path Convergence

After "Creator sourcing", do manual selection and auto-accept both converge at "Booking and escrow", or does auto-accept skip steps entirely?

**Current assumption**: Both paths converge at the same escrow step, with auto-accept simply automating the selection decision.

### 2. Revision Limits Edge Case

What happens when the revision limit is reached but the brand still requests changes?

- Does this trigger dispute escalation?
- Can the brand pay for additional revisions?
- Is auto-approval forced?

### 3. Product Delivery Timeout

What happens if tracking shows the product as delivered but the creator doesn't confirm receipt?

- Is there a timeout period?
- Does tracking confirmation auto-advance the workflow?
- What dispute mechanism exists?

### 4. Usage Monitoring Requirements

Is connecting ad accounts required for paid usage jobs, or is it optional with manual verification as fallback?

- Required: Jobs with paid usage cannot proceed without connected accounts
- Optional: Brands can manually verify/report usage compliance

---

## Brand User Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {
  'primaryColor': '#ede9fe',
  'primaryTextColor': '#4c1d95',
  'primaryBorderColor': '#c4b5fd',
  'lineColor': '#64748b',
  'secondaryColor': '#f3e8ff',
  'tertiaryColor': '#fafafa',
  'background': '#ffffff',
  'clusterBkg': '#fafafa',
  'clusterBorder': '#e5e5e5',
  'edgeLabelBackground': '#ffffff'
}}}%%

flowchart TD
    subgraph Onboarding["1. Onboarding"]
        A([Start: Brand lands on platform]) --> B[1. Entry & Expectation Setting]
        B --> C[/Brand name, email, password/]
        C --> D[2. Brand Account Creation]
        D --> E[3. Subscription Selection]
        E --> F[/Website, logo, social accounts/]
        F --> G[4. Onboarding & Verification]
        G --> H[5. Brand Dashboard]
    end

    subgraph BriefCreation["2. Brief Creation"]
        H --> I[/Product, audience, deliverables, budget/]
        I --> J[6. Create Brief]
        J --> K[7. AI Script Generation]
        K --> L{Script acceptable?}
        L -->|Edit/Regenerate| K
        L -->|Approve| M[8. Script Approval & Lock]
    end

    subgraph CreatorEngagement["3. Creator Engagement"]
        M --> N[9. Creator Sourcing]
        N --> O{Auto-accept enabled?}
        O -->|Yes| P[Set criteria: level, score, badges]
        O -->|No| Q[10a. Manual Creator Selection]
        P --> R[10b. Auto-accept Path]
        Q --> S[11. Booking & Escrow]
        R --> S
        S --> T[/Payment secured in escrow/]
    end

    subgraph Production["4. Production"]
        T --> U{Product required?}
        U -->|Yes| V[12. Product Shipping]
        V --> W[/Courier & tracking details/]
        W --> X{Delivery confirmed?}
        X -->|No| W
        X -->|Yes| Y[13. In-Production Phase]
        U -->|No| Y
        Y --> Z[14. Submission & Review]
    end

    subgraph Completion["5. Completion"]
        Z --> AA{Revisions needed?}
        AA -->|Yes, in-scope| AB[Request Revision]
        AB --> Z
        AA -->|No| AC{Brand responds?}
        AC -->|Approve| AD[15. Approval & Payout]
        AC -->|No response| AE[Auto-approval Triggered]
        AE --> AD
        AD --> AF[16. Usage Compliance & Monitoring]
        AF --> AG{Usage exceeds scope?}
        AG -->|Yes| AH[Notify & offer extension]
        AG -->|No| AI[17. Completion & Trust Progression]
        AH --> AI
        AI --> AJ[18. Repeat Usage]
        AJ --> AK([End: Return to Dashboard])
        AK -.->|New brief| H
    end

    %% Node Styles
    classDef startEnd fill:#1e293b,stroke:#1e293b,stroke-width:2px,color:#ffffff
    classDef userAction fill:#ede9fe,stroke:#c4b5fd,stroke-width:2px,color:#4c1d95
    classDef userDecision fill:#f3e8ff,stroke:#d8b4fe,stroke-width:2px,color:#581c87
    classDef systemDecision fill:#e0f2fe,stroke:#7dd3fc,stroke-width:2px,color:#0c4a6e
    classDef dataIO fill:#f1f5f9,stroke:#cbd5e1,stroke-width:2px,color:#334155

    %% Apply styles
    class A,AK startEnd
    class B,D,E,G,H,J,K,M,N,P,Q,R,S,V,Y,Z,AB,AD,AE,AF,AH,AI,AJ userAction
    class L,O,AA,AC userDecision
    class U,X,AG systemDecision
    class C,F,I,T,W dataIO
```

### Brand Flow Steps Summary

| Step | Name                            | Type                          |
| ---- | ------------------------------- | ----------------------------- |
| 1    | Entry & Expectation Setting     | Process                       |
| 2    | Brand Account Creation          | Process + Input               |
| 3    | Subscription Selection          | Process                       |
| 4    | Onboarding & Verification       | Process + Input               |
| 5    | Brand Dashboard                 | Process                       |
| 6    | Create Brief                    | Process + Input               |
| 7    | AI Script Generation            | Process                       |
| 8    | Script Approval & Lock          | Process + Decision            |
| 9    | Creator Sourcing                | Process                       |
| 10   | Creator Selection / Auto-accept | Decision                      |
| 11   | Booking & Escrow                | Process + Output              |
| 12   | Product Shipping                | Process + Input (conditional) |
| 13   | In-Production Phase             | Process                       |
| 14   | Submission & Review             | Process                       |
| 15   | Approval & Payout               | Process + Decision            |
| 16   | Usage Compliance & Monitoring   | Process + Decision            |
| 17   | Completion & Trust Progression  | Process                       |
| 18   | Repeat Usage                    | Process                       |

---

## Creator User Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {
  'primaryColor': '#ede9fe',
  'primaryTextColor': '#4c1d95',
  'primaryBorderColor': '#c4b5fd',
  'lineColor': '#64748b',
  'secondaryColor': '#f3e8ff',
  'tertiaryColor': '#fafafa',
  'background': '#ffffff',
  'clusterBkg': '#fafafa',
  'clusterBorder': '#e5e5e5',
  'edgeLabelBackground': '#ffffff'
}}}%%

flowchart TD
    subgraph Onboarding["1. Onboarding"]
        A([Start: Creator lands on platform]) --> B[1. Entry & Expectation Setting]
        B --> C[/Name, email, password/]
        C --> D[2. Creator Account Creation]
        D --> E[/Niches, styles, languages, portfolio/]
        E --> F[3. Creator Profile Setup]
        F --> G[4. Trust & Verification]
        G --> H[5. Creator Dashboard]
    end

    subgraph BriefEngagement["2. Brief Engagement"]
        H --> I[6. Brief Discovery]
        I --> J[/View: script, deliverables, usage, budget/]
        J --> K{Interested in brief?}
        K -->|No| I
        K -->|Yes| L{Auto-accept criteria met?}
        L -->|Yes| M[7b. Auto-accepted]
        L -->|No| N[7a. Apply for Brief]
        N --> O{Brand accepts?}
        O -->|No| I
        O -->|Yes| P[8. Order Confirmation]
        M --> P
        P --> Q[/Payment secured status shown/]
    end

    subgraph Production["3. Production"]
        Q --> R{Product required?}
        R -->|Yes| S[9. Product Delivery]
        S --> T{Delivery confirmed?}
        T -->|No| S
        T -->|Yes| U[10. In-Production Phase]
        R -->|No| U
        U --> V[11. Submission]
        V --> W{Revisions requested?}
        W -->|Yes, in-scope| X[12. Complete Revisions]
        X --> V
        W -->|No| Y{Brand responds?}
    end

    subgraph Completion["4. Completion"]
        Y -->|Approve| Z[13. Approval & Payout]
        Y -->|No response| AA[Auto-approval Triggered]
        AA --> Z
        Z --> AB[/Funds released to wallet/]
        AB --> AC[14. Trust Progression & Rewards]
        AC --> AD[15. Reviews & History]
        AD --> AE[16. Repeat Work]
        AE --> AF([End: Return to Dashboard])
        AF -.->|Browse briefs| I
    end

    %% Node Styles
    classDef startEnd fill:#1e293b,stroke:#1e293b,stroke-width:2px,color:#ffffff
    classDef userAction fill:#ede9fe,stroke:#c4b5fd,stroke-width:2px,color:#4c1d95
    classDef userDecision fill:#f3e8ff,stroke:#d8b4fe,stroke-width:2px,color:#581c87
    classDef systemDecision fill:#e0f2fe,stroke:#7dd3fc,stroke-width:2px,color:#0c4a6e
    classDef dataIO fill:#f1f5f9,stroke:#cbd5e1,stroke-width:2px,color:#334155

    %% Apply styles
    class A,AF startEnd
    class B,D,F,G,H,I,M,N,P,S,U,V,X,Z,AA,AC,AD,AE userAction
    class K,L,O,W,Y userDecision
    class R,T systemDecision
    class C,E,J,Q,AB dataIO
```

### Creator Flow Steps Summary

| Step | Name                        | Type                             |
| ---- | --------------------------- | -------------------------------- |
| 1    | Entry & Expectation Setting | Process                          |
| 2    | Creator Account Creation    | Process + Input                  |
| 3    | Creator Profile Setup       | Process + Input                  |
| 4    | Trust & Verification        | Process                          |
| 5    | Creator Dashboard           | Process                          |
| 6    | Brief Discovery             | Process                          |
| 7    | Apply / Auto-accept         | Decision                         |
| 8    | Order Confirmation          | Process + Output                 |
| 9    | Product Delivery            | Process (conditional)            |
| 10   | In-Production Phase         | Process                          |
| 11   | Submission                  | Process                          |
| 12   | Revisions                   | Process + Decision (conditional) |
| 13   | Approval & Payout           | Process                          |
| 14   | Trust Progression & Rewards | Process                          |
| 15   | Reviews & History           | Process                          |
| 16   | Repeat Work                 | Process                          |

---

## Flow Symbol Legend

| Symbol     | Shape         | Color                | Meaning                    |
| ---------- | ------------- | -------------------- | -------------------------- |
| `([text])` | Stadium       | Slate 800 `#1e293b`  | Start or End point         |
| `[text]`   | Rectangle     | Violet 100 `#ede9fe` | User action / Process step |
| `{text}`   | Diamond       | Purple 100 `#f3e8ff` | User decision point        |
| `{text}`   | Diamond       | Sky 100 `#e0f2fe`    | System decision point      |
| `[/text/]` | Parallelogram | Slate 100 `#f1f5f9`  | Data input or output       |
| `-->`      | Arrow         | Slate 500 `#64748b`  | Flow direction             |
| `-.->`     | Dashed arrow  | Slate 500 `#64748b`  | Optional/repeat path       |
| `subgraph` | Container     | Gray 50 `#fafafa`    | Logical phase grouping     |

### Design System Classes

```
classDef startEnd       fill:#1e293b, stroke:#1e293b, stroke-width:2px, color:#ffffff
classDef userAction     fill:#ede9fe, stroke:#c4b5fd, stroke-width:2px, color:#4c1d95
classDef userDecision   fill:#f3e8ff, stroke:#d8b4fe, stroke-width:2px, color:#581c87
classDef systemDecision fill:#e0f2fe, stroke:#7dd3fc, stroke-width:2px, color:#0c4a6e
classDef dataIO         fill:#f1f5f9, stroke:#cbd5e1, stroke-width:2px, color:#334155
```

### Color Rationale

- **Slate (Start/End)** — High contrast anchors that ground the flow
- **Violet (User Actions)** — Primary user steps; purple suggests agency and control
- **Purple (User Decisions)** — Branch points where users make choices
- **Sky (System Decisions)** — Automated/system branch points; blue signals system behavior
- **Slate light (Data I/O)** — Neutral, doesn't compete with semantic colors
