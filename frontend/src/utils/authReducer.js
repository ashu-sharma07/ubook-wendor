export const initialUserState = {
    id: '',
    reload: false,
};

const authReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'updateUser':
            return {
                ...state,
                ...payload,
            };
        case 'Reload':
            return {
                ...state,
                reload: payload,
            };
        case 'loginUser':
            return payload;
        case 'Reset_Data':
            return initialUserState;
        default:
            throw new Error(`No case for type ${type} found in authReducer.`);
    }
};

export default authReducer;
