export enum ESignedInActions {
    CHANGE_SIGNEDIN = 'CHANGE_SIGNEDIN'
}

export function changeSignedIn(signedIn: boolean) {
    return {
        type: ESignedInActions.CHANGE_SIGNEDIN,
        signedIn
    }
}