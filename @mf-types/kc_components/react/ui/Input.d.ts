import React from 'react';
export declare type InputProps = {
    id: string;
    value: any;
    type?: string;
    name?: string;
    placeholder?: string;
    label?: {
        text: string;
        for: string;
    };
    errorMessage?: string;
    validator?: (value: string) => string;
    onChange?: (e: React.ChangeEvent) => void;
};
export declare const Input: ({ type, value, name, id, placeholder, label, errorMessage, onChange }: InputProps) => JSX.Element;
