import {tokenStorage} from '@utils/tokenStorage'

export const initUser = {
    id: "",
    token: tokenStorage.get(),
    role: undefined,
    firstName: "",
    lastName: "",
    active: false
}