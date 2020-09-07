import { Form, Button, Col, Toast } from 'react-bootstrap'
import React, {useState} from 'react';
import { postComment }from '../../actions/postaction.js';

function CommentSubmit(data) {
    const [validated, setValidated] = useState(false);
    const [ formValues, setFormValues] = useState({});
    const [ showToast, setToast] = useState(false);
    const [ message, setMessage] = useState('');
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        event.preventDefault();
        formValues['post_id'] = data.postId;
        const check = postComment(formValues);
        // setToast(true);
        // if(1) {
        //     // setMessage('Thank you for leaving a comment! Upon approval the content will be displayed on our website')
        // }
        // else {
        //     setMessage('Error Please Try Again')

        // }
      }
      
      setValidated(true);
    };

    const onChange = (event) => {
        let input = formValues;
    input[event.target.name] = event.target.value;
    setFormValues(input);
    }

  
    return (
        <div>
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
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
          </Form.Group>
          </Form.Row>
          
        <Button type="submit" size="sm">Submit form</Button>
      </Form>
      <Toast onClose={() => setToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt="" 
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
  </div>
    );
  }
export default CommentSubmit;
