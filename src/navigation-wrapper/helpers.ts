import { useMemo } from 'react'
import {
    NavigationConfigType,
    ParamsType,
    ScreenType,
    MakeNavHookReturnType,
    NavigatorTypes,
    SingleGroupType
} from '../types/navigation.types'

/**
 * This function generates the navigation map for the routes
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param navigationConfig
 * @returns
 */
export const makeNavigation =
    (navigationConfig: NavigationConfigType): MakeNavHookReturnType =>
    (
        params?: ParamsType
    ): {
        /** The initial route to render */ initial: string
        /** The screens map to be rendered */
        screens: ScreenType[]
        type?: NavigatorTypes
        stacks?: SingleGroupType[]
    } => {
        const { initialGroup, groups } = navigationConfig(params || {})
        // First the hook must select the initial group
        const selectedGroupKey = Object.keys(groups).reduce((selectedKey, currentItem) => {
            const { condition } = groups[currentItem]
            // To be selected each group must have a condition key, and only the first group
            // which condition it's true will be mounted
            if (condition === true) {
                selectedKey = currentItem
            }
            return selectedKey
        }, initialGroup)
        const { initialScreen, screens, layout, type, stacks } = groups[selectedGroupKey]

        const getScreenMap = (inputScreens: any, overrideLayout?: string): any => {
            return Object.keys(inputScreens).map((currentKey) => {
                const { component, layout: screenLayout, layoutProps } = inputScreens[currentKey]
                let componentToUse = inputScreens[currentKey]
                let layoutToUse = layout
                if (component) {
                    componentToUse = component
                }

                if (screenLayout) {
                    layoutToUse = screenLayout
                }

                return {
                    name: currentKey,
                    component: componentToUse as React.ComponentType,
                    layout: overrideLayout || layoutToUse,
                    layoutProps
                }
            })
        }

        let outputStacks = null
        if (stacks) {
            outputStacks = stacks.map((stackItem) => {
                return {
                    ...stackItem,
                    screens: getScreenMap(stackItem.screens, stackItem.layout)
                }
            })
        }
        // After we get the initial selected group we build a easy to loop screens map
        const screensMap: ScreenType[] = useMemo(
            () => getScreenMap(screens),
            [screens, layout, getScreenMap]
        )
        return {
            initial: initialScreen || '',
            screens: screensMap,
            type,
            stacks: outputStacks as any
        }
    }
