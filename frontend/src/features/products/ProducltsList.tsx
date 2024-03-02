import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

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

interface Props {
  id: string;
  title: string;
  price: number;
  image: string | null;
}

const ProductsList: React.FC<Props> = ({id, title, price, image}) => {
  let imageProduct = picOfProduct;

  if (image) {
    imageProduct = apiURL + '/' + image;
  }

  return (
    <Box marginTop={2}>
      <Box key={id} id={id} sx={stylePostBox}>
        <Box>
          <CardMedia
            component="img"
            sx={{width: 130, height: 130, borderRadius: '10px', border: '3px solid black'}}
            image={imageProduct}
            alt={title}
          />
        </Box>
          <Box display="flex" flexDirection="column" alignItems="center" marginBottom={1}>
            <Typography gutterBottom variant="subtitle2" component="div">
              <em>{title}</em>
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              <b>Price: </b><em>{price}</em>$
            </Typography>
          </Box>
      </Box>
    </Box>
  );
};

export default ProductsList;