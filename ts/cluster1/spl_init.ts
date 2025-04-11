import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "./wallet/wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        // Create mint
        const mint = await createMint(
            connection,         // RPC connection
            keypair,           // Payer of the transaction
            keypair.publicKey, // Mint authority
            null,              // Freeze authority (set to `null` if not needed)
            9         // Token decimals
        );

        console.log(`Mint created: ${mint.toBase58()}`);

    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
