import React from 'react'

export default function Home() {
  return (
    <div className='container'>
      <h2>Add Notes here!</h2>
      <form className="md-3">
  <div className="md-3">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail4"/>
  </div>
  <div className="md-3">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword4"/>
  </div>
  <div className="md-3">
    <button type="submit" className="btn btn-primary">Sign in</button>
  </div>
</form>
      <h2>Get your Notes here!!</h2>
     
    </div>
  )
}
