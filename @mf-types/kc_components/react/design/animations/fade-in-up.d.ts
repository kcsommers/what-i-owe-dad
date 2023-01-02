export declare const fadeInUp: (isVisible: boolean, configOverrides?: {}) => {
    config: {
        duration: number;
        easing: (t: number) => number;
    };
    from: {
        opacity: number;
        y: string;
    };
    to: {
        opacity: number;
        y: string;
    };
} | {
    config: {
        duration: number;
        easing: (t: number) => number;
    };
    to: {
        opacity: number;
        y: string;
    };
    from?: undefined;
};
