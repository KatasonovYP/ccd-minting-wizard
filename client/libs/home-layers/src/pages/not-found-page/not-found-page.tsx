import cn from 'classnames';
import cls from './not-found-page.module.css';

interface NotFoundPageProps {
    className?: string;
}

export function NotFoundPage(props: NotFoundPageProps) {
    const { className } = props;

    return (
        <div className={cn(className, cls.notFoundPage)}>
            <h1>not-found-page</h1>
        </div>
    );
}
