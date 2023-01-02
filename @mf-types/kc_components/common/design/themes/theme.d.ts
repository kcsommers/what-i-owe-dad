import { IBaseThemeSchema } from './base-theme-schema.interface';
import { ThemeNames } from './theme-names.type';
export interface ITheme {
    name: string | ThemeNames;
    schema: IBaseThemeSchema;
}
