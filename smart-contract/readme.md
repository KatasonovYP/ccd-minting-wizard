# CCD-Mint-Wizard Smart Contract

- Contract Name: ccd_mint_wizard
- Contract Module Reference: a476eb345c0e3b311d1581ab42e6e7f7c7f972837d1a6687302e0d4465383538
- Contract Index: 8772

## Contract Compilation
```bash
cargo concordium build --schema-out="dist/schema.bin" --out dist/module.wasm.v1
```

## Contract Deployment
```bash
concordium-client module deploy dist/module.wasm.v1 --sender <SENDER_ADDRESS> --name ccd_mint_wizard --grpc-port 20000 --grpc-ip node.testnet.concordium.com
```

## Contract Init Function Schema
```json
{
    "premint_tokens": [
        [
            "01",
            [
                {
                    "url": "<TOKEN_METADATA_URL>",
                    "hash": {
                        // If METADATA_HASH:
                        "Some": ["<METADATA_HASH>"]
                        // Else:
                        "None": []
                    }
                },
                {
                    "amount": "<MINTING_AMOUNT>",
                    "max_supply": "<MAX_SUPPLY>"
                }
            ]
        ]
    ]
}
```
### [Init Example](examples/init.md)
<br>
<br>

## Contract Mint Function Schema
```json
{
    "owner": {
        "Account": [
            "<TOKENS_OWNER>"
        ]
    },
    "tokens": [
        [
            "01",
            [
                {
                    "url": "<TOKEN_METADATA_URL>",
                    "hash": {
                        // If METADATA_HASH:
                        "Some": ["<METADATA_HASH>"]
                        // Else:
                        "None": []
                    }
                },
                {
                    "amount": "<MINTING_AMOUNT>",
                    "max_supply": "<MAX_SUPPLY>"
                }
            ]
        ]
    ]
}
```
### [Mint Example](examples/mint.md)
<br>

## Contract Transfer Function Schema
```json
[
    {
        "token_id": "01",
        "amount": "<TRANSFER_AMOUNT>",
        "from": {
            "Account": [
                "<FROM_ACCOUNT>"
            ]
        },
        "to": {
            "Account": [
                "<TO_ACCOUNT>"
            ]
        },
        "data": ""
    }
]
```
### [Transfer Example](examples/transfer.md)
<br>

## Contract Burn Function Schema
```json
{
    "token_id": "01",
    "amount": "<BURN_AMOUNT>"
}
```
### [Burn Example](examples/burn.md)
<br>

## Contract View State Function
```bash
concordium-client contract invoke <CONTRACT_INDEX> --entrypoint view --grpc-port 20000 --grpc-ip node.testnet.concordium.com
```
