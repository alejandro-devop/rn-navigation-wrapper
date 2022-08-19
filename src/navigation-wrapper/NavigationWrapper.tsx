import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { makeNavigation } from './helpers'
import StackRenderer from './StackRenderer'
import { NavigationWrapperProps } from '../types/navigation.types'

/**
 * Wrapps the navigation and builds the necesary structure for it
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns
 */
const NavigationWrapper: React.FC<NavigationWrapperProps> = ({
    children,
    layouts,
    config,
    params,
    TabsRenderer,
    AppBarRenderer,
    tabOptions
}) => {
    const useNavigation = makeNavigation(config)
    const { initial, screens, stacks, type } = useNavigation(params)
    return (
        <NavigationContainer>
            {AppBarRenderer}
            <StackRenderer
                initial={initial}
                screens={screens}
                type={type}
                layouts={layouts}
                stacks={stacks}
                tabOptions={tabOptions}
                TabsRenderer={TabsRenderer}
            />
            {children}
        </NavigationContainer>
    )
}

export default NavigationWrapper
