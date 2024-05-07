import { CircleHelp } from 'lucide-react';
import * as React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../tooltip';
import { useHint } from '@/shared/utils/hooks/use-hint';

interface HintProps {
    className?: string;
    name: string;
}

export function Hint(props: HintProps) {
    const { name } = props;
    const { hint } = useHint(name);

    if (!hint) {
        return null;
    }

    return (
        <TooltipProvider
            delayDuration={0}
            skipDelayDuration={0}
        >
            <Tooltip>
                <TooltipTrigger>
                    <CircleHelp size={16} />
                </TooltipTrigger>
                <TooltipContent
                    className='max-w-sm'
                    align={'end'}
                >
                    {hint}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
