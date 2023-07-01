import React from 'react'

const EditStudentForm = ({handleChangeFirstName, handleChangeLastName, handleChangeImageUrl, handleChangeEmail, 
    handleChangeGpa, handleChangeCampusId, handleSubmit, editedStudent}) => {
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
            <input
            type="number"
            name="campusId"
            value={editedStudent.campusId}
            placeholder="campusId"
            onChange={handleChangeCampusId}
            />
            <button type="submit">Done</button>
        </form>
        </>
  )
}

export default EditStudentForm