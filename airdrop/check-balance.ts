import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

// Recreate the keypair from the saved private key
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Establish a connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

// Function to check and display the wallet balance
(async () => {
  try {
    // Get the wallet balance
    const balance = await connection.getBalance(keypair.publicKey);
    
    // Display wallet information
    console.log(`Wallet address: ${keypair.publicKey.toBase58()}`);
    console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    console.log(`Solana Explorer: https://explorer.solana.com/address/${keypair.publicKey.toBase58()}?cluster=devnet`);
  } catch (error) {
    console.error(`Error checking balance: ${error}`);
  }
})(); 