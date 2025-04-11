import wallet from "./wallet/wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/HdKTJ7AVhdhb4qDWdam4GVaW5M4o9M8hhgLgaLUPGd9L"
        const metadata = {
            name: "xud-gye-guru",
            symbol: "MONKE",
            description: "xud gye guru",
            image,
            attributes: [
                { trait_type: 'mood', value: 'shocked' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// https://arweave.net/4rLQgu6s1vs3KRgywEVDEx936JTQRQAasT3SvSmXBM3Q
// https://gateway.irys.xyz/4rLQgu6s1vs3KRgywEVDEx936JTQRQAasT3SvSmXBM3Q