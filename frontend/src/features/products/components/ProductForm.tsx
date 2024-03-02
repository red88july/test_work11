import { Alert, Box, Button, CircularProgress, Container, Grid, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch } from '../../../../app/hooks.ts';
import { productCreate } from '../productsThunk.ts';

import FileInput from '../../../components/FileInput/FileInput.tsx';
import { useSelector } from 'react-redux';
import { errorLoadProduct, loadingProduct } from '../productsSlice.ts';

const ProductForm = () => {

  const dispatch = useAppDispatch();

  const isLoadingProduct = useSelector(loadingProduct);
  const isErrorLoadProduct = useSelector(errorLoadProduct);

  const [state, setState] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
    price: 0,
  });

  const getfieldError = (fieldError: string) => {
    try {
      return isErrorLoadProduct?.errors[fieldError].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(productCreate(state)).unwrap();

      setState((prevState) => {
        return {
          ...prevState,
          title: '',
          description: '',
          category: '',
          price: 0,
        };
      });

    } catch (e) {
      //
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box marginTop={20}>
        {isErrorLoadProduct && (
          <Box marginBottom={4}>
            <Alert severity="warning">
              {isErrorLoadProduct.message}
            </Alert>
          </Box>
        )}
        <form
          autoComplete="off"
          onSubmit={onFormSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="title"
                label="Enter title"
                name="title"
                value={state.title}
                onChange={inputChangeHandler}
                error={Boolean(getfieldError('title'))}
                helperText={getfieldError('title')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                required
                id="description"
                label="Enter description of product"
                name="description"
                value={state.description}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item md>
              <TextField
                fullWidth
                required
                select
                id="category" label="Category"
                value={state.category}
                onChange={inputChangeHandler}
                name="category"
              >
                <MenuItem value="" disabled>Please select category...</MenuItem>
                <MenuItem value="SSDs">SSDs</MenuItem>
                <MenuItem value="GPUs">GPUs</MenuItem>
                <MenuItem value="Monitors">Monitors</MenuItem>
                <MenuItem value="Printers">Printers</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs>
              <FileInput
                label="Image"
                name="image"
                onChange={fileInputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                required
                id="price"
                label="Enter price of product"
                name="price"
                value={state.price}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={isLoadingProduct}>
                {isLoadingProduct ? <CircularProgress/> : 'Add new Product'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ProductForm;