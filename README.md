This is the pla# 💰 $TEOS Private Contribution Pool

A fully decentralized **SOL-based contribution smart contract**, whitelist portal, and backend for verified $TEOS holders to access exclusive token trades. This platform is part of the TeosEgypt ecosystem and is built with **Anchor (Rust), Next.js (React), and Express (Node.js)**.

---

## 🌍 Overview

The $TEOS Private Contribution Pool is a **verified holder-only** system allowing contributors to trade SOL for $TEOS tokens at a fixed rate of **$50 worth of SOL → 10,000 $TEOS**.

Key phases:
- ✅ Phase 1: **500–1,000 verified contributors** (currently live)
- 🔐 50% of SOL is locked until we reach **10,000 total contributors**
- 💼 Admin can use 50% for marketing, audit, and community expansion
- 📈 Once 10K holders reached → **Listing on OKX + Binance**, **CertiK audit**, and launch of **Pioneer USDC trading pool**

---

## 📋 Contribution Details

| Feature                 | Value                                  |
|------------------------|----------------------------------------|
| Token                  | [$TEOS](https://solscan.io/token/AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo) |
| Blockchain             | Solana                                 |
| Smart Contract         | Anchor-based (Rust)                    |
| Contribution Currency  | SOL only                               |
| Contribution Amount    | $50 in SOL                             |
| Tokens Received        | 10,000 $TEOS                           |
| Status                 | ✅ Live on Solana Devnet                |
| Admin Wallet           | `Akvm3CbDN448fyD8qmQjowgBGpcYZtjuKFL4xT8PZhbF` |

---

## 🔐 Holder Verification

Only **verified $TEOS token holders** can contribute. Verification is done via:

- Wallet connection using Phantom or Solflare
- On-chain check for minimum token balance
- Whitelist is auto-managed through backend

---

## ⚒️ Tech Stack

| Layer        | Tech                         |
|--------------|------------------------------|
| Smart Contract | Rust + Anchor (Solana)      |
| Frontend     | Next.js + TailwindCSS        |
| Wallet       | Phantom Wallet Integration   |
| Backend      | Node.js + Express.js         |
| CI/CD        | GitHub Actions               |
| Deployment   | Vercel (frontend), Render or Railway (backend) |

---

## 🧪 Testing

- Unit tests included for smart contract logic via Anchor framework
- API testing via Supertest and Postman
- Devnet deployment for live test interaction

---

## 🚀 Deployment

To deploy on Solana devnet:

```bash
anchor build
anchor deploy --provider.cluster devnet
ceholder for README.md.
