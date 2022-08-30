import React from 'react'
import useAppNavigation from '../hooks/useAppNavigation'

interface ScreenRendererProps {
    /** List of the available layouts */
    layouts: { [key: string]: React.ComponentType }
    /** Screen component ready to be rendered */
    screen: {
        component: React.ComponentType
        layout?: string
        layoutProps?: { [k: string]: any }
    }
}

/**
 * Wrapper component to render the screens and wrapped in the layout
 * (If available)
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @since 0.0.1
 * @param param0
 * @returns
 */
const ScreenRenderer: React.FC<ScreenRendererProps> = ({ layouts, screen, ...routeProps }) => {
    const ComponentToRender = screen.component
    const { layout, layoutProps = {} } = screen
    const layoutKey = layout as keyof typeof layouts
    const LayoutToRender = layout ? layouts[layoutKey] : null
    const { goBack } = useAppNavigation()
    const routeParams = {
        goBack
    }
    if (!ComponentToRender) {
        return null
    }

    return LayoutToRender ? (
        <LayoutToRender {...routeProps} {...layoutProps}>
            <ComponentToRender {...routeProps} {...routeParams} />
        </LayoutToRender>
    ) : (
        <ComponentToRender />
    )
}

export default ScreenRenderer
