/**
 * This hook can be used to rotate the active item in a list of items.
 * The interval runs immediately, but the setIsActive function can be used
 * by the consumer to toggle it under certain conditions.
 *
 * See activities and locations sections on home page for examples (10/22)
 */
/// <reference types="react" />
export declare const useActiveList: (items: any[], interval?: number) => {
    activeItem: any;
    activeIndex: number;
    setActiveIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
    setIsActive: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
