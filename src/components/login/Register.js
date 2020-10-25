import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { auth, userCreate } from "../../services/FirebaseDashboard";

export default function Register() {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const updateForm = (e) => {
    e.persist();
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    setError("");
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredentials) => {
        if (userCredentials.user) {
          userCredentials.user.updateProfile({
            displayName: user.username,
          });
        }

        const userForm = {
          ...user,
          uid: userCredentials.user.uid,
        };
        userCreate(userForm);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form style={{ marginTop: "200px" }} onSubmit={onSubmit}>
      {error}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={user.email || ""}
          name="email"
          onChange={updateForm}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          value={user.username || ""}
          name="username"
          onChange={updateForm}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={user.password || ""}
          onChange={updateForm}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
