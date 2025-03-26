import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

/**
 * Script to check the balance of the Turbin3 wallet
 * 
 * This script displays the current balance of the Turbin3 address
 * to verify our transfers were successful.
 */

// Define the Turbin3 public key
const turbin3Address = new PublicKey("5QpPAVrQE5aZzd9sS5pWMoXuqngGqrWUFNLcWqDCmhzT");

// Establish a connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

// Function to check and display the wallet balance
(async () => {
  try {
    // Get the wallet balance
    const balance = await connection.getBalance(turbin3Address);
    
    // Display wallet information
    console.log(`Turbin3 wallet address: ${turbin3Address.toBase58()}`);
    console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    console.log(`Solana Explorer: https://explorer.solana.com/address/${turbin3Address.toBase58()}?cluster=devnet`);
  } catch (error) {
    console.error(`Error checking balance: ${error}`);
  }
})(); 