# concordium-client command to invoke contract transfer function
```bash
concordium-client contract update 8625 --entrypoint transfer --parameter-json transfer_params.json --schema dist/schema.bin --sender 3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L --energy 6000 --grpc-port 20000 --grpc-ip node.testnet.concordium.com
```
Replace the `3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L` address with your account address

<br>

# transfer_params.json
```json
[
    {
        "token_id": "03",
        "amount": "50",
        "from": {
            "Account": [
                "3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L"
            ]
        },
        "to": {
            "Account": [
                "4n7N78gNEXuVjmdD421H4X6tdjDQ4LdkYswV8paAJzQVsvZ4QU"
            ]
        },
        "data": ""
    }
]
```