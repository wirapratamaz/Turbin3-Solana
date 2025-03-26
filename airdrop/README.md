# Turbin3 Solana Prerequisites Completion

This repository contains scripts for completing the Turbin3 Solana Prerequisites coursework. Below is a summary of the completed sections and relevant transaction information.

## Completed Sections

### ✅ Section 1: Create a new Keypair
- Successfully created a new Solana wallet using the keygen script
- Wallet address: `E6GaFuTYEKyaF9Tpfjn8NEuKfQzWW1P3aHjf5zjN4zY4`
- [View on Solana Explorer](https://explorer.solana.com/address/E6GaFuTYEKyaF9Tpfjn8NEuKfQzWW1P3aHjf5zjN4zY4?cluster=devnet)

### ✅ Section 2: Claim Token Airdrop
- Successfully received 2 SOL from the Solana devnet faucet
- Airdrop transaction: [5dDWHtp8Gy2EYx8z8BM5y8N8vc8D1e8gBnNwhdxoGL88xmtbEHL4FCaLrnCDMgz8ebHSTiZkrRst9jV2DXSH4Z51](https://explorer.solana.com/tx/5dDWHtp8Gy2EYx8z8BM5y8N8vc8D1e8gBnNwhdxoGL88xmtbEHL4FCaLrnCDMgz8ebHSTiZkrRst9jV2DXSH4Z51?cluster=devnet)

### ✅ Section 3: Transfer tokens to Turbin3 Address
- Successfully sent 0.01 SOL to the Turbin3 address
- Turbin3 address: `5QpPAVrQE5aZzd9sS5pWMoXuqngGqrWUFNLcWqDCmhzT`
- Transfer transaction: [3ig4kfBCp8eMJLPXtGw3XhRDWDm7G2JrhQBPi84YRZjNR3RjQkTy3fcK3yLX9M1GfUndwkfyvcko9wpzgvz2YTmc](https://explorer.solana.com/tx/3ig4kfBCp8eMJLPXtGw3XhRDWDm7G2JrhQBPi84YRZjNR3RjQkTy3fcK3yLX9M1GfUndwkfyvcko9wpzgvz2YTmc?cluster=devnet)

### ✅ Section 4: Empty devnet wallet into Turbin3 wallet
- Successfully transferred all remaining SOL (1.98999 SOL) to the Turbin3 address
- Empty wallet transaction: [48qc2ivvsTCFR37r3UCvseK5wJPaEQShZisPru1hcefg5xQkzdyTzv1b1ocduAYeaitZkqrHcw2yH3ZrUuSSEtAV](https://explorer.solana.com/tx/48qc2ivvsTCFR37r3UCvseK5wJPaEQShZisPru1hcefg5xQkzdyTzv1b1ocduAYeaitZkqrHcw2yH3ZrUuSSEtAV?cluster=devnet)

## Wallet Summary

### Dev Wallet
- Address: `E6GaFuTYEKyaF9Tpfjn8NEuKfQzWW1P3aHjf5zjN4zY4`
- Final Balance: 0 SOL
- [View on Solana Explorer](https://explorer.solana.com/address/E6GaFuTYEKyaF9Tpfjn8NEuKfQzWW1P3aHjf5zjN4zY4?cluster=devnet)

### Turbin3 Wallet
- Address: `5QpPAVrQE5aZzd9sS5pWMoXuqngGqrWUFNLcWqDCmhzT`
- Final Balance: 4.49999 SOL
- [View on Solana Explorer](https://explorer.solana.com/address/5QpPAVrQE5aZzd9sS5pWMoXuqngGqrWUFNLcWqDCmhzT?cluster=devnet)

## Scripts Overview

This project includes the following scripts:

1. `keygen.ts` - Generate a new Solana keypair and save it to a wallet file
2. `airdrop.ts` - Request SOL tokens from the devnet faucet
3. `transfer.ts` - Transfer a small amount of SOL to the Turbin3 address
4. `empty-wallet.ts` - Transfer all remaining SOL to the Turbin3 address
5. `check-balance.ts` - Check the balance of the dev wallet
6. `check-turbin3-balance.ts` - Check the balance of the Turbin3 wallet
7. `wallet-convert.ts` - Convert between wallet formats (array <-> base58)

Each script can be run using the corresponding npm script in package.json.