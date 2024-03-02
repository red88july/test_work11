import React from 'react';
import picOfProduct from '../../assets/images/ic-message.png';
import {apiURL} from '../../constants.ts';
import {Box, CardMedia, Typography} from '@mui/material';

const stylePostBox = {
  borderRadius: '10px',
  border: '2px solid #42a5f5',
  display: 'flex',
  padding: '5px',
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
        <Box display="flex" flexDirection="column" marginLeft={5} width="400px">
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
            <Typography gutterBottom variant="subtitle2" component="div">
              <em>{title}</em>
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              <em>{price}</em>
            </Typography>
          </Box>
          {/*<Box>*/}
          {/*  <Typography gutterBottom variant="h6" sx={picTitle} component="div">*/}
          {/*    <Link href={`posts/${id}`}>*/}
          {/*      <strong>{title}</strong>*/}
          {/*    </Link>*/}
          {/*  </Typography>*/}
          {/*</Box>*/}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsList;