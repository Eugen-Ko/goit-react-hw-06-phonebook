import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
  return (
    <>
      {/* <Container
        p={3}
        maxW="sm"
        bg="#fffdde"
        centerContent
        borderLeft="3px"
        borderRight="3px"
        borderBottom={1}
        borderStyle="ridge"
      > */}
      <Outlet />
      <Toaster />
      {/* </Container> */}
    </>
  );
};
