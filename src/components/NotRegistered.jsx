/* eslint-disable react/prop-types */

export const NotRegistered = ({login}) => {
  return (
    <div className="d-flex justify-content-center min-vh-100 align-items-center">
        <div className="card text-center p-5 border ">
           <i className="bi bi-person-circle fs-1 "></i>
            <div className="card-body">
            <p className="text-info text-capitalize fs-3">unknown user</p>
            <button className="btn btn-success btn-sm text-capitalize" onClick={login}>loguear</button>
        </div>
        </div>
    </div>
  )
}
