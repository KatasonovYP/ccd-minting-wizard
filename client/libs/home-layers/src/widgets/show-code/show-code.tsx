import cn from 'classnames';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import { rustLanguage } from '@codemirror/lang-rust';
import { useEffect, useState } from 'react';
import cls from './show-code.module.css';
import { useCodeStore } from '@/shared/store/code-store';
import { useMintStore } from '@/shared/store/mint-store';

interface ShowCodeProps {
    className?: string;
}

export default function ShowCode(props: ShowCodeProps) {
    const { className } = props;
    const identity = useMintStore((state) => state.identity);
    const functionalitySettings = useMintStore(
        (state) => state.functionalitySettings,
    );
    const [code, setCode] = useState<string>('');
    const formatCode = useCodeStore((state) => state.formatCode);

    useEffect(() => {
        formatCode(identity, functionalitySettings).then(setCode);
    }, [identity, functionalitySettings, formatCode]);

    const theme = 'dark';

    return (
        <CodeMirror
            value={code}
            className={cn(
                className,
                cls.showCode,
                theme === 'dark' ? 'bg-[#282C34]' : 'bg-white',
            )}
            theme={theme}
            minHeight={'100%'}
            editable={false}
            extensions={[rustLanguage, EditorState.readOnly.of(true)]}
            basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                highlightActiveLine: false,
                drawSelection: false,
            }}
        />
    );
}
