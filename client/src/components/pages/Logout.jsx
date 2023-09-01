import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useUserStore from "../../hooks/userStore";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(rgba(50, 50, 50, 0.8), rgba(255, 255, 255, 0.2)), url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4_yBNVbYuRP0dC5WYt68fVFsG-67s3P4qpw&usqp=CAU)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "20px",
    backgroundSize: "cover",
  };
  const { deleteUser } = useUserStore();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/home");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        deleteUser();
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  return (
    <Container fluid style={backgroundStyle}>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <div
            className="border p-4 rounded"
            style={{ backgroundColor: "rgba(225 , 225, 225, 0.5)" }}
          >
            <h2>Are You Sure You Want To Logout? </h2>
            <Form>
              <Button
                variant="primary"
                type="submit"
                onClick={handleLogout}
                className="m-1 "
              >
                Logout
              </Button>
              <Button
                style={{ marginLeft: "5px" }}
                variant="secondary"
                onClick={handleBackToHome}
              >
                Back To Home
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
