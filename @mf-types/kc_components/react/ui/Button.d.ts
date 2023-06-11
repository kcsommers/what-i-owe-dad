import React from 'react';
export declare type ButtonTypes = 'primary' | 'accent1' | 'danger' | 'success' | 'warning';
export declare type ButtonSizes = 'lg' | 'md' | 'sm';
export declare type ButtonProps = {
    text?: string;
    type?: ButtonTypes;
    size?: ButtonSizes;
    isFullWidth?: boolean;
    isDisabled?: boolean;
    showSpinner?: boolean;
    onClick?: (e: React.MouseEvent) => void;
};
export declare const Button: ({ text, type, size, isFullWidth, isDisabled, showSpinner, onClick, }: ButtonProps) => JSX.Element;
