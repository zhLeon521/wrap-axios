import axios from './utils/request'

export function apiTest1(params, config) {
    return axios.post('/post', {
        name: "blueheart",
        age: 18
    }, { ...config })
}

export function apiTest2(params, config) {
    return axios.get('/get', {
        name: "blueheart",
        age: 18
    }, { ...config })
}

export function apiTest3(params, config) {
    return axios.post('/get', {
        name: "blueheart",
        age: 22
    }, { ...config })
}

export function apiTest4(params, config, err) {
    return axios.post('/post', {
        name: "blueheart",
        age: 22
    }, { ...config }, err)
}
