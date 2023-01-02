/// <reference types="react" />
export declare const useScrollPosition: (listen: boolean, elementRef: any) => {
    setIsListening: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    windowScrollY: number;
    prevWindowScrollY: number;
    elementDOMRect: any;
};
