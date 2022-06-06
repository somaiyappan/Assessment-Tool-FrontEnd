import { AppBar, Button, Divider, Toolbar, Typography, Tabs, Radio, RadioGroup, FormControlLabel, Stack } from "@mui/material";
import { margin, styled } from "@mui/system";
import React, { useEffect, useLayoutEffect, } from "react";
import { TabContext } from '@mui/lab';
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../constants";
import JSONData from "../constants/JSONData";

import useState from 'react-usestateref'

const RootDiv = styled("div")(({ theme }) => ({
  backgroundColor: Colors.LIGHT_COLOR,
  display: "flex",
  flexDirection: "column",
}));

export default function HomePage() {

  const navigate = useNavigate();
  const location = useLocation();
  const subjectList = Object.keys(JSONData);


  const [selectedTabQuestionData, setSelectedTabQuestionData] = useState(JSONData[subjectList[0]]);

  const [selectedTabSubName, setSelectedTabSubName] = useState(subjectList[0])

  const [selectedTabValue, setSelectedTabValue] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [position, setposition] = useState(0);

  // const [score, setscore] = useState(0);

  const [isAnswerSelected, setIsAnswerSelected] = useState(false)//selecting answer or not

  const [colorChangeQue, setColorChangeQue] = useState("")

  const correctAnswer = selectedTabQuestionData[position][`ans`];

  const [allSubjectState, setAllSubjectState, allSubjectStateRef] = useState(allSubjectObj)

  var allSubjectObj = {}

  const [loader, setloader] = useState(true)
  const [crtAnswerObj, setCrtAnswerObj, crtAnswerObjRef] = useState({})



  // const scoreAdd = () => {
  //   selectedAnswer === correctAnswer ? setscore(score + 1) : setscore(score);
  // };




  const handleTabChange = (event, tabValue) => {
    console.log(event)
    console.log({ tabValue })
    setSelectedTabValue(tabValue);
    setSelectedTabQuestionData(JSONData[subjectList[tabValue]])
    setSelectedTabSubName(subjectList[tabValue])
  };

  const handleOptionsChange = (value,) => {
    console.log(value,)
    setSelectedAnswer(value);
    setIsAnswerSelected(true)

  };









  const handleClickSaveNext = (position) => {

    position <= (selectedTabQuestionData.length-2)  ? setposition(position + 1) : setposition(0)
    // scoreAdd();
    var currentpos = position + 1
    if (selectedAnswer === correctAnswer) {
      setCrtAnswerObj({
        ...crtAnswerObj,
        [selectedTabSubName]: {
          ...crtAnswerObj[selectedTabSubName],

          [currentpos]: 1
        }

      });

    }
    else {
      setCrtAnswerObj({
        ...crtAnswerObj,
        [selectedTabSubName]: {
          ...crtAnswerObj[selectedTabSubName],

          [currentpos]: 0
        }
      });

    }

    console.log(crtAnswerObjRef.current)


    if (isAnswerSelected === true) {
      let pushValues = allSubjectState[selectedTabSubName].answeredColorQns.includes(position + 1) === false ?
        setAllSubjectState({
          ...allSubjectState,
          [selectedTabSubName]: {
            ...allSubjectState[selectedTabSubName],
            answeredColorQns: [...allSubjectState[selectedTabSubName].answeredColorQns, (position + 1)]
          }
        }) : null //push


      var arr = allSubjectState[selectedTabSubName].intialColorQns
      var index = arr.indexOf(position + 1);

      if (index >= 0) {
        arr.splice(index, 1);
      }



    }
    else {
      let pushValues = allSubjectState[selectedTabSubName].unAnsweredColorQns.includes(position + 1) === false ?
        setAllSubjectState({
          ...allSubjectState,
          [selectedTabSubName]: {
            ...allSubjectState[selectedTabSubName],
            unAnsweredColorQns: [...allSubjectState[selectedTabSubName].unAnsweredColorQns, (position + 1)]
          }
        }) : null//push




      var arr = allSubjectState[selectedTabSubName].intialColorQns
      var index = arr.indexOf(position + 1);
      if (index >= 0) {
        arr.splice(index, 1);
      }



    }
    setIsAnswerSelected(false)
  }


  const handleClickMark = (position) => {
    position <= (selectedTabQuestionData.length-2)  ? setposition(position + 1) : setposition(0)
    // scoreAdd();

    let pushValues = allSubjectState[selectedTabSubName].unAnsweredColorQns.includes(position + 1) === false ?
      setAllSubjectState({
        ...allSubjectState,
        [selectedTabSubName]: {
          ...allSubjectState[selectedTabSubName],
          markedColorQns: [...allSubjectState[selectedTabSubName].markedColorQns, (position + 1)]
        }
      }) : null;

    var arr = allSubjectState[selectedTabSubName].intialColorQns
    var index = arr.indexOf(position + 1);
    if (index >= 0) {
      arr.splice(index, 1);
    }



  }
  console.log(correctAnswer)

  const handleClickQNo = (position) => {
    console.log(position)
    console.log(selectedTabQuestionData.length)
    position <= (selectedTabQuestionData.length-1) ? setposition(position) : setposition(0)
  }

  const handleClickSumbit = () => {

    var tempAnsObj = {}
    var tempMarkedObj = {}

    subjectList.map((text) => (

      tempAnsObj[text] = allSubjectState[text].answeredColorQns.length,
      tempMarkedObj[text] = allSubjectState[text].markedColorQns.length
    ))

    let subjectNames = Object.keys(crtAnswerObjRef.current)

    let finalObj = {}

    for (let i = 0; i < subjectNames.length; i++) {
      var subValues = Object.values(crtAnswerObjRef.current[subjectNames[i]])
      var subCount = subValues.reduce((a, b) => a + b, 0)
      finalObj[subjectNames[i]] = subCount
    }


    var submitObj = { name: location.state.username, attended: tempAnsObj, marked: tempMarkedObj, time: "17:30", correct: finalObj }

    console.log(submitObj)



  }


  useEffect(() => {
    var tempObj = {}

    console.log(selectedTabQuestionData)
    console.log(subjectList)
    subjectList.map((text) => (

      tempObj[text] = {},

      selectedTabQuestionData.map((te, index) => (
        tempObj[text][index + 1] = 0
      ))

    ))

    console.log(tempObj)
    console.log(JSONData)
    setCrtAnswerObj(tempObj)



    var questionColorObj = { "intialColorQns": [], "answeredColorQns": [], "markedColorQns": [], "unAnsweredColorQns": [] }

    for (let i = 0; i < subjectList.length; i++) {
      allSubjectObj[subjectList[i]] = questionColorObj
    }
    var te = []
    selectedTabQuestionData.map((text, index) => (
      te.push(index + 1),
      setAllSubjectState({ ...allSubjectObj, [selectedTabSubName]: { ...allSubjectObj[selectedTabSubName], intialColorQns: te } })
    ))

    setloader(false)

  }, []);



  return (

    <>
      {loader === true ?
        <div>


          <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>

            <CircularProgress />
            <Typography variant="h6" sx={{ marginTop: 2 }} >Loading Please Wait...</Typography>

          </Box>
        </div>
        :
        <div>
          <AppBar position="sticky" sx={{ height: "5vh" }}>
            <Toolbar sx={{ backgroundColor: Colors.MAIN_COLOR, height: "5vh" }}>
              <Typography variant="h5" sx={{ flex: 1 }}> Assessment Tool </Typography>
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
                  <TabContext value={selectedTabValue}>
                    <Box sx={{ display: "flex", justifyContent: "space-evenly", }} >
                      <Tabs value={selectedTabValue} variant="scrollable" allowScrollButtonsMobile sx={{ width: "100%" }} onChange={handleTabChange} TabIndicatorProps={{ style: { background: "green" } }} textColor="inherit" >
                        {subjectList.map((obj, i) => (
                          <Tab sx={{ color: Colors.MAIN_COLOR, textTransform: "none" }} label={<Typography variant="h6"> {obj} </Typography>} value={i} />
                        ))}
                      </Tabs>
                    </Box>

                    <Divider sx={{ height: 5, backgroundColor: Colors.LIGHT_COLOR }} />
                    <Box>

                      {subjectList.map((obj, i) => (
                        <TabPanel value={i} >

                          <RadioGroup value={selectedAnswer} onChange={(e) => { handleOptionsChange(e.target.value) }} >
                            <Stack gap={1}>
                              <Typography>{`Question  ${position + 1}`}</Typography>
                              <Divider sx={{ height: 2, backgroundColor: Colors.LIGHT_COLOR, margin: '5px 0 10px 0' }} />
                              <Typography> {selectedTabQuestionData[position][`qn${position + 1}`]}
                              </Typography>
                              <FormControlLabel value={selectedTabQuestionData[position].opt1} control={<Radio />} label={selectedTabQuestionData[position].opt1} />
                              <FormControlLabel value={selectedTabQuestionData[position].opt2} control={<Radio />} label={selectedTabQuestionData[position].opt2} />
                              <FormControlLabel value={selectedTabQuestionData[position].opt3} control={<Radio />} label={selectedTabQuestionData[position].opt3} />
                              <FormControlLabel value={selectedTabQuestionData[position].opt4} control={<Radio />} label={selectedTabQuestionData[position].opt4} />
                            </Stack>
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
                  {selectedTabQuestionData.map((obj, i) => (
                    <Box onClick={() => { handleClickQNo(i) }} sx={{
                      width: "30px", height: "30px",
                      border: "1px solid #000", margin: "5px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", cursor: "pointer",
                      backgroundColor:
                        allSubjectState[selectedTabSubName].answeredColorQns.includes(i + 1) ? "#359C33" :
                          allSubjectState[selectedTabSubName].unAnsweredColorQns.includes(i + 1) ? "#919D44" :
                            allSubjectState[selectedTabSubName].markedColorQns.includes(i + 1) ? "#9C335F" :
                              "#D9D9D9",

                    }} > {i + 1}
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="contained" sx={{ backgroundColor: Colors.NOT_VISITED_COLOR, width: "200px", margin: "10px", whiteSpace: "nowrap", color: "#000", border: "1px solid #000", "&:hover": { backgroundColor: Colors.NOT_VISITED_COLOR }, }} > Questions Paper </Button>
                  <Button variant="contained" sx={{ backgroundColor: Colors.NOT_VISITED_COLOR, width: "200px", margin: "10px", whiteSpace: "nowrap", color: "#000", border: "1px solid #000", "&:hover": { backgroundColor: Colors.NOT_VISITED_COLOR }, }} > Instructions </Button>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="contained" sx={{ backgroundColor: Colors.NOT_VISITED_COLOR, width: "200px", margin: "10px", whiteSpace: "nowrap", color: "#000", border: "1px solid #000", "&:hover": { backgroundColor: Colors.NOT_VISITED_COLOR }, }} > Profile </Button>
                  <Button variant="contained" onClick={() => { handleClickSumbit() }} sx={{ backgroundColor: Colors.NOT_VISITED_COLOR, width: "200px", margin: "10px", whiteSpace: "nowrap", color: "#000", border: "1px solid #000", "&:hover": { backgroundColor: Colors.NOT_VISITED_COLOR }, }} > Submit </Button>
                </Box>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 50, width: "72.5%", backgroundColor: 'gray', margin: '5% 0 5% 0' }} >
              <div  >
                <Button variant="contained" onClick={() => { handleClickMark(position) }} sx={{ margin: "0 10px", backgroundColor: "#9C335F", "&:hover": { backgroundColor: "#9C335F" }, }} > Mark For Review </Button>

                <Button variant="contained" sx={{ margin: "0 10px", color: "#F32424", backgroundColor: "#FBF0F0", "&:hover": { backgroundColor: "#FBF0F0" }, }} > Clear Response </Button>
              </div>

              <Button variant="contained" sx={{ backgroundColor: Colors.BTN_COLOR, "&:hover": { backgroundColor: Colors.BTN_COLOR }, }}
                onClick={() => { handleClickSaveNext(position) }} > Save & Exit </Button>
            </div>
          </RootDiv>
        </div>
      }
    </>

  );
}
