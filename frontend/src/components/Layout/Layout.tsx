import { PropsWithChildren } from 'react';
import AppToolbar from '../UI/AppToolbar/AppToolbar';
import { Box, Link, Typography } from '@mui/material';



const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Box display="flex">
            <Box marginTop={20}>
              <Box marginBottom={1}>
                <Link href="/all-items" >
                  <Typography variant="h5">
                    All items
                  </Typography>
                </Link>
              </Box>
              <Box marginBottom={1}>
                <Link href="/GPUs">
                  <Typography>
                    GPUs
                  </Typography>
                </Link>
              </Box>
              <Box marginBottom={1}>
                <Link href="/SSDs">
                  <Typography>
                    SSDs
                  </Typography>
                </Link>
              </Box>
              <Box marginBottom={1}>
                <Link href="/monitors">
                  <Typography>
                    Monitors
                  </Typography>
                </Link>
              </Box>
              <Box marginBottom={1}>
                <Link href="/printers">
                  <Typography>
                    Printers
                  </Typography>
                </Link>
              </Box>
            </Box>
          {children}
        </Box>
      </main>
    </>
  );
};

export default Layout;