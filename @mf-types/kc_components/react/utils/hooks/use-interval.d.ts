export declare const useInterval: (callback: Function, delay: number, immediate: boolean) => {
    resetInterval: () => void;
    toggleInterval: () => void;
    intervalIsRunning: boolean;
};
