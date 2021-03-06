import axios from 'axios';

export const adminRegister = newUser => {
    return axios
    .post('user/register', {
        fname : newUser.fname,
        lname : newUser.lname,
        email : newUser.email,
        password : newUser.password,
    })
    .then(response =>{
        console.log('New Admin has been added successfully')
    })
} 

export const login = (user) => {
    return axios
    .post('/customers/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        const user = res.data.user;
        localStorage.setItem('xauthtoken', res.data.token);
        localStorage.setItem('customer', JSON.stringify(user));
        console.log(res);
        if (res.status === 200){
            this.props.history.push('/');
        }else{
            const error = new Error(res.error);
            throw error;
        }
    })
    .catch(err => {
        console.log(err)
    })
}

export const register = (user) => {
    return axios
    .post('/customers/', {
        name: user.name,
        email: user.email,
        password: user.password,

        credit_card: {
            cc_name: user.cc_name,
            cc_number: user.cc_number,
            cc_cvv: user.cc_cvv,
            cc_exp: user.cc_exp
        },

        address_1: user.address_1,
        address_2: user.address_2,
        city: user.city,
        postal_code: user.postal_code,
        country: user.country,
        mob_phone: user.phone
    })
    .then(res => {
        const user = res.data.user;
        localStorage.setItem('xauthtoken', res.data.token);
        localStorage.setItem('customer', JSON.stringify(user));
        console.log(res);
        if (res.status === 200){
            this.props.history.push('/');
        }else{
            const error = new Error(res.error);
            throw error;
        }
    })
    .catch(err => {
        console.log(err)
    })
}