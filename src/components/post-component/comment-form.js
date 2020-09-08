import { Form, Button, Col, Toast } from 'react-bootstrap'
import React, {useState} from 'react';
import { postComment }from '../../actions/postaction.js';

function CommentSubmit(data) {
    const [validated, setValidated] = useState(false);
    const [ formValues, setFormValues] = useState({});
    const [ showToast, setToast] = useState(false);
    const [ message, setMessage] = useState('');
    const [ error, setError] = useState(false);
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        event.preventDefault();
        formValues['p_id'] = data.postId;
        postComment(formValues).then((response) => {
            setToast(true);
            if(response.data) {
                setError(false)
                setMessage('Thank you for leaving a comment! Upon approval the content will be displayed on our website')
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
        <div style={{overflow:"hidden"}}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Comment</Form.Label>
    <Form.Control as="textarea" rows="3" required name="comment" onChange={onChange}/>
  </Form.Group>
          <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            onChange={onChange}
            name="author"
            value={formValues.author}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={onChange}
          />
          </Form.Group>
          </Form.Row>
          
        <Button className="float-right" type="submit" size="sm" variant="outline-success" >Submit</Button>
      </Form>
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
  </div>
    );
  }
export default CommentSubmit;
