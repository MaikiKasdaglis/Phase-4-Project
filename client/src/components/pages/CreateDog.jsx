import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import useUserStore from "../../hooks/userStore";

export default function CreateDog() {
  const { user } = useUserStore();
  return (
    <Container fluid>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <div className="border p-4 rounded">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Dog Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What do you call your dog?"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Dog Breed</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What breed is your dog?"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Dog Age</Form.Label>
                <Form.Control type="text" placeholder="How old is your dog?" />
              </Form.Group>
              <Button variant="primary" type="submit" className="m-1 ">
                Register Dog!
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
