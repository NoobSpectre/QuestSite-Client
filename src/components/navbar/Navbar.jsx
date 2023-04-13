import { useMediaQuery } from '@mui/material';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';

export const Navbar = () => {
  const isMobile = useMediaQuery(`(max-width: 700px)`);

  return <>{isMobile ? <NavbarMobile /> : <NavbarDesktop />} </>;
};
