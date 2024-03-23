import cn from 'classnames';
import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { rustLanguage } from '@codemirror/lang-rust';
import cls from './show-code.module.css';
import { useCode } from '@/shared/utils/hooks';

interface ShowCodeProps {
    className?: string;
}

export default function ShowCode(props: ShowCodeProps) {
    const { className } = props;
    const { code } = useCode();

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
            extensions={[
                rustLanguage,
                EditorState.readOnly.of(true),
                EditorView.lineWrapping,
            ]}
            basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                highlightActiveLine: false,
                drawSelection: false,
            }}
        />
    );
}
