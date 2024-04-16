# concordium-client command to invoke contract burn function
```bash
concordium-client contract update 8625 --entrypoint burn --parameter-json burn_params.json --schema dist/schema.bin --sender 3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L --energy 6000 --grpc-port 20000 --grpc-ip node.testnet.concordium.com
```
Replace the `3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L` address with your account address
# burn_params.json
```json
{
    "owner": {
        "Account": [
            "3T5VBsVEmuvkbEBxHaiAqQZ8N7fowWkYKfiXYywYjXYGZiag4L"
        ]
    },
    "token_id": "03",
    "amount": "10"
}
```