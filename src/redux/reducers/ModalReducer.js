const stateDefault = {
    Component: <p>Default</p>,
    isVisible: false,
}

export const ModalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            state.Component = action.Component;
            state.isVisible = action.isVisible;
            return { ...state }
        case 'CLOSE_MODAL':
            state.isVisible = action.isVisible;
            return { ...state }
        default:
            return state
    }
}