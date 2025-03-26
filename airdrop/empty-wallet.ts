import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";

/**
 * Script to empty our devnet wallet into the Turbin3 wallet
 * 
 * This script transfers ALL remaining SOL from our dev wallet
 * to the Turbin3 address, accounting for transaction fees.
 * It demonstrates how to:
 * 1. Calculate exact transaction fees
 * 2. Send the maximum possible amount while covering fees
 * 3. Close/empty a wallet properly
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

// Function to transfer all SOL and display the result
(async () => {
    try {
        // Get balance of dev wallet
        const balance = await connection.getBalance(from.publicKey);
        console.log(`Current balance to transfer: ${balance / LAMPORTS_PER_SOL} SOL`);
        
        if (balance <= 0) {
            console.log("No balance to transfer. Exiting.");
            return;
        }
        
        // Create a test transaction to calculate fees
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance, // Initially try to send full balance
            })
        );
        
        // Set the recent blockhash and fee payer
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        
        // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
        const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;
        console.log(`Transaction fee: ${fee / LAMPORTS_PER_SOL} SOL`);
        
        if (fee >= balance) {
            console.log("Insufficient balance to cover fees. Exiting.");
            return;
        }
        
        // Remove our transfer instruction to replace it
        transaction.instructions.pop();
        
        // Now add the instruction back with correct amount of lamports (balance - fee)
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee,
            })
        );
        
        console.log(`Amount to transfer after fees: ${(balance - fee) / LAMPORTS_PER_SOL} SOL`);
        
        // Sign, broadcast, and confirm the transaction
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        
        // Display success message with transaction URL
        console.log(`Success! Wallet emptied. Check out your TX here: 
        https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        
        // Verify the wallet is now empty
        const remainingBalance = await connection.getBalance(from.publicKey);
        console.log(`Remaining balance: ${remainingBalance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
        console.error(`Oops, something went wrong: ${error}`);
    }
})(); 