# User Flow Diagram Key

Visual reference for node types used in user flow diagrams.

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
    subgraph row1[" "]
        direction LR
        A([Start/End])
        B[User Action]
        C{User Decision}
    end

    subgraph row2[" "]
        direction LR
        D{System Decision}
        E[/Input or Output/]
    end

    subgraph row3["Connections"]
        direction LR
        F[Step A] --> G[Step B]
        H[Step C] -.-> I[Optional Step]
    end

    row1 ~~~ row2
    row2 ~~~ row3

    %% Node Styles
    classDef startEnd fill:#1e293b,stroke:#1e293b,stroke-width:2px,color:#ffffff
    classDef userAction fill:#ede9fe,stroke:#c4b5fd,stroke-width:2px,color:#4c1d95
    classDef userDecision fill:#f3e8ff,stroke:#d8b4fe,stroke-width:2px,color:#581c87
    classDef systemDecision fill:#e0f2fe,stroke:#7dd3fc,stroke-width:2px,color:#0c4a6e
    classDef dataIO fill:#f1f5f9,stroke:#cbd5e1,stroke-width:2px,color:#334155
    classDef hidden fill:none,stroke:none

    %% Apply styles
    class A startEnd
    class B,F,G,H,I userAction
    class C userDecision
    class D systemDecision
    class E dataIO
    class row1,row2 hidden
```

## Node Types

| Node                | Shape                | Color      | Use For                          |
| ------------------- | -------------------- | ---------- | -------------------------------- |
| **Start/End**       | Stadium `([])`       | Slate 800  | Entry and exit points of a flow  |
| **User Action**     | Rectangle `[]`       | Violet 100 | Steps the user actively performs |
| **User Decision**   | Diamond `{}`         | Purple 100 | Choices made by the user         |
| **System Decision** | Diamond `{}`         | Sky 100    | Automated/conditional logic      |
| **Data I/O**        | Parallelogram `[//]` | Slate 100  | Information entering or leaving  |

## Connection Types

| Connection          | Syntax         | Use For                                |
| ------------------- | -------------- | -------------------------------------- |
| **Flow**            | `-->`          | Standard progression between steps     |
| **Optional/Repeat** | `-.->`         | Loops, optional paths, or return flows |
| **Labeled**         | `--\|Label\|>` | Conditional branches with descriptions |

## Color Palette

| Role            | Background | Border    | Text      |
| --------------- | ---------- | --------- | --------- |
| Start/End       | `#1e293b`  | `#1e293b` | `#ffffff` |
| User Action     | `#ede9fe`  | `#c4b5fd` | `#4c1d95` |
| User Decision   | `#f3e8ff`  | `#d8b4fe` | `#581c87` |
| System Decision | `#e0f2fe`  | `#7dd3fc` | `#0c4a6e` |
| Data I/O        | `#f1f5f9`  | `#cbd5e1` | `#334155` |
| Subgraph        | `#fafafa`  | `#e5e5e5` | —         |
| Lines           | —          | `#64748b` | —         |
