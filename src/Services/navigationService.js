import { NavigationActions } from "react-navigation";

const config = {};
export function setNavigator(nav) {
    if (nav) {
        config.navigator = nav;
    }
}

export function getNavigator() {
    return config.navigator;
}

export function navigate(routeName, params) {
    config.navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
}
export function goBack() {
    if (config.navigator) {
        let action = NavigationActions.back({});
        config.navigator.dispatch(action);
    }
}