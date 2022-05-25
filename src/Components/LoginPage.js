import { Button, Card, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Colors } from "../constants";
import { useNavigate } from "react-router-dom";

const RootDiv = styled("div")(({ theme }) => ({
  backgroundColor: Colors.LIGHT_COLOR,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const RootCard = (theme) => ({
  width: 500,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  alignItems: "center",
  border: "1px solid",
  borderColor: Colors.BACKGROUND_COLOR,
});

export default function LoginPage() {

    const navigate = useNavigate()
    
  const [showPassword, setShowPassword] = useState(false);


  const [LoginData , setLoginData] = useState({
      username:'',
      password:''
  })

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLoginBtn();
    }
  };

  const handleLoginBtn = () => {

    console.log(LoginData);
      if(LoginData.username === ''){
          alert('please enter username')
      }else if(LoginData.password === ''){
          alert('please enter password')
      }else if(LoginData.password === '123'){
        navigate('/home' , {state:LoginData})
      }else{
        alert('incorrect username or password')
      }
  }

  return (
    <div>
      <RootDiv>
        <Card elevation={5} sx={RootCard}>
          <Typography
            variant="h4"
            sx={{
              backgroundColor: Colors.MAIN_COLOR,
              color: "#fff",
              width: "100%",
              textAlign: "center",
              padding: "5px",
            }}
          >
            {" "}
            Assessment Tool{" "}
          </Typography>

          <div style={{ width: "90%", margin: "10px 0" }}>
            <Typography variant="subtitle1">UserName</Typography>
            <TextField autoComplete="off" fullWidth size="small" variant="outlined" value={LoginData.username} onChange={(e) => setLoginData({...LoginData , username:e.target.value})}  />
          </div>

          <div style={{ width: "90%", margin: "10px 0" }}>
            <Typography variant="subtitle1">Password</Typography>
            <TextField autoComplete="off" type={showPassword ? 'text' : 'password'} 
            onKeyDown={handleKeyPress}
            value={LoginData.password} onChange={(e) => setLoginData({...LoginData , password:e.target.value})}
               InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => {setShowPassword(!showPassword)}}
                      onMouseDown={(e) => e.preventDefault()}>
                      {showPassword && <Visibility />}
                      {!showPassword && <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            fullWidth size="small" variant="outlined" />
          </div>

          <div style={{ width: "90%", margin: "10px 0" }}>
            <Button fullWidth size="small" variant="contained" sx={{backgroundColor:Colors.BTN_COLOR , '&:hover':{backgroundColor:Colors.BTN_COLOR}}}
            onClick={() => handleLoginBtn()}
            >
              Login
            </Button>
          </div>
        </Card>
      </RootDiv>
    </div>
  );
}
