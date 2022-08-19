import { NavGroupConfig } from './group.type';
export declare type NavigationConfigType = {
    initialGroup?: string;
    groups: {
        [key: string]: {
            condition?: boolean;
        } & NavGroupConfig<any, any>;
    };
};
