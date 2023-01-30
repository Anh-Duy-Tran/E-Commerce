import { Box, Container, Typography, TextField, Grid, useTheme } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useState } from "react";

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
  'all',
  'men',
  'women',
  'shirt',
  'trouser',
  'shoe',
  'accessories'
];

const letter_size = ["XS", "S", "M", "L", "XL", "XXL"]
const number_size = ['30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', '60'];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const AddProductForm = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Container component="main" sx={{mt : 15}}>
      <Typography sx={{fontFamily: 'Futura', }} component="h1" variant="h5">
            ADD NEW PRODUCT
      </Typography>

      <Typography sx={{fontFamily: 'Futura', mt: 2 }} component="h1">
            Product information:
      </Typography>

      <Box component="form"
          sx={{
            display : 'flex',
            flexDirection: 'column'
          }}
      >
        <Container component="item">
          <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="product-name"
                  label="Product name"
                  name="product-name"
                  autoComplete="product-name"
          />
        </Container>
        <Container component="item">
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

        </Container>

        <Container component="item" sx={{display : 'flex'}}>

          <OutlinedInput
            sx={{mt:1}}
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            placeholder="Price"
          />

          <InputLabel id="multiple-chip-label">Chip</InputLabel>
          <Select
            sx={{ml: 1, mt: 1, flexGrow: 1}}
            labelId="multiple-chip-label"
            id="multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="abc" placeholder="Product types" />}
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
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        </Container>

        <Typography sx={{fontFamily: 'Futura', mt: 2 }} component="h1">
            Product colors and images:
        </Typography>

      </Box>
    </Container>
  )

}

export default AddProductForm