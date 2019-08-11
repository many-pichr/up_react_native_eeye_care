const initialState = {
    locale: null, // fallback to default locale
}

const applicationReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case 'LOCALE_CHANGED':
            return {
                ...state,
                locale: action.locale
            }

        default:
            return state;
    }

}
export default applicationReducer;