import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [credentials, setCredentials] = useState({name:"",email:"",phone:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email,phone: credentials.phone,password: credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json){
            localStorage.setItem('token',json.authtoken);
            navigate('/');
        }else{
            alert('Invalid Credentials')
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="w-75 w-md-25 m-auto my-3">
    <div className="col-sm-9 col-md-6 m-auto">
      <form onSubmit={handleSubmit}>
        {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div className="form-floating my-2">
          <input
            type="text"
            className="form-control"
            id="name"
            name='name'
            value={credentials.name}
            onChange={onChange}
            placeholder="name"
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating my-2">
          <input
            type="email"
            className="form-control"
            id="email"
            name='email'
            value={credentials.email}
            onChange={onChange}
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating my-2">
          <input
            type="number"
            className="form-control"
            id="phone"
            name='phone'
            value={credentials.phone}
            onChange={onChange}
            placeholder="Mobile NO."
          />
          <label htmlFor="floatingInput">Mobile No.</label>
        </div>
        <div className="form-floating my-2">
          <input
            type="password"
            className="form-control"
            id="password"
            name='password'
            value={credentials.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Register
        </button>
      </form>
      <div className="my-2">
            <h6>Already have an Account Please <Link to="/login">Login</Link></h6>
            
          </div>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
    </div>
  </div>
  )
}

export default Register