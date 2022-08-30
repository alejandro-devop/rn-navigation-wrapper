import React from 'react'

type NavigationType = 'stack' | 'drawer' | 'tabs'
type ScreensConfigType = {
    [key: string]: React.ComponentType | { component: React.ComponentType; layout?: string }
}

export type NavGroupConfig<Screens extends string = '', Layout extends string = ''> = {
    initialScreen?: Screens
    layout?: Layout
    type: NavigationType
    screens?: ScreensConfigType
}
