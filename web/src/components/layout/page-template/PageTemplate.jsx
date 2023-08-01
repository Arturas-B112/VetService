import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';

const PageTemplate = () => {
  return (
    <>
      <Stack>
        <Header />
        <Outlet />
        <Footer />
      </Stack>
    </>
  );
};

export default PageTemplate;
