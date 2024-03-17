import cn from 'classnames';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import { rustLanguage } from '@codemirror/lang-rust';
import cls from './show-code.module.css';
import { useCodeStore } from '@/shared/store/code-store';
import { useMintStore } from '@/shared/store/mint-store';

interface ShowCodeProps {
    className?: string;
}

export default function ShowCode(props: ShowCodeProps) {
    const { className } = props;
    const identity = useMintStore((state) => state.identity);
    const code = useCodeStore((state) => state.formatCode(identity));
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
