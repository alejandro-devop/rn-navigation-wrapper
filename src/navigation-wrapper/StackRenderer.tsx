import React from 'react'
import { StackRendererProps } from '../types/stack-renderer.types'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ScreenRenderer from './ScreenRenderer'

const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

type NavigatorOptionsType = {
    initialRouteName?: string
    screenOptions?: {}
    tabBar?: any
    unmountOnBlur?: boolean
}

/**
 * This component renders navigators which contains nested navigators (stacks)
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param param0
 * @returns
 */
export const NestedStackRenderer: React.FC<StackRendererProps> = ({
    initial,
    type,
    screens,
    layouts,
    stacks,
    tabOptions,
    TabsRenderer
}) => {
    let NavigatorComponent = Stack.Navigator
    let ScreenNavComponent: any = Stack.Screen
    let unmountOnBlur = tabOptions ? tabOptions.unmountOnBlur : false
    const navigatorOptions: NavigatorOptionsType = {
        initialRouteName: initial
    }

    if (type === 'tabs') {
        NavigatorComponent = Tabs.Navigator as any
        ScreenNavComponent = Tabs.Screen
        navigatorOptions.tabBar =
            TabsRenderer && typeof TabsRenderer === 'function' ? TabsRenderer : null
        navigatorOptions.unmountOnBlur = unmountOnBlur
    } else {
        NavigatorComponent = Stack.Navigator
        navigatorOptions.screenOptions = { headerShown: false }
    }

    return (
        <NavigatorComponent {...navigatorOptions}>
            {stacks &&
                stacks.map((item, key) => (
                    <ScreenNavComponent key={`stacks-${key}`} name="stack-screens">
                        {(props: any) => (
                            <NestedStackRenderer
                                type={item.type}
                                initial={item.initialScreen}
                                layouts={layouts}
                                screens={item.screens}
                                TabsRenderer={TabsRenderer}
                                tabOptions={tabOptions}
                                {...props}
                            />
                        )}
                    </ScreenNavComponent>
                ))}
            {screens &&
                screens.map((screen, key) => (
                    <ScreenNavComponent key={`screen-${key}`} name={screen.name}>
                        {(props: any) => (
                            <ScreenRenderer layouts={layouts} screen={screen} {...props} />
                        )}
                    </ScreenNavComponent>
                ))}
        </NavigatorComponent>
    )
}

/**
 * This component renders the initial navigator for your application
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param param0
 * @returns
 */
const StackRenderer: React.FC<StackRendererProps> = ({
    initial,
    type,
    screens,
    layouts,
    stacks,
    tabOptions,
    TabsRenderer
}) => {
    return (
        <NestedStackRenderer
            initial={initial}
            type={type}
            screens={screens}
            layouts={layouts}
            stacks={stacks}
            tabOptions={tabOptions}
            TabsRenderer={TabsRenderer}
        />
    )
}

StackRenderer.defaultProps = {
    TabsRenderer: false
}

export default StackRenderer
