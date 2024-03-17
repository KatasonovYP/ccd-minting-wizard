import { Background } from '@/shared/ui/background';
import { Spinner } from '@/shared/ui/spinner';

export function LoadingPage() {
    return (
        <Background>
            <Spinner />
        </Background>
    );
}
