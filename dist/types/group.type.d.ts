import React from 'react';
declare type NavigationType = 'stack' | 'drawer' | 'tabs';
declare type ScreensConfigType = {
    [key: string]: React.ComponentType | {
        component: React.ComponentType;
        layout?: string;
    };
};
export declare type NavGroupConfig<Screens extends string = '', Layout extends string = ''> = {
    initialScreen?: Screens;
    layout?: Layout;
    type: NavigationType;
    screens?: ScreensConfigType;
};
export {};
