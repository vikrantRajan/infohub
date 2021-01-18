import React, {useState} from 'react';
import { Modal,Button,Form, Col, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { postSuggestion}from '../../actions/homeactions.js'


const SuggestionModal = () =>{

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [ formValues, setFormValues] = useState({});
    const [ showToast, setToast] = useState(false);
    const [ message, setMessage] = useState('');
    const [ error, setError] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else{
          event.preventDefault();
          console.log(formValues);
        //   formValues['p_id'] = data.postId;
          postSuggestion(formValues).then((response) => {
              console.log(response);
              setToast(true);
              if(response.data) {
                  setError(false);
                  setShow(false);
                  setMessage('Thank you for reaching out to us!')
              }
              else {
                  setError(true)
                  setMessage('Error Please Try Again')
      
              }
          });
         
        }
        
        setValidated(true);
      };
  
      const onChange = (event) => {
          let input = formValues;
      input[event.target.name] = event.target.value;
      setFormValues(input);
      }
  
    return (
      <>
       <div className="filter-section navbar-nav-scroll">
      <div className="buttons pt-2 pb-2">
        <button className="btn btn-sm btn-outline-success float-right" onClick={handleShow}><FontAwesomeIcon icon={faBoxOpen} /> Suggestion Box </button>
      </div>
    </div>
  
        <Modal show={show} onHide={handleClose}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                 <Form.Label>Please post your Suggestions/Complaints/Feedbacks related to INFOHUB or CDM as a whole, DMC will try to resolve it</Form.Label>
                 <Form.Control as="textarea" rows="10" required name="content" onChange={onChange}/>
            </Form.Group>
  

          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" size="sm" variant="outline-success" >Submit</Button>
          </Modal.Footer>
            </Form>
        </Modal>
        <Toast onClose={() => setToast(false)} show={showToast} animation={false}  delay={5000} autohide
      style={ error ? {
        backgroundColor: '#dc3545',
        color:'white'
      } : {
           backgroundColor: '#28a745',
        color:'white'
      }}>
          
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </>
    );
}

export default SuggestionModal;