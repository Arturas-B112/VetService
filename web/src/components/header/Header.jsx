import { Stack, Typography } from '@mui/material';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/vet-icon.svg';

const Header = () => {
  const links = [
    { title: 'Pets', to: '/' },
    { title: 'Medications', to: '/medications' },
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Link component={RouterLink} to="/">
            <img src={logo} alt="" />
          </Link>
          <Typography variant="h4">VET+</Typography>
        </Stack>

        <Stack direction="row" gap="1rem">
          {links.map((link) => (
            <Link
              key={link.title}
              underline="none"
              fontWeight={600}
              component={RouterLink}
              to={link.to}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
