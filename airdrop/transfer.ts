import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";

/**
 * Script to transfer SOL tokens to the Turbin3 wallet address
 * 
 * This script transfers a small amount of SOL (0.1) from our dev wallet
 * to the Turbin3 address for the course enrollment.
 */

// Import our dev wallet
import wallet from "./dev-wallet.json";

// Set up our wallet keypair as the sender
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Define the recipient's public key (Turbin3 address)
const to = new PublicKey("5QpPAVrQE5aZzd9sS5pWMoXuqngGqrWUFNLcWqDCmhzT");

// Establish a connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

// Log the wallet addresses for verification
console.log(`From wallet: ${from.publicKey.toBase58()}`);
console.log(`To wallet: ${to.toBase58()}`);

// Function to transfer SOL and display the result
(async () => {
    try {
        // Check the balance before transfer
        const balanceBefore = await connection.getBalance(from.publicKey);
        console.log(`Balance before transfer: ${balanceBefore / LAMPORTS_PER_SOL} SOL`);
        
        // Create a transfer transaction
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: LAMPORTS_PER_SOL / 100, // Transfer 0.01 SOL
            })
        );
        
        // Set the recent blockhash and fee payer
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        
        // Sign, broadcast, and confirm the transaction
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        
        // Display success message with transaction URL
        console.log(`Success! Check out your TX here: 
        https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        
        // Check the balance after transfer
        const balanceAfter = await connection.getBalance(from.publicKey);
        console.log(`Balance after transfer: ${balanceAfter / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
        console.error(`Oops, something went wrong: ${error}`);
    }
})();
