import * as React from "react";
import { LeftArrow, RightArrow } from "../../../../../components/arrow";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import './index.css'
import Courses_tag from './course-component'
import { Row } from "antd";
import Col from "antd/es/grid/col";
import { Courses } from '../../../../../models/course-type'
import httpClient from "../../../../../utility/http-client";
import {COMPLETED_COURSES_URL, CURRENT_COURSES_URL} from "../../../../../constants/global-constants";
import { configType } from "../../../../../models/config-type";


type GetCourseResponse = {
  data: Courses[];
};


function Scrollable_courses(props: any) {

  let url : string;
  if(props.props =="current"){
    url = CURRENT_COURSES_URL
  }
  if(props.props =="completed"){
    url = COMPLETED_COURSES_URL
  }
    const [Courses,setCourses] = React.useState({data:[{
      programDescription: "",
      programTitle: "",
      programDuration: 0,
      rruDeeplink: "",
      rruProgramID: "",
      thumbnailLink:"",
      }]});

    const fetchCourses = React.useCallback(async()=>{
        const config: configType = {
          headerAuthorization: "",
          contentType: ""
        }
        const reqs = new httpClient(url,config)
        let response = await reqs.get("");
        const Course:GetCourseResponse = {data: response.data.data}
        setCourses(Course)
    },[])

    React.useEffect(() => {
        fetchCourses()
      }, [fetchCourses]);

  
    return (
      <>
      <div className="scroll">
        <Row>
            <Col >
            <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            >
                {Courses.data.map(({ 
                  programTitle,
                  programDescription,
                  programDuration,
                  rruDeeplink,
                  rruProgramID,
                  thumbnailLink }) => (<Courses_tag {... {
                    programTitle,
                    programDescription,
                    programDuration,
                    rruDeeplink,
                    rruProgramID,
                    thumbnailLink}}/>))}

            </ScrollMenu>
            </Col>
          </Row>
          </div>
      </>
    );
  }

export default Scrollable_courses;