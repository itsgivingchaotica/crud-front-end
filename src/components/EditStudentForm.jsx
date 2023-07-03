import React from 'react'

const EditStudentForm = ({handleChangeFirstName, handleChangeLastName, handleChangeImageUrl, handleChangeEmail, 
    handleChangeGpa, handleChangeCampus, handleSubmit, editedStudent, allCampuses}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="firstName"
            value={editedStudent.firstName}
            placeholder="First Name"
            onChange={handleChangeFirstName}
            />
            <input
            type="text"
            name="lastName"
            value={editedStudent.lastName}
            placeholder="Last Name"
            onChange={handleChangeLastName}
            />
            <input
            type="email"
            name="email"
            value={editedStudent.email}
            placeholder="Email"
            onChange={handleChangeEmail}
            />
            <input
            type="number"
            name="gpa"
            value={editedStudent.gpa}
            placeholder="gpa"
            onChange={handleChangeGpa}
            />
            <select defaultValue="choose" className="dropdown" onChange={handleChangeCampus}>
                <option value="choose" disabled>Choose Campus</option>
                {allCampuses.map((campus) => {
                    return <option key={campus.id} value={campus.id} id={campus.name}>{campus.name + " - " + campus.id}</option>
                })}  
            </select>
            <button type="submit">Done</button>
        </form>
        </>
  )
}

export default EditStudentForm