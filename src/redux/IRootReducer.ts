import {IUsernameState} from "./states/IUsernameState";
import {ISignedInState} from "./states/ISignedInState";

export interface IRootReducer {
    usernameReducer: IUsernameState,
    signedInReducer: ISignedInState
}