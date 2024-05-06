# CCD-Mint-Wizard Smart Contract

- Contracts Names: mint_wizard_<BINARY_CODE>
- Base 64 Schemas Location: `src/processed/<BINARY_CODE>/dist/schemab64.txt`
- Module References Location: `src/processed/<BINARY_CODE>/reference.txt`

`BINARY_CODE` allows you to specify one of smart contract variations:
```
0 bit - Mintable
1 bit - Burnable
2 bit - Pausable
3 bit - Roles
4 bit - Updates
5 bit - Sponsored
```
So, for example smart contract with only burnable, roles and updates features will have the code: `010011`

## Processing Smart Contracts
```bash
cp secrets_template.py local_secrets.py
```
Change the content of `local_secrets.py` file, to fill your `SENDER_ADDRESS` and `SENDER_PASSWORD`
<br>

Then simply run:
```bash
python3 contracts_processor.py
```
<br>

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
