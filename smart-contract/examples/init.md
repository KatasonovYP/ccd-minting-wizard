# concordium-client command to init the smart contract function
```bash
concordium-client contract init a476eb345c0e3b311d1581ab42e6e7f7c7f972837d1a6687302e0d4465383538 --parameter-json init_params.json --schema dist/schema.bin --sender 3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L --energy 30000 --contract ccd_mint_wizard --grpc-port 20000 --grpc-ip node.testnet.concordium.com
```
Replace the `3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L` address with your account address

<br>

# init_params.json
### Non-Fungible Token Init Params with Metadata hash provided
```json
{
    "premint_tokens": [
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

### Fungible Token Init Params without Metadata hash
```json
{
    "premint_tokens": [
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