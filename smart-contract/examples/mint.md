# concordium-client command to invoke contract mint function
```bash
concordium-client contract update 8625 --entrypoint mint --parameter-json mint_params.json --schema dist/schema.bin --sender 3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L --energy 6000 --grpc-port 20000 --grpc-ip node.testnet.concordium.com
```
Replace the `3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L` address with your account address

<br>

# mint_params.json
### Non-Fungible Token Mint Params with Metadata hash provided
```json
{
    "owner": {
        "Account": [
            "3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L"
        ]
    },
    "tokens": [
        [
            "01",
            [
                {
                    "url": "https://moccasin-lovely-unicorn-304.mypinata.cloud/ipfs/QmNdx4Hb7S61R5ZhUwr95zcSMvDHFVcn9fM4y2D1ENgpim",
                    "hash": {
                        "Some": ["5256fca977aac934415f7c9271215b90106da832291b73c009ca0b21b1ac3a8a"]
                    }
                },
                {
                    "amount": "1",
                    "max_supply": "1"
                }
            ]
        ]
    ]
}
```
<br>

### Fungible Token Mint Params without Metadata hash
```json
{
    "owner": {
        "Account": [
            "3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L"
        ]
    },
    "tokens": [
        [
            "02",
            [
                {
                    "url": "https://moccasin-lovely-unicorn-304.mypinata.cloud/ipfs/QmNdx4Hb7S61R5ZhUwr95zcSMvDHFVcn9fM4y2D1ENgpim",
                    "hash": {
                        "None": []
                    }
                },
                {
                    "amount": "50",
                    "max_supply": "1000"
                }
            ]
        ]
    ]
}
```
<br>

### Fungible Token Mint Params after pre-minting (url, hash and max_supply fields can be blank after pre-mint)
```json
{
    "owner": {
        "Account": [
            "3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L"
        ]
    },
    "tokens": [
        [
            "03",
            [
                {
                    "url": "",
                    "hash": {
                        "None": []
                    }
                },
                {
                    "amount": "50",
                    "max_supply": "0"
                }
            ]
        ]
    ]
}
```