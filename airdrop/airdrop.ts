import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection to get devnet SOL tokens
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // We're going to claim 2 devnet SOL tokens
    console.log(`Requesting 2 SOL airdrop to ${keypair.publicKey.toBase58()}...`);
    
    const txhash = await connection.requestAirdrop(
      keypair.publicKey, 
      2 * LAMPORTS_PER_SOL
    );
    
    console.log(`Airdrop transaction submitted. Waiting for confirmation...`);
    
    // Wait for transaction confirmation
    const confirmation = await connection.confirmTransaction(txhash);
    
    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }
    
    // Fetch the new balance
    const balance = await connection.getBalance(keypair.publicKey);
    
    console.log(`Success! New balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    console.log(`Check out your TX here: 
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch(e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
