import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("ExfiHRYKzAhRSQCQ94ak3bLF1i4iyCTwBcpcKqFA8esx");

// Recipient address
const to = new PublicKey("ArCugaYbHumHTiwP9ArA5L2vHNgWrcVPuGSchYXhh9is");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ata_sender = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
        )
        console.log(`sender ata is: ${ata_sender.address.toBase58()}`);

        // Get the token account of the toWallet address, and if it does not exist, create it
        const ata_reciever = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to,
        )
        console.log(`reciever ata is: ${ata_reciever.address.toBase58()}`);

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(
            connection,
            keypair,
            ata_sender.address,
            ata_reciever.address,
            keypair,
            1e10
        )
        console.log(`tx is: ${tx}`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();