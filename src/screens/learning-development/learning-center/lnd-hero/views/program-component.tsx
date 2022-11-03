import * as React from 'react';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';

const { Meta } = Card;

import { Program } from '../../../../../models/course-type'
import { ALT_THUMBNAIL } from '../../../../../constants/string-constants';
import { ArrowRight } from 'react-bootstrap-icons';

function Programs (props: Program){
  const navigate = useNavigate();
    return(
  <Card
    hoverable
    style={{
      width: 340,
      height: 300
    }}
    cover={<img alt={ALT_THUMBNAIL} src={props.thumbnailLink} />}
  >
    <Meta title={props.title} description={props.description}  />
    <Button type='link' style={{ width: '100%' }} onClick={() => { navigate(props.title.toString()) }}> Go to Program <ArrowRight /> </Button>
  </Card>)
};

export default Programs;