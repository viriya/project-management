import { useState } from 'react'
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import axiosapi from "../utils/axiosApi"
import { useRouter } from 'next/router'
import cookie from "js-cookie"

const INITIAL_PROJECT = {
   name: "",
   description: ""
}

function newProject() {
   const [project, setProject] = useState(INITIAL_PROJECT)
   const router = useRouter()
   const token = cookie.get("token")

   function handleChange(event) {
      const { name, value } = event.target;
      setProject(prevState => ({ ...prevState, [name]: value }));
   }

   async function handleSubmit(e) {
      e.preventDefault()
      const payload = { headers: { Authorization: token } };
      await axiosapi.post("api/project", project, payload)
      router.push("/")
   }

   return (
      <>
         <Message
            attached
            icon="tasks"
            header="New Project"
            content="Create new project"
            color="teal"
         />
         <Form onSubmit={handleSubmit}>
            <Segment>
               <Form.Input
                  fluid
                  label="Project Name"
                  placeholder="Project Name"
                  name="name"
                  type="text"
                  value={project.name}
                  onChange={handleChange}
               />
               <Form.TextArea

                  label="Description"
                  placeholder="Description"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
               />
               <Button
                  icon="play"
                  type="submit"
                  color="orange"
                  content="Submit"
               />
            </Segment>
         </Form>
      </>
   )
}

export default newProject