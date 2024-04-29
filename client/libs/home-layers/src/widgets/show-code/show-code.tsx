import cn from 'classnames';
import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { rustLanguage } from '@codemirror/lang-rust';
import cls from './show-code.module.css';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { useState } from 'react';
import { Spinner } from '@/shared/ui/spinner';
import { useContractFeaturesCode } from '@/shared/utils/hooks/use-contract-features-code';

interface ShowCodeProps {
    className?: string;
}

const SMART_CONTRACT_PATH = '../../../../../../smart-contract/src/processed'

export default function ShowCode(props: ShowCodeProps) {
    const { className } = props;
    const contractFeaturesCode = useContractFeaturesCode();
    const [code, setCode] = useState<string>();
    import((`${SMART_CONTRACT_PATH}/${contractFeaturesCode}/src/lib.rs`)).then((lib) =>
        setCode(lib.plainText),
    );
    const theme = 'dark';

    if (!code) {
        return <Spinner />
    }

    return (
        <ScrollArea className={cn('rounded-md', cls.scrollArea)}>
            <CodeMirror
                value={code}
                className={cn(
                    className,
                    cls.showCode,
                    'rounded-md',
                    theme === 'dark' ? 'bg-[#282C34]' : 'bg-white',
                )}
                theme={theme}
                minHeight={'100%'}
                editable={false}
                extensions={[
                    rustLanguage,
                    EditorState.readOnly.of(true),
                    EditorView.lineWrapping,
                ]}
                basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    highlightActiveLine: false,
                    drawSelection: false,
                }}
            />
        </ScrollArea>
    );
}
