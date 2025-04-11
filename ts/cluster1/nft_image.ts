import wallet from "./wallet/wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz/", }));
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image

        const image = await readFile("./xud-gye-guru.png")

        const file = createGenericFile(
            image,
            "xud-gye.png",
            {
                contentType: "image/png",
            });

        const [myUri] = await umi.uploader.upload([file])
        console.log("Your image URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// https://arweave.net/2qooE6DXw1dqSEWzRGKhuBcjQ8Lbb4pau17cYvZh9bnu
// https://gateway.irys.xyz/HdKTJ7AVhdhb4qDWdam4GVaW5M4o9M8hhgLgaLUPGd9L