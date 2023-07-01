import React from 'react'

const EditCampusForm = ({handleChangeName, handleChangeAddress, handleChangeImageUrl, handleChangeDescription, handleSubmit, editedCampus}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="name"
            value={editedCampus.name}
            placeholder="School Name"
            onChange={handleChangeName}
            />
            <input
            type="text"
            name="address"
            value={editedCampus.address}
            placeholder="Address"
            onChange={handleChangeAddress}
            />
            <input
            type="text"
            name="description"
            value={editedCampus.description}
            placeholder="Description"
            onChange={handleChangeDescription}
            />
            <button type="submit">Done</button>
        </form>
        </>
  )
}

export default EditCampusForm