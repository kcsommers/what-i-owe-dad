/// <reference types="react" />
import { ITheme } from '../../../../common/design/themes/theme.interface';
export interface IThemeContext {
    currentTheme: ITheme;
    setCurrentTheme: React.Dispatch<React.SetStateAction<ITheme>>;
}
