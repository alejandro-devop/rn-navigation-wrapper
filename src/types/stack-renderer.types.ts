import { ScreenType, NavigatorTypes, SingleGroupType, TabOptionsTypes } from './navigation.types'
export interface StackRendererProps {
    /** Initial route for the current stack */
    initial?: string
    /** Array of screens to be included in the navigator */
    screens?: ScreenType[]
    /** Available layouts used to wrapp the screen */
    layouts: { [key: string]: React.ComponentType<any> }
    /** Nested navigator for the current stack */
    stacks?: SingleGroupType[]
    /** Available navigator stack */
    type?: NavigatorTypes
    /** If it's a nested navigator */
    nested?: boolean
    tabOptions?: TabOptionsTypes
    /** Component used to render the tabs on the tabNavigator */
    TabsRenderer?: (() => React.ReactNode | ((params: any) => React.ReactNode)) | false
}
