import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

export const Layout = () => {
  return (
    <>
      <Container
        p={3}
        maxW="sm"
        bg="#fffdde"
        centerContent
        borderRadius="lg"
        borderWidth="3px"
        borderStyle="ridge"
      >
        <Outlet />
      </Container>
    </>
  );
};
