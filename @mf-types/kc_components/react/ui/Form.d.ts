import React from 'react';
import { ButtonProps } from '../Button';
import { InputProps } from '../Input';
declare type FormInputConfig = Omit<InputProps, 'onChange'>;
export declare type FormProps = {
    inputs: Omit<InputProps, 'onChange'>[];
    useCard?: boolean;
    submitButton?: Omit<ButtonProps, 'onClick'>;
    title?: string;
    onSubmit?: (e: React.MouseEvent | KeyboardEvent, inputValues: FormInputConfig[]) => void | Promise<{
        successMessage?: string;
        errorMessage?: string;
    }> | Promise<void>;
};
export declare const Form: ({ inputs, useCard, title, submitButton, onSubmit }: FormProps) => JSX.Element;
export {};
