import PageNoFoundPicture from '../src/assets/images/404PageNotFound.jpg';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import RegForm from './features/users/components/RegForm';
import {Box} from '@mui/material';
import LogForm from './features/users/components/LogForm';
import ProductForm from './features/products/components/ProductForm';
import Products from './features/products/Products';
import Gpu from './features/categories/Gpu';
import Ssd from './features/categories/Ssd';
import Monitors from './features/categories/Monitors';
import Printers from './features/categories/Printers';
import ViewProduct from './features/products/ViewProduct.tsx';

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<Products />)}/>
          <Route path="/register" element={(<RegForm />)}/>
          <Route path="/login" element={(<LogForm />)}/>
          <Route path="/new-product" element={(<ProductForm />)}/>
          <Route path="products/:id" element={(<ViewProduct />)}/>
          <Route path="/all-items" element={(<Products />)}/>
          <Route path="/GPUs" element={(<Gpu />)}/>
          <Route path="/SSDs" element={(<Ssd />)}/>
          <Route path="/monitors" element={(<Monitors />)}/>
          <Route path="/printers" element={(<Printers />)}/>
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
