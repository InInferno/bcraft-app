import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

export const api = axios.create()
const mock = new MockAdapter(api, { delayResponse: 2000 })
mock
    .onPost('/login',
        {email: localStorage.email, password: localStorage.password })
    .reply(200, {success: true})
