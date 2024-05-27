# Weavenn - Hedera <> Keyban Planning

## Wallet as a service SDK Team Composition

| Profil                   | Team mate                           |
| ------------------------ | ----------------------------------- |
| 1 Architect              | @Kei-Kiban,@Konubinix,@mvanmeerbeck |
| 1 Cryptography Developer | @ahmdssi                            |
| 1 React-Native Developer | @RadekKeyban                        |
| 1 Backend Developer      | @grepson-keyban                     |
| 1 DevOps                 | @new-team-mate-1                    |

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    axisFormat %m/%Y
    excludes weekdays saturday,sunday

    section Keyban Wallet Development for Hedera
    L1.1 Architecture: a1, 2024-04-24, 30d
    L1.2 Integration: s2, after a1, 70d
    L1.3 Acceptance Test: si, after s2, 30d
    Delivery Report: crit, after si, 5d
```

## DPP Team Composition

| Profil                                  | Team mate        |
| --------------------------------------- | ---------------- |
| 1 Architect at 30% commitment           | @Kei-Kiban       |
| 1 React-Native Developer                | @RadekKeyban     |
| 1 Backend Developer                     | @grepson-keyban  |
| 1 DevOps at full-time                   | @new-team-mate-1 |
| 1 Web Developer at 50% commitment       | @mvanmeerbeck    |
| 1 Smart Contract Developer at full-time | @ahmdssi         |

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    axisFormat %m/%Y
    excludes weekdays saturday,sunday
    
    section Hedera Digital Passport Platform (DPP)
    L2.1 Architecture: s1, 2024-07-24, 60d
    L2.2 Smart Contracts: s3, 2024-09-01, 60d
    L2.3 DPP Platform Instantiation (including SDKs): s2, 2024-09-22, 90d
    L2.4 External Services Integration: s4, 2024-11-22, 54d
    L2.5 DPP Website: web, 2024-12-10, 45d
    L2.6 Reporting: crit, after web, 6d
```

# Overall Project Timeline

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    axisFormat %m/%Y
    excludes weekdays saturday,sunday

    section Keyban Wallet Development for Hedera
    L1.1 Architecture: a1, 2024-04-24, 30d
    L1.2 Integration: s2, after a1, 70d
    L1.3 Acceptance Test: si, after s2, 30d
    Delivery Report: crit, after si, 5d

    section Hedera Digital Passport Platform (DPP)
    L2.1 Architecture: s1, 2024-07-24, 60d
    L2.2 Smart Contracts: s3, 2024-09-01, 60d
    L2.3 DPP Platform Instantiation (including SDKs): s5, 2024-09-22, 90d
    L2.4 External Services Integration: s4, 2024-11-22, 54d
    L2.5 DPP Website: web, 2024-12-10, 45d
    L2.6 Reporting: crit, after web, 6d
```
