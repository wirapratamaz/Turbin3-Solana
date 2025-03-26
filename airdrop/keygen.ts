import { Keypair } from "@solana/web3.js";

/**
 * Generates a new Solana keypair and outputs relevant information
 * 
 * This script creates a cryptographically secure keypair that can be used
 * for Solana transactions. The output includes the public address (which can be shared)
 * and the private key (which should be kept secret).
 */
function generateAndDisplayKeypair() {
  // Generate a new keypair with a cryptographically secure random number generator
  const kp = Keypair.generate();
  
  // Log the public key in base58 format (standard for Solana addresses)
  console.log(`You've generated a new Solana wallet: 
${kp.publicKey.toBase58()}

To save your wallet, copy and paste the following into a JSON file:
[${kp.secretKey}]`);
}

// Execute the function
generateAndDisplayKeypair();
