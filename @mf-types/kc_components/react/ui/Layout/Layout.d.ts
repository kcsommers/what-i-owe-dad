import { PropsWithChildren } from 'react';
import { NavbarProps } from '../Navbar';
export declare type LayoutProps = PropsWithChildren<{
    navbarProps: NavbarProps;
}>;
export declare const Layout: ({ children, navbarProps }: LayoutProps) => JSX.Element;
