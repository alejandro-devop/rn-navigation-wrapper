declare const useAppNavigation: () => {
    state: any;
    stateExtractor: (s: any) => any;
    currentRoute: import("@react-navigation/native").RouteProp<import("@react-navigation/native").ParamListBase, string>;
    focussedScreen: any;
    goTo: (path: string, state?: {
        [key: string]: string | number | boolean;
    } | undefined) => void;
    goBack: () => void;
};
export default useAppNavigation;
