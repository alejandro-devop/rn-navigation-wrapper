import React from 'react'

interface ScreenRendererProps {
    /** List of the available layouts */
    layouts: { [key: string]: React.ComponentType }
    /** Screen component ready to be rendered */
    screen: {
        component: React.ComponentType
        layout?: string
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
    const { layout } = screen
    const layoutKey = layout as keyof typeof layouts
    const LayoutToRender = layout ? layouts[layoutKey] : null

    if (!ComponentToRender) {
        return null
    }

    return LayoutToRender ? (
        <LayoutToRender {...routeProps}>
            <ComponentToRender {...routeProps} />
        </LayoutToRender>
    ) : (
        <ComponentToRender />
    )
}

export default ScreenRenderer
