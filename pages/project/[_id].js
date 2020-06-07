import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import axiosapi from '../../utils/axiosApi';
import countPercent from '../../utils/countPercent';
import Link from 'next/link';
import {
  Header,
  Icon,
  Button,
  Checkbox,
  Modal,
  Input,
  Progress,
  Segment,
} from 'semantic-ui-react';

const projectDetail = ({ project }) => {
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(project.tasks);
  const [percent, setPercent] = useState(0);
  const token = cookie.get('token');

  useEffect(() => {
    setPercent(countPercent(tasks));
  }, [tasks]);

  async function handleAdd() {
    const payload = { headers: { Authorization: token } };
    const res = await axiosapi.post(
      'api/task',
      { projectId: project._id, task },
      payload
    );
    setTasks(res.data);
    setModal(false);
    setTask('');
  }

  async function removeTask(taskId) {
    const payload = {
      params: { projectId: project._id, taskId },
      headers: { Authorization: token },
    };
    const res = await axiosapi.delete('api/task', payload);
    setTasks(res.data);
  }

  async function onComplete(event, data, taskId, index) {
    // const newTasks = [...tasks];
    // newTasks[index].completed = data.checked;
    // setTasks(newTasks);
    const headers = { headers: { Authorization: token } };
    const params = { projectId: project._id, taskId, complete: data.checked };
    // console.log(params);
    const res = await axiosapi.put('api/updateTask', params, headers);
    setTasks(res.data);
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="tasks" />
        <Header.Content>
          {project.name}
          <Header.Subheader>{project.description}</Header.Subheader>
        </Header.Content>
      </Header>
      <Header as="h3">Project completion :</Header>
      <Progress percent={percent} progress indicating />
      <div>
        <Button
          icon="add"
          floated="right"
          primary
          onClick={() => setModal(true)}
        />
        <Header as="h3">List of tasks to complete :</Header>
      </div>
      <div style={{ marginTop: '2em' }}>
        <Segment.Group>
          {tasks.map((t, i) => (
            <Segment key={t.task}>
              <Button
                basic
                icon
                floated="right"
                color="pink"
                onClick={() => removeTask(t._id)}
              >
                <Icon name="trash alternate outline" />
              </Button>
              <Checkbox
                toggle
                label={t.task}
                defaultChecked={t.completed}
                onChange={(e, d) => onComplete(e, d, t._id, i)}
              />
              <br clear="right" />
            </Segment>
          ))}
        </Segment.Group>
      </div>
      <br></br>
      <Link href="/">
        <a>Return to Home</a>
      </Link>
      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Add Task</Modal.Header>
        <Modal.Content>
          <Input
            focus
            placeholder="new task"
            fluid
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModal(false)} content="Cancel" />
          <Button
            primary
            icon="add"
            labelPosition="right"
            content="Add"
            onClick={handleAdd}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

projectDetail.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  const {
    query: { _id },
  } = ctx;
  if (!token) {
    return { project: [] };
  }
  const payload = { headers: { Authorization: token } };
  const params = { params: { _id } };
  const response = await axiosapi.get('api/project', params, payload);
  return response.data;
};

export default projectDetail;
