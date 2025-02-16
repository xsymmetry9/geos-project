import {useContext} from 'react';

const Login = () =>{
    const user = useContext();

    return (
        <>
            <h1>{user.name}</h1>
        </>
    )
}

export default Login;