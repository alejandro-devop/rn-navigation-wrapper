import React from 'react';
interface ScreenRendererProps {
    /** List of the available layouts */
    layouts: {
        [key: string]: React.ComponentType;
    };
    /** Screen component ready to be rendered */
    screen: {
        component: React.ComponentType;
        layout?: string;
        layoutProps?: {
            [k: string]: any;
        };
    };
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
declare const ScreenRenderer: React.FC<ScreenRendererProps>;
export default ScreenRenderer;
