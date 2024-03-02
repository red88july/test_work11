import PageNoFoundPicture from '../src/assets/images/404PageNotFound.jpg';
import Layout from './components/Layout/Layout.tsx';
import {Route, Routes} from 'react-router-dom';
import RegForm from './features/users/components/RegForm.tsx';
import {Box} from '@mui/material';
import LogForm from './features/users/components/LogForm.tsx';
import ProductForm from './features/products/components/ProductForm.tsx';
import Products from './features/products/Products.tsx';

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<Products />)}/>
          <Route path="/all-items" element={(<Products />)}/>
          <Route path="/register" element={(<RegForm />)}/>
          <Route path="/login" element={(<LogForm />)}/>
          <Route path="/new-product" element={(<ProductForm />)}/>
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
