# Weavenn - Hedera <> Keyban Planning

## Wallet as a service SDK Team Composition

| Profil                   | Team mate                           |
| ------------------------ | ----------------------------------- |
| 1 Architect              | @Kei-Kiban,@Konubinix,@mvanmeerbeck |
| 1 Cryptography Developer | @ahmdssi                            |
| 1 React-Native Developer | @RadekKeyban                        |
| 1 Backend Developer      | @grepson-keyban                     |
| 1 DevOps                 | @Konubinix                          |

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    axisFormat %m/%d
    excludes weekdays saturday,sunday
    
    section Hedera Wallet as a Service (WaaS)
    Architecture Design: a1, 2024-04-24, 30d
    Key Management System (KMS) Development: s2, after a1, 70d
    Testing Environment Setup: after a1, 30d
    Core Services Implementation: si, 2024-06-24, 70d
    Delivery Report: crit, after si, 5d
```

## DPP Team Composition

| Profil                                  | Team mate       |
| --------------------------------------- | --------------- |
| 1 Architect at 30% commitment           | @Kei-Kiban      |
| 1 React-Native Developer                | @RadekKeyban    |
| 1 Backend Developer                     | @grepson-keyban |
| 1 DevOps at full-time                   |                 |
| 1 Web Developer at 50% commitment       |                 |
| 1 Smart Contract Developer at full-time | @ahmdssi        |

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    axisFormat %m/%d
    excludes weekdays saturday,sunday
    
    
    section Hedera Digital Passport Platform (DPP)
    Architecture Design: s1, 2024-07-24, 60d
    Test & Development Environment Setup: devenv, 2024-08-07, 30d
    External Services Integration: s4, after devenv, 30d
    Smart Contracts Development: s3, after devenv, 45d
    Keyban Services Implementation: s2, after devenv, 90d
    SDK Development: sdks, 2024-10-08, 30d
    DPP Website Development: web, 2024-11-24, 45d
    Delivery Report: crit, after web, 6d
```

# Overall Project Timeline

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    axisFormat %m/%d
    excludes weekdays saturday,sunday
    
    section Hedera Wallet as a Service (WaaS)
    Architecture Design: a1, 2024-04-24, 30d
    Key Management System (KMS) Development: s2, after a1, 70d
    Testing Environment Setup: after a1, 30d
    Core Services Implementation: si, 2024-06-24, 70d
    Delivery Report: crit, after si, 5d
    
    section Hedera Digital Passport Platform (DPP)
    Architecture Design: s1, 2024-07-24, 60d
    Test & Development Environment Setup: devenv, 2024-08-07, 30d
    External Services Integration: s4, after devenv, 30d
    Smart Contracts Development: s3, after devenv, 45d
    Keyban Services Implementation: s2, after devenv, 90d
    SDK Development: sdks, 2024-10-08, 30d
    DPP Website Development: web, 2024-11-24, 45d
    Delivery Report: crit, after web, 6d
```
