type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextProps {
    className?: string;
    tag?: TextTag;
    size?: FontSize;
    weight?: FontWeight;
    display?: boolean;
    text: string;
}
