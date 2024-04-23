import axios from 'axios';
import { URLS } from '@/shared/config/const';

export async function postIpfs(file: File | Blob): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const resFile = await axios({
            method: 'post',
            url: URLS.PINATA.PIN,
            data: formData,
            headers: {
                pinata_api_key: __PINATA_API_KEY__,
                pinata_secret_api_key: __PINATA_SECRET_API_KEY__,
                'Content-Type': 'multipart/form-data',
            },
        });

        return `${URLS.PINATA.VIEW}/${resFile.data.IpfsHash}`;
    } catch (error) {
        console.log('Error sending File to IPFS: ');
        console.log(error);
        throw new Error('Error sending File to IPFS: ');
    }
}
