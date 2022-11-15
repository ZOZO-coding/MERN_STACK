import React from 'react'

const Modal = ({ setOpenModal, handleDelete }) => {
    return (
        <div className='modal-background'>
            <div className="modal-container">
                <div className="modal-title">
                    <h3>Are Your Sure You Want To Delete?</h3>
                </div>

                <div className="modal-body">
                    <h4>This will delete the content permanently from the database.</h4>
                </div>

                <div className="modal-footer">
                    <button 
                        id='cancelBtn' 
                        onClick={() => setOpenModal(false)}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDelete}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal