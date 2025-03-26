import bs58 from 'bs58';
import promptSync from 'prompt-sync';
import * as fs from 'fs';

// Initialize the prompt
const prompt = promptSync({ sigint: true });

/**
 * Wallet conversion utility - Enterprise-grade implementation
 * 
 * This utility provides conversion between:
 * 1. Byte array format (used in Solana wallet JSON files)
 * 2. Base58 format (used in Phantom and other wallet UIs)
 * 
 * For production use, we'd integrate this with secure key management systems
 * instead of handling raw private keys directly.
 */

/**
 * Converts a base58 string to a wallet byte array
 * @param base58String The base58 encoded private key
 * @returns Byte array representation of the key
 */
function base58ToWalletArray(base58String: string): number[] {
  try {
    // Cast the result to Uint8Array and then convert to number array
    const uint8Array = bs58.decode(base58String);
    const walletArray = Array.from(uint8Array).map(byte => Number(byte));
    return walletArray;
  } catch (error) {
    console.error('Error converting base58 to wallet array:', error);
    return [];
  }
}

/**
 * Converts a wallet byte array to base58 string format
 * @param walletArray The byte array of the private key
 * @returns Base58 encoded string
 */
function walletArrayToBase58(walletArray: number[]): string {
  try {
    // Convert number array to Uint8Array for bs58
    const uint8Array = new Uint8Array(walletArray);
    return bs58.encode(uint8Array);
  } catch (error) {
    console.error('Error converting wallet array to base58:', error);
    return '';
  }
}

/**
 * Saves a wallet to a JSON file
 * @param walletArray Array representation of the wallet
 * @param filename Output filename
 */
function saveWalletToFile(walletArray: number[], filename: string): void {
  try {
    fs.writeFileSync(filename, JSON.stringify(walletArray));
    console.log(`Wallet saved to ${filename}`);
  } catch (error) {
    console.error('Error saving wallet to file:', error);
  }
}

/**
 * Reads a wallet from a JSON file
 * @param filename The wallet file to read
 * @returns Array of numbers representing the wallet
 */
function readWalletFromFile(filename: string): number[] {
  try {
    const walletData = fs.readFileSync(filename, 'utf8');
    return JSON.parse(walletData);
  } catch (error) {
    console.error(`Error reading wallet file ${filename}:`, error);
    return [];
  }
}

// Main menu for the wallet conversion tool
function showMenu(): void {
  console.log('\n=== Solana Wallet Conversion Tool ===');
  console.log('1. Convert Base58 key to wallet array');
  console.log('2. Convert wallet array to Base58');
  console.log('3. Convert dev-wallet.json to Base58');
  console.log('4. Show your devnet wallet info');
  console.log('5. Exit');
  
  const choice = prompt('Select an option (1-5): ');
  
  switch (choice) {
    case '1':
      const base58Key = prompt('Enter your Base58 private key: ');
      if (base58Key) {
        const walletArray = base58ToWalletArray(base58Key);
        console.log('Wallet array:');
        console.log(walletArray);
        
        const saveOption = prompt('Save to file? (y/n): ');
        if (saveOption.toLowerCase() === 'y') {
          const filename = prompt('Enter filename (default: converted-wallet.json): ') || 'converted-wallet.json';
          saveWalletToFile(walletArray, filename);
        }
      }
      break;
      
    case '2':
      console.log('Enter wallet array (comma separated numbers, no brackets):');
      const arrayInput = prompt('> ');
      try {
        const walletArray = JSON.parse(`[${arrayInput}]`);
        const base58String = walletArrayToBase58(walletArray);
        console.log('\nBase58 encoded key:');
        console.log(base58String);
      } catch (error) {
        console.error('Invalid input format. Please provide comma-separated numbers.');
      }
      break;
      
    case '3':
      try {
        // Using our helper function to read the wallet file
        const walletArray = readWalletFromFile('dev-wallet.json');
        if (walletArray.length > 0) {
          const base58String = walletArrayToBase58(walletArray);
          console.log('\nYour dev-wallet.json as Base58:');
          console.log(base58String);
          
          console.log('\nYou can use this string to import your wallet into Phantom or other Solana wallets.');
        }
      } catch (error) {
        console.error('Error processing dev-wallet.json:', error);
      }
      break;
      
    case '4':
      console.log('\nYour devnet wallet public key:');
      console.log('5QpPAVrQE5aZzd9sS5pWMoXuqngGqrWUFNLcWqDCmhzT');
      console.log('\nSolscan link:');
      console.log('https://solscan.io/account/5QpPAVrQE5aZzd9sS5pWMoXuqngGqrWUFNLcWqDCmhzT');
      break;
      
    case '5':
      console.log('Exiting...');
      return;
      
    default:
      console.log('Invalid option, please try again.');
  }
  
  // Loop back to menu unless user chose to exit
  if (choice !== '5') {
    showMenu();
  }
}

// Start the program
console.log('Welcome to the Solana Wallet Conversion Tool');
console.log('This tool safely converts between wallet formats');
showMenu(); 