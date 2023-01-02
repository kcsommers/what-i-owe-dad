import React from 'react';
import { IBaseThemeSchema } from '../../../../common/design/themes/base-theme-schema.interface';
import { ITheme } from '../../../../common/design/themes/theme.interface';
export declare function computeCssVars(theme: IBaseThemeSchema, prefix?: string): React.CSSProperties;
export declare type ThemeProviderProps = {
    theme?: ITheme;
    overrides?: Partial<IBaseThemeSchema>;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const ThemeProvider: ({ children, overrides, style, theme, ...rest }: ThemeProviderProps) => JSX.Element;
