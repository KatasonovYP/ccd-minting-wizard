import { useConcordiumApi } from '@/shared/utils/hooks';

export function useToggleConnection() {
    const { connection, activeConnector, setConnection } = useConcordiumApi();
    return () => {
        return connection
            ? setConnection(undefined)
            : activeConnector
                  ?.connect()
                  .then(setConnection)
                  .catch(console.error);
    };
}
