import * as React from 'react';
import httpInstance from '../../../../utility/http-client';
import { Layout, Button } from 'antd';

const { Content, Sider } = Layout;

import { SkillList } from './views/skill-list';
import { CourseList } from './views/skill-courses';
import { Tagtype } from '../../../../constants/tag';
import { getFormattedDataForMenuItems } from './views/helper';

export function LearningBySkill() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMenuItemChanged, setIsMenuItemChanged] = React.useState(false);
  const [buttonStatus, setButtonStatus] = React.useState(true);
  const [skillList, setSkillList] = React.useState([]);
  const [courseList, setCourseList] = React.useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    offset: 0,
    pageSize: 1
  });


  const handleViewMoreClick = () => {
    setPagination({ ...pagination, offset: pagination.offset + 1 });
    setButtonStatus(true);
  }


  React.useEffect(() => {
    //Api -> get Al lActive Skill Tags

    (() => {
      setIsLoading(true);
      httpInstance.get(`/microsite/tag/?tagType=${Tagtype.skill}`)
        .then((response) => {
          if (!!getFormattedDataForMenuItems(response.data).length) {
            setSkillList(getFormattedDataForMenuItems(response.data));
            setSelectedMenuItem([response.data[0].id]);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          window.alert(`${error.message}`);
        });
    })();

  }, []);

  React.useEffect(() => {
    //Api -> get Courses By TagId
    if (!selectedMenuItem.length) return;

    (() => {
      setIsLoading(true);
      httpInstance.get(`/microsite/course-tag/courses-by-tag-id/?tagId=${Number(selectedMenuItem[0])}&offset=${pagination.offset}&pageSize=${pagination.pageSize}`)
        .then((response) => {
          if (!response.data.length) {
            setButtonStatus(true);
          }

          if (response.data.length) {
            setCourseList(courseList.concat(response.data));
            setButtonStatus(false);
          }

          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          window.alert(`${error.message}`);
        });
    })();

  }, [pagination.offset, isMenuItemChanged]);


  React.useEffect(() => {
    if (!selectedMenuItem.length) return;

    setCourseList([]);
    setPagination({ ...pagination, offset: 0 });
    setIsMenuItemChanged(!isMenuItemChanged);
  }, [selectedMenuItem]);


  const addSkill = () => {
    return <Button block style={{ background: "#001529", color: "#f5f5f5" }}>
      Skills
    </Button>
  }

  return (
    <>
      {isLoading ? "Loading" : <Layout hasSider={true} style={{
        height: '80vh'
      }}>
        <Sider
          style={{
            overflow: 'auto',
            height: '80vh',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          {addSkill()}
          <SkillList items={skillList} selectedMenuItem={selectedMenuItem} handleSelectedMenuItem={setSelectedMenuItem}></SkillList>
        </Sider>
        <Layout
          style={{
            background: '#fff',
            height: '80vh',
            overflow: 'auto',
          }}

        >
          <Content style={{ margin: '2px 16px 0', height: '80vh', textAlign: 'center', background: '#fff' }}>

            {courseList.length ? <CourseList courseList={courseList} /> : null}

            <div style={{ textAlign: 'center' }}  >
              <Button block type='primary' disabled={buttonStatus} onClick={() => handleViewMoreClick()} >View More</Button>
            </div>
          </Content>
        </Layout>
      </Layout >}
    </>
  )
};

