export declare const slideUp: (isVisible: boolean, configOverrides?: {}) => {
    config: {
        duration: number;
        easing: (t: number) => number;
    };
    from: {
        y: string;
    };
    to: {
        y: string;
    };
} | {
    config: {
        duration: number;
        easing: (t: number) => number;
    };
    to: {
        y: string;
    };
    from?: undefined;
};
