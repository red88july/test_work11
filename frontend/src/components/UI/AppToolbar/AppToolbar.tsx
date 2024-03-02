import { AppBar, Container, Grid, Link, Toolbar, Typography } from '@mui/material';

const MainNav = {
  color: 'inherit',
  textDecoration: 'none',
  underline: 'none',
  '&:hover': {
    color: 'inherit',
  },
};

const AppToolbar = () => {

  return (
    <AppBar sx={{mb: 2}}>
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
              <Link href="/" sx={MainNav}>
                TestWork11
              </Link>
            </Typography>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>

  );
};

export default AppToolbar;