import cn from 'classnames';
import cls from './text.module.css';
import type { TextProps } from './model/text-props';

export function Text(props: TextProps) {
    const {
        className,
        text,
        tag: Tag = 'p',
        size,
        display,
        weight,
    }: TextProps = props;

    const classes: cn.ArgumentArray = [
        className,
        cls.text,
        size && cls[size],
        weight && cls[weight],
        display && cls.display,
    ];

    return <Tag className={cn(classes)}>{text}</Tag>;
}
