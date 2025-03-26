import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

/**
 * Script to request SOL tokens from the devnet faucet
 * 
 * This script imports our keypair from the dev-wallet.json file,
 * establishes a connection to the Solana devnet, and requests
 * an airdrop of 2 SOL tokens to our wallet address.
 */

// Import the wallet private key
import wallet from "./dev-wallet.json";

// Recreate the keypair from the saved private key
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Display wallet information for verification
console.log(`Requesting airdrop for wallet address: ${keypair.publicKey.toBase58()}`);

// Establish a connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

// Function to request an airdrop and display the result
(async () => {
  try {
    // Request an airdrop of 2 SOL tokens
    const txhash = await connection.requestAirdrop(
      keypair.publicKey, 
      2 * LAMPORTS_PER_SOL
    );
    
    // Display success message with transaction URL
    console.log(`Success! Check out your TX here: 
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    
    // Get and display the wallet balance after airdrop
    const balance = await connection.getBalance(keypair.publicKey);
    console.log(`New wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
})();
