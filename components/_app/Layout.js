import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import TopHeader from './TopHeader';

export default ({ children, user }) => (
  <>
    <Head>
      <link rel="stylesheet" type="text/css" href="/css/styles.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
      />
      <title>Personal Project Management</title>
    </Head>
    <TopHeader user={user} />
    <Container>{children}</Container>
  </>
);
