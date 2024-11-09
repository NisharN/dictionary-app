import React from 'react'
import './header.css'
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import categories from '../../data/categories';
import debounce from 'lodash.debounce';
const header = ({setCategory,category,word,setWord,setMeanings,lightMode}) => {
    const darkTheme = createTheme({
        palette: {
            primary:{
                main:lightMode?"#000":"#fff",
            },
          mode:lightMode?"light" : 'dark',
        },
      });
      const handleChange = (e)=>{
       setCategory(e.target.value);
       setWord("");
       setMeanings([]);
      };
      const handleText=debounce((text)=>{ 
        setWord(text);
      },500);
  return (
    <div className="header">
        <span className="title">{word?word:"dictionary-app"}</span>
        <div className="input">
        <ThemeProvider theme={darkTheme}>
        <TextField className="search" 
        label="Search a Word"
          onChange={(e)=>handleText(e.target.value)} />
        <TextField
          select
          label="Language"
          value={category}
          onChange={(e)=>handleChange(e)}
          className="select"
          
    
        >
           {
            categories.map((option)=>(
            <MenuItem key={option.label} value={option.label}>
                    {option.value}
                </MenuItem>
        ))}
      
        
        </TextField>
        </ThemeProvider>
        </div>
    </div>
  )
}

export default header