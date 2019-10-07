import axios from 'axios';

export const register = newUser => {
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