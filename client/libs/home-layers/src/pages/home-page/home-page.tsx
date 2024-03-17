import cn from 'classnames';
import cls from './home-page.module.css';

interface HomePageProps {
    className?: string;
}

export function HomePage(props: HomePageProps) {
    const { className } = props;

    return (
        <div className={cn(className, cls.homePage)}>
            <h1>home-page</h1>
        </div>
    );
}
