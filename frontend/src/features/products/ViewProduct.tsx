import { Box, CardMedia, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import picOfProduct from '../../assets/images/image_not_available.png';


import { apiURL } from '../../constants.ts';
import { selectViewProduct } from './productsSlice.ts';
import { viewOneProduct } from './productsThunk.ts';

const stylePostBox = {
  borderRadius: '10px',
  border: '2px solid #42a5f5',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 20px 20px 20px',
  alignItems: 'center',
  marginBottom: '10px',
  background: 'linear-gradient(90deg, rgba(0,224,255,0.24413515406162467) 0%, rgba(255,255,255,1) 100%)',
  '&:hover': {
    boxShadow: '6px 7px 21px -5px rgba(0,0,0,0.27)',
  }
};

const ViewProduct = () => {
  const dispatch = useAppDispatch();
  const viewProduct = useSelector(selectViewProduct);

  let imagePost = picOfProduct;

  if (viewProduct?.image) {
    imagePost = apiURL + '/' + viewProduct?.image;
  }

  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(viewOneProduct(id));
    }
  }, [dispatch, id]);


  return (
      <Container maxWidth="sm">
        <Box marginTop={10}>
          <Box key={viewProduct?._id} id={viewProduct?._id} sx={stylePostBox}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <CardMedia
                component="img"
                sx={{width: '80%', height: 'auto', borderRadius: '10px', border: '3px solid black'}}
                image={imagePost}
                alt="message"
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Box marginTop={3}>
                <Typography gutterBottom variant="subtitle2" component="div">
                  <strong>Product: </strong><em>{viewProduct?.title}</em>
                </Typography>
              </Box>
              <Box >
                <Typography gutterBottom variant="subtitle1" component="div">
                  <p style={{textIndent: '25px'}}>{viewProduct?.description}</p>
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" justifyContent="right" marginBottom={1}>
                <Box display="flex" flexDirection="column" width="300px">
                  <Typography gutterBottom variant="subtitle2" component="div">
                   <b>Category: </b><em>{viewProduct?.category}</em>
                  </Typography>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    <b>Price: </b><em>{viewProduct?.price}</em>$
                  </Typography>
                  <Box marginTop={3}>
                    <Typography gutterBottom variant="subtitle2" component="div">
                      <b>Salesman: </b><em>{viewProduct?.user.name}</em>
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="div">
                      <b>Phone of salesman: </b><em>{viewProduct?.user.phone}</em>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
  );
};

export default ViewProduct;