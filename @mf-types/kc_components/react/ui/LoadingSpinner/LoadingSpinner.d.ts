/// <reference types="react" />
import { ThemeColorTypes } from '../../../common/design/themes/theme-color-types.type';
export declare type LoadingSpinnerProps = {
    size?: 'lg' | 'md' | 'sm';
    color?: ThemeColorTypes;
};
export declare const LoadingSpinner: ({ size, color }: LoadingSpinnerProps) => JSX.Element;
