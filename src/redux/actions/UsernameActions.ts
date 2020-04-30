export enum EUsernameActions {
    CHANGE_USERNAME = 'CHANGE_USERNAME'
}

export function changeUsername(username: string) {
    return {
        type: EUsernameActions.CHANGE_USERNAME,
        username
    }
}