import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import cookie from 'js-cookie';
import Router from 'next/router';

export default ({ user }) => {
  function handleLogout() {
    cookie.remove('token');
    Router.push('/login');
  }

  return (
    <Menu inverted fluid className="sharp-corner">
      <Container>
        <Link href="/">
          <Menu.Item header>
            <Image
              size="mini"
              src="/img/project.svg"
              style={{ marginRight: '1em' }}
            />
            Project-Management
          </Menu.Item>
        </Link>
        {user && (
          <Link href="/new">
            <a>
              <Menu.Item header>
                <Icon name="file alternate outline" size="large" />
                New Project
              </Menu.Item>
            </a>
          </Link>
        )}

        <Menu.Menu position="right">
          {user ? (
            <>
              <Menu.Item header>
                <Icon name="user outline" size="large" />
                {user.name}
              </Menu.Item>

              <Menu.Item header onClick={handleLogout}>
                <Icon name="sign out" size="large" />
                Logout
              </Menu.Item>
            </>
          ) : (
            <Link href="/login">
              <Menu.Item header>
                <Icon name="sign in" size="large" />
                Login
              </Menu.Item>
            </Link>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
