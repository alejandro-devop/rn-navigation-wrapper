/// <reference types="react" />
import { NavGroupConfig } from './group.type';
export declare type NavigationConfigType = (p: ParamsType) => {
    /** The initial group to be loaded by the router */
    initialGroup: string;
    groups: GroupConfigType;
};
export declare type NavigationDefConfigType = {
    initialGroup?: string;
    groups: {
        [key: string]: {
            condition?: boolean;
        } & NavGroupConfig<any, any>;
    };
};
export interface NavigationWrapperProps {
    /** A component to be renderer on top the navigator */
    AppBarRenderer?: React.ReactNode;
    /** Component or components you want to render at same level fo the current screen */
    children?: React.ReactNode;
    /** Layouts to be used on any screen navigator */
    layouts: {
        [key: string]: React.ComponentType<any>;
    };
    /** Settings for the navigator */
    config: NavigationConfigType;
    /** Params to be used on the navigator */
    params?: {
        [key: string]: any;
    };
    tabOptions?: TabOptionsTypes;
    /** Component to be renderer on Tabs navigator */
    TabsRenderer?: (() => React.ReactNode | ((params: any) => React.ReactNode)) | false;
}
/**
 * Defines the configuration for each screen
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 */
export declare type ScreenConfigType = {
    [key: string]: React.ComponentType | {
        component: React.ComponentType;
        layout?: string;
    };
} | {
    [key: string]: {
        path?: string;
        component: React.ComponentType;
        layout?: string;
    };
};
export declare type SingleGroupType = {
    /** The condition which should be true bo render the group */
    condition?: boolean;
    /** The initial route for the group */
    initialScreen?: string;
    /** The layout which should apply to the group screens */
    layout?: string;
    /** Screens which belongs to the group */
    screens?: ScreenConfigType | null;
    type?: NavigatorTypes;
    stacks?: SingleGroupType[];
};
/**
 * Defines a routes group configuration which should be given for agroup
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 */
export declare type GroupConfigType = {
    [key: string]: SingleGroupType;
};
/**
 * The params that should be passed to the config function
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 */
export declare type ParamsType = {
    [key: string]: boolean | string | number | undefined | ParamsType;
};
/**
 * The configuration that should be contained by the screen
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 */
export declare type ScreenType = {
    /** A key for the screen, also it's used as path */
    name: string;
    /** The ccomponent to be rendered by the screen */
    component: React.ComponentType;
    /** The layout to be applyed to the scree */
    layout?: string;
};
export declare type NavigatorTypes = 'tabs' | 'stack' | string;
/**
 * Defines the configuration that should be passed to the make config
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 */
export declare type MakeNavHookReturnType = (p?: ParamsType) => {
    /** The initial route to render */
    initial?: string;
    /** The screens map to be rendered */
    screens: ScreenType[];
    type?: NavigatorTypes;
    stacks?: SingleGroupType[];
};
/**
 * Defines the return from hte useNavigate Hook
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 *
 */
export declare type UseNavigateReturnType = {
    state: {
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: any[];
        type: string;
        stale: false;
    };
    stateExtractor: (s: any) => any;
    currentRoute: {
        key: string;
        name: string;
        params?: {
            [key: string]: any;
        };
    };
    focussedScreen?: string;
    /** Function to go to an specific route */
    goTo: (p: string, state?: {
        [key: string]: string | boolean | number;
    }) => void;
    /** Function to go back */
    goBack: () => void;
};
export declare type TabOptionsTypes = {
    unmountOnBlur: boolean;
};
