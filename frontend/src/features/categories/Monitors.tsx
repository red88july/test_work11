import {Alert, Box, CardMedia, CircularProgress, Container, Typography} from '@mui/material';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import {getAllProducts, isErrorLoadProducts, isLoadProducts} from '../products/productsSlice.ts';
import { getProducts } from '../products/productsThunk.ts';

import { apiURL } from '../../constants.ts';
import picOfProduct from '../../assets/images/image_not_available.png';

const stylePostBox = {
  borderRadius: '10px',
  border: '2px solid #42a5f5',
  display: 'flex',
  padding: '5px',
  width: '250px',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '10px',
  background: 'linear-gradient(90deg, rgba(0,224,255,0.24413515406162467) 0%, rgba(255,255,255,1) 100%)',
  '&:hover': {
    boxShadow: '6px 7px 21px -5px rgba(0,0,0,0.27)',
  }
};

const Monitors: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getAllProducts);

  const loadingProducts = useAppSelector(isLoadProducts);
  const errorLoadingProducts = useAppSelector(isErrorLoadProducts);

  const monitorsProducts = products.filter(product => product.category === 'Monitors');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 15 }}>
      <Typography gutterBottom variant="h4" component="div">
        <em>Monitors</em>
      </Typography>
      {loadingProducts && (<Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={100}/></Box>)}
      {errorLoadingProducts &&
        <Alert severity="warning">
          Loading data is impossible!
        </Alert>}
      <Box display="flex" gap={1} flexWrap="wrap">
        {monitorsProducts.map(product => (
          <Box key={product._id} sx={stylePostBox}>
            <Box>
              <CardMedia
                component="img"
                sx={{ width: 130, height: 130, borderRadius: '10px', border: '3px solid black' }}
                image={product.image ? apiURL + '/' + product.image : picOfProduct}
                alt={product.title}
              />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={1}>
              <Typography gutterBottom variant="subtitle2" component="div" marginTop={1}>
                <strong>{product.title}</strong>
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                <b>Price: </b><em>{product.price}</em>$
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Monitors;