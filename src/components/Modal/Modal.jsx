import React from 'react';
import ReactModal from 'react-modal'
import './Modal.css'

function Modal(props) {

    ReactModal.setAppElement('body');

    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={() => props.setOpen(false)}
            className='modal__content'
            overlayClassName='modal__overlay'
            shouldFocusAfterRender={false}
            closeTimeoutMS={200}
            onAfterOpen={() => props.afterOpen()}
        >
            <header>
                <h1>{props.titulo}</h1>
                <i className="fi fi-close" onClick={() => props.setOpen(false)}></i>
            </header>
            <main>
                {props.children}
            </main>
        </ReactModal>
    )
}

export default Modal;