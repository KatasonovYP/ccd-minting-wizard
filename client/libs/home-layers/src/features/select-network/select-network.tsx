import cn from 'classnames';
import cls from './select-network.module.css';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';
import { useMintStore } from '@/shared/store/mint-store';

interface SelectNetworkProps {
    className?: string;
}

export function SelectNetwork(props: SelectNetworkProps) {
    const { className } = props;
    const setIsTestNet = useMintStore((state) => state.setIsTestNet);

    return (
        <div className={cn(className, cls.selectNetwork)}>
            <Select
                defaultValue={'testnet'}
                onValueChange={(value) => {
                    setIsTestNet(value === 'testnet');
                }}
            >
                <SelectTrigger className='w-[124px]'>
                    <SelectValue placeholder='select net' />
                </SelectTrigger>
                <SelectContent align={'end'}>
                    <SelectItem value='mainnet'>Mainnet</SelectItem>
                    <SelectItem value='testnet'>Testnet</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
