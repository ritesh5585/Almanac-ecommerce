import api from "../../api/axios";

export const login = async (payload: any) => {
    const res = await api.post('/auth/login', payload)
    console.log(res)
    return res.data
}

export const getProfile = async () => {
    const res = await api.get('/auth/me')
    return res.data
}