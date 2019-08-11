import ApiRequest from "../commons/utils/ApiRequest";

export default {
    findByEmail: (email) => {
        const URL = `/api/v1/user/email/${email}`;
        return ApiRequest.withoutAuth.get(URL);
    },
    CreateUser: (d) => {
        console.log("data===>",d)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const body = 
        {
            "id": 1,
            "name": d.fullname,
            "gender": d.gender,
            "image": "",
            "dob": d.dob,
            "phone": d.phone,
            "address": d.address,
            "username": d.username,
            "email": d.email,
            "password": d.password,
            "role":["user"]
        }
        console.log("body========",body)
        const URL = `/api/auth/signup`;
        return ApiRequest.withoutAuth.post(URL,body, config);
    },
    SignIn: (data) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const body = 
        {
            "username": data.username,
            "password": data.password,
        }
        const URL = `/api/auth/signin`;
        return ApiRequest.withoutAuth.post(URL,body, config);
    },
}