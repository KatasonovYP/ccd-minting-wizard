import * as process from 'process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svgr from 'vite-plugin-svgr';
import plainText from 'vite-plugin-plain-text';
import dynamicImport from 'vite-plugin-dynamic-import';

const props = {
    isDev: process.env.IS_DEV || true,
    basePath: process.env.BASE_PATH || '/',
    featureFlagAuth: process.env.FEATURE_FLAG_AUTH || false,
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
};

// eslint-disable-next-line import/no-default-export
export default defineConfig({
    base: props.basePath,
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/home',
    plugins: [
        react(),
        nxViteTsPaths(),
        svgr({
            svgrOptions: {},
        }),
        plainText(['**/*.text', '**/*.rs']),
        dynamicImport(),
    ],
    define: {
        __IS_DEV__: JSON.stringify(props.isDev),
        __BASE_PATH__: JSON.stringify(props.basePath),
        __API__: JSON.stringify('http://localhost:8000'),
        __PINATA_API_KEY__: JSON.stringify(props.pinataApiKey),
        __PINATA_SECRET_API_KEY__: JSON.stringify(props.pinataSecretApiKey),
    },

    server: {
        port: 4200,
        host: 'localhost',
        fs: {
            allow: [
                '../../libs/shared/assets',
                '../../libs/shared/hooks',
                '../../../smart-contract/src/processed/',
            ],
        },
    },

    preview: { port: 4300, host: 'localhost' },

    build: {
        outDir: '../../dist/apps/home',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: { transformMixedEsModules: true },
    },
    // test: {
    //     globals: true,
    //     cache: { dir: '../../node_modules/.vitest' },
    //     environment: 'jsdom',
    //     include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    //     reporters: ['default'],
    //     coverage: {
    //         reportsDirectory: '../../coverage/apps/home',
    //         provider: 'v8',
    //     },
    // },
});
