import cn from 'classnames';
import cls from './deploy-contract.module.css';
import { useMintStore } from '@/shared/store/mint-store';
import { Button } from '@/shared/ui/button';

interface DeployContractProps {
    className?: string;
}

export function DeployContract(props: DeployContractProps) {
    const { className } = props;
    const mintStore = useMintStore((state) => state);

    function handleClick() {
        console.log(mintStore.identity);
        console.log(mintStore.mintingSettings);
        console.log(mintStore.functionalitySettings);
    }

    return (
        <div className={cn(className, cls.deployContract)}>
            <Button onClick={handleClick}>Deploy</Button>
        </div>
    );
}
