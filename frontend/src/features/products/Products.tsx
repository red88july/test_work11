import {Alert, Box, CircularProgress, Container} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {useEffect} from 'react';
import {getProducts} from './productsThunk.ts';
import ProductsList from './ProducltsList';
import {getAllProducts, isErrorLoadProducts, isLoadProducts} from './productsSlice.ts';

const Products = () => {

  const dispatch = useAppDispatch();
  const products = useAppSelector(getAllProducts);

  const loadingProducts = useAppSelector(isLoadProducts);
  const errorLoadingProducts = useAppSelector(isErrorLoadProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{marginTop: 15}} >
      {loadingProducts && (<Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={100}/></Box>)}
      {errorLoadingProducts &&
        <Alert severity="warning">
          Loading data is impossible!
        </Alert>}
      <Box display="flex" gap={1} flexWrap="wrap">
        {products.map(product => (
          <ProductsList
            id={product._id}
            key={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Products;