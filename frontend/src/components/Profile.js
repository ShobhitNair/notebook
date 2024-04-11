import React, { useEffect, useState } from 'react'


const Profile = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", phone:""}) 


    const getUsers = async()=>{
        const response =  await  fetch('http://localhost:5000/api/auth/getuser',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({})
            })
            const userData = await response.json();
            console.log(userData);
            setCredentials({
                name: userData.user.name,
                email: userData.user.email,
                phone: userData.user.phone,
            });
    }
        useEffect(()=>{
            getUsers()
        },[])
        
    
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="w-75 w-md-25 m-auto my-3">
    <div className="col-sm-9 col-md-6 m-auto">
      <form >
        {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
        <h1 className="h3 mb-3 fw-normal">User Profile</h1>
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
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
      </form>
    </div>
  </div>
  )
}

export default Profile