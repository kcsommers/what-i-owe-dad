import { IBaseThemeSchema } from 'kc_components/common/design/themes/base-theme-schema.interface';
import { ITheme } from 'kc_components/common/design/themes/theme.interface';
import React, { ReactNode } from 'react';
export interface BaseThemeProps extends React.HTMLAttributes<HTMLDivElement> {
    overrides?: Partial<IBaseThemeSchema>;
    children?: ReactNode;
    className?: string;
    theme?: ITheme;
}
export declare const BaseTheme: ({ theme, children, className, ...props }: BaseThemeProps) => JSX.Element;
