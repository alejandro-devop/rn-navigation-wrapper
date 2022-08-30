'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var native = require('@react-navigation/native');
var stack = require('@react-navigation/stack');
var bottomTabs = require('@react-navigation/bottom-tabs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * This function generates the navigation map for the routes
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param navigationConfig
 * @returns
 */
var makeNavigation = function (navigationConfig) {
    return function (params) {
        var _a = navigationConfig(params || {}), initialGroup = _a.initialGroup, groups = _a.groups;
        // First the hook must select the initial group
        var selectedGroupKey = Object.keys(groups).reduce(function (selectedKey, currentItem) {
            var condition = groups[currentItem].condition;
            // To be selected each group must have a condition key, and only the first group
            // which condition it's true will be mounted
            if (condition === true) {
                selectedKey = currentItem;
            }
            return selectedKey;
        }, initialGroup);
        var _b = groups[selectedGroupKey], initialScreen = _b.initialScreen, screens = _b.screens, layout = _b.layout, type = _b.type, stacks = _b.stacks;
        var getScreenMap = function (inputScreens, overrideLayout) {
            return Object.keys(inputScreens).map(function (currentKey) {
                var _a = inputScreens[currentKey], component = _a.component, screenLayout = _a.layout, layoutProps = _a.layoutProps;
                var componentToUse = inputScreens[currentKey];
                var layoutToUse = layout;
                if (component) {
                    componentToUse = component;
                }
                if (screenLayout) {
                    layoutToUse = screenLayout;
                }
                return {
                    name: currentKey,
                    component: componentToUse,
                    layout: overrideLayout || layoutToUse,
                    layoutProps: layoutProps
                };
            });
        };
        var outputStacks = null;
        if (stacks) {
            outputStacks = stacks.map(function (stackItem) {
                return __assign(__assign({}, stackItem), { screens: getScreenMap(stackItem.screens, stackItem.layout) });
            });
        }
        // After we get the initial selected group we build a easy to loop screens map
        var screensMap = React.useMemo(function () { return getScreenMap(screens); }, [screens, layout, getScreenMap]);
        return {
            initial: initialScreen || '',
            screens: screensMap,
            type: type,
            stacks: outputStacks
        };
    };
};

var useAppNavigation = function () {
    var navigation = native.useNavigation();
    var currentRoute = native.useRoute();
    var stateExtractor = function (s) { return s; };
    var state = native.useNavigationState(stateExtractor);
    /**
     * Allows to go to an specific route
     */
    var goTo = function (path, state) {
        navigation.navigate(path, state);
        // navigation.navigate(path, state)
    };
    /**
     * Allows to go back
     */
    var goBack = function () {
        navigation.goBack();
    };
    var activeRoute = state.routes.find(function (r, k) { return k === state.index && Boolean(r); });
    return {
        state: state,
        stateExtractor: stateExtractor,
        currentRoute: currentRoute,
        focussedScreen: activeRoute === null || activeRoute === void 0 ? void 0 : activeRoute.name,
        goTo: goTo,
        goBack: goBack
    };
};

/**
 * Wrapper component to render the screens and wrapped in the layout
 * (If available)
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @since 0.0.1
 * @param param0
 * @returns
 */
var ScreenRenderer = function (_a) {
    var layouts = _a.layouts, screen = _a.screen, routeProps = __rest(_a, ["layouts", "screen"]);
    var ComponentToRender = screen.component;
    var layout = screen.layout, _b = screen.layoutProps, layoutProps = _b === void 0 ? {} : _b;
    var layoutKey = layout;
    var LayoutToRender = layout ? layouts[layoutKey] : null;
    var goBack = useAppNavigation().goBack;
    var routeParams = {
        goBack: goBack
    };
    if (!ComponentToRender) {
        return null;
    }
    return LayoutToRender ? (React__default.default.createElement(LayoutToRender, __assign({}, routeProps, layoutProps),
        React__default.default.createElement(ComponentToRender, __assign({}, routeProps, routeParams)))) : (React__default.default.createElement(ComponentToRender, null));
};

var Stack = stack.createStackNavigator();
var Tabs = bottomTabs.createBottomTabNavigator();
/**
 * This component renders navigators which contains nested navigators (stacks)
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param param0
 * @returns
 */
var NestedStackRenderer = function (_a) {
    var initial = _a.initial, type = _a.type, screens = _a.screens, layouts = _a.layouts, stacks = _a.stacks, tabOptions = _a.tabOptions, TabsRenderer = _a.TabsRenderer;
    var NavigatorComponent = Stack.Navigator;
    var ScreenNavComponent = Stack.Screen;
    var unmountOnBlur = tabOptions ? tabOptions.unmountOnBlur : false;
    var navigatorOptions = {
        initialRouteName: initial
    };
    if (type === 'tabs') {
        NavigatorComponent = Tabs.Navigator;
        ScreenNavComponent = Tabs.Screen;
        navigatorOptions.tabBar =
            TabsRenderer && typeof TabsRenderer === 'function' ? TabsRenderer : null;
        navigatorOptions.unmountOnBlur = unmountOnBlur;
    }
    else {
        NavigatorComponent = Stack.Navigator;
        navigatorOptions.screenOptions = { headerShown: false };
    }
    return (React__default.default.createElement(NavigatorComponent, __assign({}, navigatorOptions),
        stacks &&
            stacks.map(function (item, key) { return (React__default.default.createElement(ScreenNavComponent, { key: "stacks-".concat(key), name: "stack-screens" }, function (props) { return (React__default.default.createElement(NestedStackRenderer, __assign({ type: item.type, initial: item.initialScreen, layouts: layouts, screens: item.screens, TabsRenderer: TabsRenderer, tabOptions: tabOptions }, props))); })); }),
        screens &&
            screens.map(function (screen, key) { return (React__default.default.createElement(ScreenNavComponent, { key: "screen-".concat(key), name: screen.name }, function (props) { return (React__default.default.createElement(ScreenRenderer, __assign({ layouts: layouts, screen: screen }, props))); })); })));
};
/**
 * This component renders the initial navigator for your application
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param param0
 * @returns
 */
var StackRenderer = function (_a) {
    var initial = _a.initial, type = _a.type, screens = _a.screens, layouts = _a.layouts, stacks = _a.stacks, tabOptions = _a.tabOptions, TabsRenderer = _a.TabsRenderer;
    return (React__default.default.createElement(NestedStackRenderer, { initial: initial, type: type, screens: screens, layouts: layouts, stacks: stacks, tabOptions: tabOptions, TabsRenderer: TabsRenderer }));
};
StackRenderer.defaultProps = {
    TabsRenderer: false
};

/**
 * Wrapps the navigation and builds the necesary structure for it
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns
 */
var NavigationWrapper = function (_a) {
    var children = _a.children, layouts = _a.layouts, config = _a.config, params = _a.params, TabsRenderer = _a.TabsRenderer, AppBarRenderer = _a.AppBarRenderer, tabOptions = _a.tabOptions;
    var useNavigation = makeNavigation(config);
    var _b = useNavigation(params), initial = _b.initial, screens = _b.screens, stacks = _b.stacks, type = _b.type;
    return (React__default.default.createElement(native.NavigationContainer, null,
        AppBarRenderer,
        React__default.default.createElement(StackRenderer, { initial: initial, screens: screens, type: type, layouts: layouts, stacks: stacks, tabOptions: tabOptions, TabsRenderer: TabsRenderer }),
        children));
};

exports.default = NavigationWrapper;
exports.useAppNavigation = useAppNavigation;
//# sourceMappingURL=index.js.map
