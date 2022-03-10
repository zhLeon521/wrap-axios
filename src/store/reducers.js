import { ACTION_SET_LOADING } from './actions'

const initalState = {
    loading: false
}

export default {
    loading(state = initalState.loading, action) {
        const { type, payload } = action
        switch (type) {
            case ACTION_SET_LOADING:
                return payload
            default:
        }
        return state
    }
}
