/**
 *
 * @param {Object} intersectionObserverConfig { ref, threshold, initialOnly }
 * @param {Object} animationConfig { fn, config } // fn defaults to fadeInUp
 * @returns {Object} { isVisible, styles }
 */
export declare const useEntryAnimation: (intersectionObserverConfig: any, animationConfig: any) => {
    isVisible: boolean;
    styles: {
        [x: string]: any;
    };
};
