import axiosapi from '../utils/axiosApi';
import { parseCookies } from 'nookies';
import {
  Progress,
  Header,
  Icon,
  Table,
  Segment,
  Button,
} from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import countPercent from '../utils/countPercent';

const Home = ({ projects }) => {
  const router = useRouter();
  return (
    <>
      <Header as="h2" block>
        <Icon name="tasks" />
        Unfinished Projects
      </Header>
      {projects.length ? (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Project</Table.HeaderCell>
              <Table.HeaderCell>Last Update</Table.HeaderCell>
              <Table.HeaderCell>Progress</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {projects.map((p) => {
              return (
                <Table.Row key={p._id.toString()}>
                  <Table.Cell>
                    <Link
                      href="project/[_id]"
                      as={`project/${p._id.toString()}`}
                    >
                      <a>{p.name}</a>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(p.updatedAt).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Progress
                      percent={countPercent(p.tasks)}
                      progress
                      indicating
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <Segment secondary color="teal" inverted textAlign="center" placeholder>
          <Header icon>
            <Icon name="circle outline" />
            No projects yet. Add some!
          </Header>
          <div>
            <Button color="orange" onClick={() => router.push('/new')}>
              Add new project
            </Button>
          </div>
        </Segment>
      )}
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { projects: [] };
  }
  const payload = { headers: { Authorization: token } };
  const response = await axiosapi.get('api/projects', payload);
  return response.data;
};

export default Home;
