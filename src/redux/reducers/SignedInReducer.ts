import {ISignedInState} from "../states/ISignedInState";
import {AnyAction} from 'redux';
import {ESignedInActions} from "../actions/SignedInActions";

const DEFAULT_STATE: ISignedInState = {
    signedIn: false
};

export function signedInReducer(state = DEFAULT_STATE, action: AnyAction): ISignedInState {
    switch (action.type) {
        case ESignedInActions.CHANGE_SIGNEDIN:
            return { ...state, signedIn: action.signedIn};
        default:
            return state;
    }
}