// import { ModuleReference } from '@concordium/web-sdk';
import {
    BrowserWalletConnector,
    ephemeralConnectorType,
} from '@concordium/react-components';
import { LOCAL_STORAGE_KEY } from '../const';
import type { Network } from '@concordium/react-components';

export const MAX_CONTRACT_EXECUTION_ENERGY = BigInt(30_000);

// export const CONTRACT_NAME = 'airdrop_project';

const storedModuleReference = sessionStorage.getItem(
    LOCAL_STORAGE_KEY.MODULE_REFERENCE,
);

export const DEFAULT_RAW_MODULE_REFERENCE =
    '0edbd695743789ac415289c31391ec66e66958efbaa1ea826b37ddcdeea74e7e';

export const MODULE_REFERENCE =
    storedModuleReference ?? DEFAULT_RAW_MODULE_REFERENCE;

// const storedRawSchema = sessionStorage.getItem(
//     LOCAL_STORAGE_KEY.MODULE_REFERENCE,
// );

// export const DEFAULT_LP_RAW_SCHEMA =
//     '//8DAQAAAA8AAABhaXJkcm9wX3Byb2plY3QBABQACQAAAAkAAAB3aGl0ZWxpc3QQAhYCCQAAAG5mdF9saW1pdAQVAAAAbmZ0X2xpbWl0X3Blcl9hZGRyZXNzBA4AAABuZnRfdGltZV9saW1pdAUHAAAAcmVzZXJ2ZQQIAAAAYmFzZV91cmwWAggAAABtZXRhZGF0YRYCDgAAAHdoaXRlbGlzdF9maWxlFgIOAAAAc2VsZWN0ZWRfaW5kZXgBBgAAAAoAAABiYWxhbmNlX29mAhQAAgAAAAYAAABfZHVtbXkIBAAAAG5vZGULBAsAAABjaGVja19vd25lcgIUAAEAAAAFAAAAdG9rZW4dABQAAQAAAAcAAABhZGRyZXNzFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFgIJAAAAY2xhaW1fbmZ0BBQABQAAAAUAAABwcm9vZhACFgIEAAAAbm9kZQsLAAAAbm9kZV9zdHJpbmcWAg4AAABzZWxlY3RlZF90b2tlbh0AEAAAAGFtb3VudF9vZl90b2tlbnMEFQgAAAAPAAAATkZUTGltaXRSZWFjaGVkAhUAAABBZGRyZXNzTm90T25XaGl0ZWxpc3QCEAAAAEFpcmRyb3BOb3dDbG9zZWQCEwAAAE1pbnRpbmdMb2dNYWxmb3JtZWQCDgAAAE1pbnRpbmdMb2dGdWxsAhQAAABNZXRhRGF0YUxvZ01hbGZvcm1lZAIPAAAATWV0YURhdGFMb2dGdWxsAhMAAABJbmRleEFscmVhZHlDbGFpbWVkAg4AAABjdXJyZW50X3N1cHBseQEEDAAAAHRvdGFsX3N1cHBseQEEBAAAAHZpZXcBFAADAAAACAAAAG1ldGFkYXRhFgIJAAAAd2hpdGVsaXN0FgIOAAAAbnVtYmVyX29mX25mdHMEAA';

export const BROWSER_WALLET = ephemeralConnectorType(
    BrowserWalletConnector.create,
);
export const testnet: Network = {
    name: 'testnet',
    genesisHash:
        '4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796',
    ccdScanBaseUrl: 'https://testnet.ccdscan.io',
    grpcOpts: {
        baseUrl: 'https://json-rpc.testnet.concordium.com',
    },
};
