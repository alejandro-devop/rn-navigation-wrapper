import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native'

const useAppNavigation = () => {
    const navigation = useNavigation()
    const currentRoute = useRoute()
    const stateExtractor = (s: any) => s
    const state = useNavigationState(stateExtractor)
    /**
     * Allows to go to an specific route
     */
    const goTo = (path: string, state?: { [key: string]: string | boolean | number }) => {
        navigation.navigate(path as never, state as never)
        // navigation.navigate(path, state)
    }
    /**
     * Allows to go back
     */
    const goBack = () => {
        navigation.goBack()
    }
    const activeRoute = state.routes.find((r: any, k: number) => k === state.index && Boolean(r))
    return {
        state,
        stateExtractor,
        currentRoute,
        focussedScreen: activeRoute?.name,
        goTo,
        goBack
    }
}

export default useAppNavigation
