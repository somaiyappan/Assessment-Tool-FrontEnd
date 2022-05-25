import { AppBar, Button, Divider, Toolbar, Typography, Tabs, Radio, RadioGroup, FormControlLabel, } from "@mui/material";
import { margin, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { TabContext } from '@mui/lab';
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../constants";
import JSONData from "../constants/JSONData";

const RootDiv = styled("div")(({ theme }) => ({
  backgroundColor: Colors.LIGHT_COLOR,
  display: "flex",
  flexDirection: "column",
}));

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(JSONData.MATHS);

  const [TabValue, setTabValue] = useState(0);

  const SubjectList = Object.keys(JSONData);

  const [value, setValue] = useState("");

  const [position, setposition] = useState(0);

  const [score, setscore] = useState(0);

  const [valueCheck, setvalueCheck] = useState(false)
  const handleRadioChange = (event) => {
    setValue(event.target.value);

    setvalueCheck(true)
  };

  const [colorChangeQue, setColorChangeQue] = useState("")

  const correctAnswer = data[position][`ans`];

  console.log(value);


  console.log(correctAnswer);

  const scoreAdd = () => {
    value === correctAnswer ? setscore(score + 1) : setscore(score + 0);
  };


  const count = position + 1



  console.log(count);

  console.log(score);



  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);

    switch (newTabValue) {
      case 0:
        setData(JSONData.MATHS);
        break
      case 1:
        setData(JSONData.PHYSICS);
        break
      case 2:
        setData(JSONData.CHEMISTRY);
        break
      case 3:
        setData(JSONData.COMPUTER_SCIENCE);
        break
      default:
        setData(JSONData.MATHS)
    }
  };


  useEffect(() => {
    console.log(location.state);
    console.log(data)
    console.log(Object.keys(JSONData))
    data.map((text, index) => (
      setInitalColorQns(oldValue => [...oldValue, index + 1])
    ))

  }, []);






  const [InitalColorQns, setInitalColorQns] = useState([])
  const [AnsweredColorsQns, setAnsweredColorsQns] = useState([])
  const [NotAnsweredColorsQns, setNotAnsweredColorsQns] = useState([])
  const [MarkedColorsQns, setMarkedColorsQns] = useState([])



  const handleClickSaveEx = (position) => {
    console.log(position)
    position <= 18 ? setposition(position + 1) : setposition(0)
    scoreAdd();

    if (valueCheck === true) {

      setAnsweredColorsQns(oldValue => [...oldValue, position + 1])
      const newIntialColorQns = InitalColorQns.filter((item) => item !== position + 1)
      setInitalColorQns(newIntialColorQns)
    }
    else {
      setNotAnsweredColorsQns(oldValue => [...oldValue, position + 1])
      const newIntialColorQns = InitalColorQns.filter((item) => item !== position + 1)
      setInitalColorQns(newIntialColorQns)
    }
    console.log(InitalColorQns)
    if (InitalColorQns === []) {
      console.log(qnsButtonColor)
    }

    setvalueCheck(false)

  }

  const handleClickMark = (position) => {
    position <= 18 ? setposition(position + 1) : setposition(0)
    scoreAdd();


    setMarkedColorsQns(oldValue => [...oldValue, position + 1])
    const newIntialColorQns = InitalColorQns.filter((item) => item !== position + 1)
    setInitalColorQns(newIntialColorQns)

  }


 

  const qnsButtonColor = {
    notVisited: InitalColorQns,
    answered: AnsweredColorsQns,
    notAnswered: NotAnsweredColorsQns,
    marked: MarkedColorsQns
  }


  const handleClickBox = (position) => {
    position <= 19 ? setposition(position) : setposition(0)

  }

  return (

    <div>
      <AppBar position="sticky" sx={{ height: "5vh" }}>
        <Toolbar sx={{ backgroundColor: Colors.MAIN_COLOR, height: "5vh" }}>
          <Typography variant="h5" sx={{ flex: 1 }}>
            Assessment Tool
          </Typography>
          <Typography variant="h6"> Hi {location.state.username} </Typography>
          <Divider orientation="vertical" sx={{ margin: "10px", backgroundColor: "#fff", width: "3px" }} />
          <Button sx={{ color: "#fff", margin: "0 5px", padding: "5px", border: "1px solid #fff", "&:hover": { border: "1px solid #fff" }, }} onClick={() => navigate(-1)} variant="outlined" > Logout </Button>
        </Toolbar>
      </AppBar>

      <RootDiv>
        {/* toolHeader */}
        <div style={{ display: "flex", marginTop: 20 }}>
          <div style={{ width: "75vw", backgroundColor: Colors.BACKGROUND_COLOR, margin: "10px", }} >
            <Typography variant="h5">Sections</Typography>

            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={TabValue}>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", }} >
                  <Tabs value={TabValue} variant="scrollable" allowScrollButtonsMobile sx={{ width: "100%" }} onChange={handleChange} TabIndicatorProps={{ style: { background: "green" } }} textColor="inherit" >
                    {SubjectList.map((obj, i) => (
                      <Tab sx={{ color: Colors.MAIN_COLOR, textTransform: "none" }} label={<Typography variant="h6"> {obj} </Typography>} value={i} />
                    ))}
                  </Tabs>
                </Box>

                <Divider sx={{ height: 5, backgroundColor: Colors.LIGHT_COLOR }} />
                <Box>

                  {SubjectList.map((obj, i) => (
                    <TabPanel value={i} >

                      <RadioGroup aria-labelledby="demo-error-radios" name="quiz" value={value} onChange={handleRadioChange} >
                        <div style={{ display: "flex", flexDirection: "column" }} >

                          <Typography>{`Question  ${position + 1}`}</Typography>


                          <Divider sx={{ height: 2, backgroundColor: Colors.LIGHT_COLOR, margin: '5px 0 10px 0' }} />

                          <Typography>
                            {data[position][`qn${position + 1}`]}
                          </Typography>
                          <FormControlLabel value={data[position].opt1} control={<Radio />} label={data[position].opt1} />
                          <FormControlLabel value={data[position].opt2} control={<Radio />} label={data[position].opt2} />
                          <FormControlLabel value={data[position].opt3} control={<Radio />} label={data[position].opt3} />
                          <FormControlLabel value={data[position].opt4} control={<Radio />} label={data[position].opt4} />
                        </div>
                      </RadioGroup>

                    </TabPanel>
                  ))}
                </Box>

              </TabContext>
            </Box>
          </div>
          <div style={{ width: "25vw", display: "flex", flexDirection: "column", backgroundColor: Colors.BACKGROUND_COLOR, margin: "10px", }} >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="h4">Time Left</Typography>
              <Typography variant="h4" sx={{ color: Colors.MAIN_COLOR, fontWeight: "bold" }} >30:20 </Typography>
            </div>

            <Divider sx={{ marginTop: 5, height: 5, backgroundColor: Colors.LIGHT_COLOR, }} />

            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", }} >
              <div style={{ display: "flex", alignItems: "center", width: "200px", }} >
                <Box sx={{ width: "30px", height: "30px", backgroundColor: Colors.ANSWERED_COLOR, border: "1px solid #000", margin: "5px", }} />
                <Typography> Answered </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center", width: "200px", }} >
                <Box sx={{ width: "30px", height: "30px", backgroundColor: Colors.NOT_ANSWERED_COLOR, border: "1px solid #000", margin: "5px", }} />
                <Typography> Not Answered </Typography>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", }} >
              <div style={{ display: "flex", alignItems: "center", width: "200px", }} >
                <Box sx={{ width: "30px", height: "30px", backgroundColor: Colors.MARKED_COLOR, border: "1px solid #000", margin: "5px", }} />
                <Typography> Marked </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center", width: "200px", }} >
                <Box sx={{ width: "30px", height: "30px", backgroundColor: Colors.NOT_VISITED_COLOR, border: "1px solid #000", margin: "5px", }} />
                <Typography> Not Visited </Typography>
              </div>
            </div>

            <Typography>Questions</Typography>

            <Box style={{ backgroundColor: Colors.LIGHT_COLOR_2, padding: "10px", margin: "10px", display: "flex", flexWrap: "wrap", }} >
              {data.map((obj, i) => (
                <Box onClick={() => { handleClickBox(i) }} sx={{
                  width: "30px", height: "30px",
                  backgroundColor:
                    qnsButtonColor.answered.includes(i + 1) ? "#359C33" :
                      qnsButtonColor.notAnswered.includes(i + 1) ? "#919D44" :
                        qnsButtonColor.marked.includes(i + 1) ? "#9C335F" :
                          "#D9D9D9",
                  color: qnsButtonColor.marked.includes(i + 1) ? "black" : qnsButtonColor.answered.includes(i + 1) ? "white" : qnsButtonColor.notAnswered.includes(i + 1) ? "white" : "black",
                  border: "1px solid #000", margin: "5px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", cursor: "pointer"
                }} > {i + 1} </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" sx={{ backgroundColor: Colors.NOT_VISITED_COLOR, width: "200px", margin: "10px", whiteSpace: "nowrap", color: "#000", border: "1px solid #000", "&:hover": { backgroundColor: Colors.NOT_VISITED_COLOR }, }} > Questions Paper </Button>
              <Button variant="contained" sx={{ backgroundColor: Colors.NOT_VISITED_COLOR, width: "200px", margin: "10px", whiteSpace: "nowrap", color: "#000", border: "1px solid #000", "&:hover": { backgroundColor: Colors.NOT_VISITED_COLOR }, }} > Instructions </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" sx={{ backgroundColor: Colors.NOT_VISITED_COLOR, width: "200px", margin: "10px", whiteSpace: "nowrap", color: "#000", border: "1px solid #000", "&:hover": { backgroundColor: Colors.NOT_VISITED_COLOR }, }} > Profile </Button>
              <Button variant="contained" sx={{ backgroundColor: Colors.NOT_VISITED_COLOR, width: "200px", margin: "10px", whiteSpace: "nowrap", color: "#000", border: "1px solid #000", "&:hover": { backgroundColor: Colors.NOT_VISITED_COLOR }, }} > Submit </Button>
            </Box>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 50, width: "72.5%", backgroundColor: 'gray', margin: '5% 0 5% 0' }} >
          <div  >
            <Button variant="contained" onClick={() => { handleClickMark(position) }} sx={{ margin: "0 10px", backgroundColor: "#9C335F", "&:hover": { backgroundColor: "#9C335F" }, }} > Mark For Review </Button>

            <Button variant="contained" sx={{ margin: "0 10px", color: "#F32424", backgroundColor: "#FBF0F0", "&:hover": { backgroundColor: "#FBF0F0" }, }} > Clear Response </Button>
          </div>

          <Button variant="contained" sx={{ backgroundColor: Colors.BTN_COLOR, "&:hover": { backgroundColor: Colors.BTN_COLOR }, }}
            onClick={() => { handleClickSaveEx(position) }} > Save & Exit </Button>
        </div>
      </RootDiv>
    </div>

  );
}
