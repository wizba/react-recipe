import React,{useState} from 'react';
import Box from '@mui/material/Box';
import './style.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

// for the list component
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// list component
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: 16,
    borderRadius: 4,
  },
  button: {
    padding: 8,
  },
}));

export default function App() {
  const classes = useStyles();
  const [searchTerm,setSearchTerm] = useState('');
  const [_recipe,_setRecipe] = useState([])
  const OnSearchReciepe = (event) =>{
    let reciepe = event.target.value;
    console.log(reciepe)
    setSearchTerm(reciepe);
  }
  const getApiData = async () => {
    let response = await fetch(
      `https://api.edamam.com/search?q=${searchTerm}&app_id=ae258d19&app_key=da45a9ad2777b046321684d890e48f50`
    );
    let data = await response.json();
    console.log(data);

    const { hits } = data;

    const rc = hits.map(val => val.recipe)
    _setRecipe(rc)
  };

  return (
    <div>
      <React.Fragment>
        <Container >
          <Box sx={{display: 'flex',justifyContent:'center'}}>
            <FormControl sx={{ m: 1, width: '300px' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-password"
              type={'text'}
              onChange ={
                OnSearchReciepe
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick = {getApiData}
                  >
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          </Box>
          
            <ReciepeList _recipe = {_recipe}/>
          
         
          
        </Container>
      </React.Fragment>
    </div>
  );
}

const ReciepeList = (props) =>{
  const {_recipe} = props;
  return (<Grid container spacing={2} mb={4} sx={{display: 'flex',justifyContent:'center'}}>
    {_recipe.map(val=> <Grid item sm={12} md={6} lg={4} mt={4}>
            <RecipeItem item = {val}/>
        </Grid>)
    }
  </Grid>

  )
}
 function RecipeItem({item}) {
  return (
    <Card sx={{ maxWidth: 345,padding:'10px',borderRadius:'10px'}}>
      <CardMedia
        component="img"
        // height="140"
        image={item.image }
        alt="green iguana"
        sx={{borderRadius:'10px'}}
      />
      <CardContent>
        
        <Typography variant="body2" color="text.secondary">
         {item.label}
        </Typography>
      </CardContent>
     
    </Card>
  );
}