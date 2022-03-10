export const ACTION_SET_LOADING = 'SET_LOADING'

export const actions = {
    setLoading(load) {
        return {
            type: ACTION_SET_LOADING,
            payload: load
        }
    }
}
