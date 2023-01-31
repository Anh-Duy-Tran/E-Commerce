import { Box, Container, Typography, TextField, Grid, useTheme, Button } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircleIcon from '@mui/icons-material/Circle';
import { useContext, useState } from "react";
import { UserContext } from "../context/User/UserProvider";
import Cookies from "js-cookie";
import productService from '../services/products'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const names = [
  'new',
  'all',
  'men',
  'women',
  'shirt',
  'trouser',
  'shoe',
  'accessories'
];

const Alpha = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
const Numeric = ['30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', '60'];

function getStyles(name, productType, theme) {
  return {
    fontWeight:
      productType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const AddProductForm = () => {
  const theme = useTheme();

  const { state, dispatch } = useContext(UserContext);

  const [ productType, setProductType ] = useState([]);
  const [ productSize, setProductSize ] = useState([]);
  
  const [ sizeType, setSizeType ] =  useState('')
  const [ sizeOption, setSizeOption ] = useState(["Please choose a size type"])

  const [ numColor, setNumColor ] = useState(1);
  const [ previewColor, setPreviewColor ] = useState(['']);

  const [ errorPrice, setErrorPrice ] = useState(false);
  const [ errorColor, setErrorColor ] = useState(false);

  const handleProductTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleProductSizeChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductSize(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleSizeType = (event) => {
    setSizeType(event.target.value);

    setProductSize([]);
    setSizeOption([... event.target.value === 'Numeric size' ? Numeric : Alpha]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)

    const newProduct = {
      name : data.get('product-name'),
      description : data.get('product-description'),
      price : parseFloat(data.get('product-price')),
      type : [...productType],
      size : [...productSize],
      color : Array.from(Array(numColor).keys()).map(
        i => (
          {
            name : data.get(`color-${i}-name`),
            code : `#${data.get(`color-${i}-code`)}`,
          }
        )),

      image : Object.fromEntries(new Map(Array.from(Array(numColor).keys()).map(
          i => {
            const name = data.get(`color-${i}-name`);
            const images = data.get(`color-product-image-${i}`).split(';').map(url => url.trim())
            return [name, images]}
      ))),

      idle : data.get(`color-product-image-0`).split(';').map(url => url.trim())[0],
      active : data.get(`color-product-image-0`).split(';').map(url => url.trim())[0]
    }


    dispatch({ type : "set-product-preview", payload : newProduct });
    dispatch({ type : "togle-preview"});
  }

  return (
    <Container component="main" sx={{mt : 15}}>
      <Typography sx={{fontFamily: 'Futura', }} component="h1" variant="h5">
            ADD NEW PRODUCT
      </Typography>

      <Typography sx={{fontFamily: 'Futura', mt: 4 }} component="h1">
            Product information:
      </Typography>

      <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display : 'flex',
            flexDirection: 'column'
          }}
      >
        <Container sx={{mt : 1}}>
          <FormControl variant="outlined" fullWidth>
            <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="product-name"
                    label="Product name"
                    name="product-name"
                    autoComplete="product-name"
            />
          </FormControl>
        </Container>

        <Container sx={{mt : 1}} >
          <FormControl variant="outlined" fullWidth>
            <TextField
                    margin="none"
                    required
                    fullWidth
                    id="product-description"
                    label="Product description"
                    name="product-description"
                    autoComplete="product-description"
                    multiline
            />

          </FormControl>
        </Container>

        <Container  sx={{display : 'flex', mt: 2, gap : 1.5}}>
          <FormControl variant="outlined">
            <InputLabel error={errorPrice} htmlFor="product-price">Price</InputLabel>
            <OutlinedInput
              required
              error={errorPrice}
              onChange={(e) => setErrorPrice(isNaN(e.target.value) || isNaN(parseFloat(e.target.value)))}
              id="product-price"
              name="product-price"
              label='Price'
              endAdornment={<InputAdornment position="end">€</InputAdornment>}
              aria-describedby="product price"
            />
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="product-type-label">Product type</InputLabel>
            <Select
              sx={{flexGrow: 1}}
              labelId="product-type-label"
              id="product-type"
              multiple
              value={productType}
              onChange={handleProductTypeChange}
              input={<OutlinedInput id="select-multiple-chip" label="Product type"/>}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, productType, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>

        <Container sx={{display : 'flex', mt : 2, gap : 1.5}}>
          <FormControl variant="outlined" sx={{ width : '200px'}} >
            <InputLabel htmlFor="size-type">Size type</InputLabel>
            <Select 
              id="size-type"
              placeholder="abc"
              value={sizeType}
              label="Size type"
              onChange={handleSizeType}
            >
              <MenuItem value="Numeric size">
                Numeric size
              </MenuItem>
              <MenuItem value="Alpha size">
                Alpha size
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="product-size-label">Product size</InputLabel>
            <Select
              sx={{flexGrow: 1}}
              labelId="product-size-label"
              id="product-size"
              multiple
              value={productSize}
              onChange={handleProductSizeChange}
              input={<OutlinedInput id="select-multiple-chip" label="Product size"/>}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {sizeOption.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, productType, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Container>

        <Typography sx={{fontFamily: 'Futura', mt: 6 }} component="h1">
            Product colors and images:
        </Typography>

        <Container sx={{display : "flex", justifyContent: "center"}}>
          <Button onClick={() => {
            setPreviewColor((crr) => {
              let temp = [...crr]
              temp.push('')
              return temp
            })
            setNumColor(numColor + 1)}
          }>
            Add new color
          </Button>
        </Container>

        <Box>
          {
            Array.from(Array(numColor).keys()).map(
              i => (
                  <Container key={i} sx={{ display : "flex"}}>
                    <FormControl>
                      <TextField
                                margin="normal"
                                required
                                fullWidth
                                id={`color-${i}-name`}
                                label={`Color${i} name`}
                                name={`color-${i}-name`}
                                autoComplete="color-name"
                      />
                      <TextField
                                error={errorColor}
                                margin="dense"
                                required
                                fullWidth
                                id={`color-${i}-code`}
                                label={`Color${i} code (Hex)`}
                                name={`color-${i}-code`}
                                onChange={(e) => {
                                  if (e.target.value.length !== 6) {
                                    setErrorColor(true);
                                    return;
                                  }
                                  setErrorColor(false);
                                  const temp = [...previewColor]
                                  temp[i] = `#${e.target.value}`
                                  setPreviewColor(temp)
                                }}
                                autoComplete='color-code'
                      />
                      <CircleIcon sx={{color : previewColor[i] }}></CircleIcon>  
                    </FormControl>

                    <FormControl sx={{flexGrow : 1}}>
                      <TextField
                                  sx={{ml : 1.5}}
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="color-product-image"
                                  label="Product image links (seperate by  ' ; ' )"
                                  name={`color-product-image-${i}`}
                                  autoComplete="image-links"
                                  multiline
                      />
                      {
                        i + 1 == numColor && numColor !== 1 
                        ? <Button 
                                  onClick={() => 
                                  {
                                    setNumColor(numColor - 1)
                                    setPreviewColor((crr) => {
                                      let temp = [...crr]
                                      temp.pop()
                                      return temp
                                    })
                                  }}
                                  sx={{mt : 1, ml : 2}}> Remove color
                          </Button>
                        : null
                      }
                      
                    </FormControl>
                  </Container>
              )
            )
          }

        </Box>
        
        <Button 
              sx={{mt : 4, ml : 2, mr : 2}}
              
              type="submit"
        >
          See preview
        </Button>
      </Box>
    </Container>
  )

}

export default AddProductForm