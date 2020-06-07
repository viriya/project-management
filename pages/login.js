import { useState, useEffect } from 'react'
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import Link from "next/link";
import axiosapi from "../utils/axiosApi"
import cookie from "js-cookie"
import catchErrors from "../utils/catchErrors"
import { useRouter } from "next/router"

const INITIAL_USER = {
   email: "",
   password: ""
};



function login() {
   const [user, setUser] = useState(INITIAL_USER)
   const [error, setError] = useState("");
   const [disabled, setDisabled] = useState(true);
   const [loading, setLoading] = useState(false);
   const router = useRouter()

   useEffect(() => {
      const isUser = Object.values(user).every(el => Boolean(el));
      isUser ? setDisabled(false) : setDisabled(true);
   }, [user])

   async function handleSubmit(event) {
      event.preventDefault()
      try {
         setLoading(true)
         const { data } = await axiosapi.post("api/login", user)
         cookie.set("token", data)
         router.push("/")
      } catch (error) {
         console.log(error)
         catchErrors(error, setError)
      } finally {
         setLoading(false)
      }

   }

   function handleChange(event) {
      const { name, value } = event.target;
      setUser(prevState => ({ ...prevState, [name]: value }));
   }

   return (
      <>
         <Message
            attached
            icon="unlock"
            header="Welcome Back!"
            content="Log in with email and password"
            color="blue"
         />
         <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
            <Message error header="Oops!" content={error} />
            <Segment>
               <Form.Input
                  fluid
                  icon="envelope"
                  iconPosition="left"
                  label="Email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
               />
               <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
               />
               <Button
                  disabled={disabled || loading}
                  icon="sign in"
                  type="submit"
                  color="orange"
                  content="Login"
               />
            </Segment>
         </Form>
         <Message attached="bottom" warning>
            <Icon name="info circle" />
        New user?{" "}
            <Link href="/signup">
               <a>Sign up here</a>
            </Link>{" "}
        instead.
      </Message>
      </>
   )
}

export default login