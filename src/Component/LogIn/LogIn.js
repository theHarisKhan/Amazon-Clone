import React, { useState } from 'react'
import './LogIn.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

function LogIn() {
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(email,password)
        .then(auth => history.push("/"))
        .catch(error => alert(error.message))

        // console.log(email,password)
    }

    const handleRegistration = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            if (auth)
                history.push("/")
        }).catch(error => alert(error.message))

        // console.log(email,password)
    }

    return (
        <div className="LogIn">
            
            <Link to="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png" alt="" className="Logo" />
            </Link>

            <div className="LogIn__container">
                <h1>Sign-In</h1>

                <form>
                    <h5>Email</h5>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button className="signin__btn" onClick={handleSignIn}>Sign In</button>
                </form>

                <p>By continuing, you agree to Fake Amazon Clone Conditions of Use and Privacy Notice.</p>
            </div>

            <button className="register__btn" onClick={handleRegistration}>Create your Amazon account</button>

        </div>
    )
}

export default LogIn
