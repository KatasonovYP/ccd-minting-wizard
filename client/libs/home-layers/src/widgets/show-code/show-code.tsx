import cn from 'classnames';
import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { rustLanguage } from '@codemirror/lang-rust';
import cls from './show-code.module.css';
import { useCode } from '@/shared/utils/hooks';
import { plainText as initialCode } from '../../../../../../smart-contract/src/lib.rs';
import { ScrollArea } from '@/shared/ui/scroll-area';

interface ShowCodeProps {
    className?: string;
}

export default function ShowCode(props: ShowCodeProps) {
    const { className } = props;
    // const { code } = useCode();
    // console.log(initialCode);

    const theme = 'dark';

    return (
        <ScrollArea className={cn('rounded-md', cls.scrollArea)}>
            <CodeMirror
                value={initialCode}
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
