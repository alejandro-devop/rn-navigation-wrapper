import React from 'react'

type NavigationType = 'stack' | 'drawer' | 'tabs'
type ScreensConfigType = {
    [key: string]: React.ComponentType
}

export type NavGroupConfig<Screens extends string = '', Layout extends string = ''> = {
    initialScreen?: Screens
    layout?: Layout
    type: NavigationType
    screens?: ScreensConfigType
}
