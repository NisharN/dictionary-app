import axios from 'axios';
import './App.css';
import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Header from './components/header/header';
import Define from './components/definings/define';
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
function App() {

  const[word,setWord]= useState("");
  const [meanings,setMeanings]=useState([])
  const [category,setCategory]=useState("en");
  const [lightMode,setLightMode]=useState(false);
  const ThemeSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: grey[600],
      '&:hover': {
        backgroundColor: alpha(grey[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: grey[600],
    },
  }));
  const dictionaryApi = async () => {
    try{
      const data=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
      setMeanings(data.data);
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    dictionaryApi();
  },[word,category])

//when ever brackets are empty it will run only once but if we put some variable in the brackets it will run whenever that variable changes
//used container to make the app responsive from material ui.it will adapt to the screen size
  return (
    <div className="App" style={{height:"100vh",backgroundColor:lightMode?"#fff":"#282c34",color:lightMode?"black":"white",transition:"all 0.5s linear"}}>

      <Container maxWidth="md" style={{display:"flex",flexDirection:"column",height:"100vh",justifyContent:"space-evenly"}}>
       <div style={{position:"absolute",top:0,right:15,paddingTop:"10"}}>
       <span>{lightMode?"Dark":"Light"} Mode</span>
       <ThemeSwitch checked={lightMode} onChange={()=>setLightMode(!lightMode)} />
       </div>
       <Header  setCategory={setCategory}  word={word} setWord={setWord} lightMode={lightMode} setMeanings={setMeanings}></Header>
       {meanings && <Define word={word} meanings={meanings} category={category} lightMode={lightMode}/>}
      </Container>
    </div>
  );
}

export default App;
