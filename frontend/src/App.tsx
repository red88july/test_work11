import PageNoFoundPicture from '../src/assets/images/404PageNotFound.jpg';
import Layout from './components/Layout/Layout.tsx';
import {Route, Routes} from 'react-router-dom';
import RegForm from './features/users/RegForm.tsx';
import {Box} from '@mui/material';

function App() {

  return (
    <>
      <Layout>
        <Routes>
          {/*<Route path="/" element={(<Posts />)}/>*/}
          <Route path="/register" element={(<RegForm />)}/>
          {/*<Route path="/login" element={(<LogForm />)}/>*/}
          {/*<Route path="/new-post" element={(<PostForm />)}/>*/}
          {/*<Route path="posts/:id" element={(<ViewPost />)}/>*/}
          <Route path="*" element={(
            <Box
              sx={{display: "flex", alignItems:'center',
                justifyContent: 'center', marginTop: '50px'}} >
              <Box component="img"
                   sx={{width: '50rem', height: '50rem'}}
                   src={PageNoFoundPicture}
                   alt="Page Not Found"/>
            </Box>
          )}/>
        </Routes>

      </Layout>

    </>
  );
}

export default App;
