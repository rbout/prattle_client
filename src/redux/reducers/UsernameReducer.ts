import {IUsernameState} from "../states/IUsernameState";
import {AnyAction} from "redux";
import {EUsernameActions} from "../actions/UsernameActions";

const DEFAULT_STATE: IUsernameState = {
    username: "Default Username"
};

export function usernameReducer(state = DEFAULT_STATE, action: AnyAction): IUsernameState {
    switch (action.type) {
        case EUsernameActions.CHANGE_USERNAME:
            return { ...state, username: action.username};
        default:
            return state;
    }
}