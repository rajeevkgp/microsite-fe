import { Button, Card, Image, Input, List, Result, Skeleton, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { SearchOutlined } from '@ant-design/icons'
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { JourneyDetailType } from '../../../../models/journey-details'; 
import './../index.css'
import { getJourneys } from '../../../../service/journey-service';
import { ArrowRight } from 'react-bootstrap-icons';
import { debounce } from '../../../../utility/debounce-utils';
import { DEFAULT_LND_THUMBNAIL } from '../../../../constants/string-constants';
import { ShadowSearchInput } from '../../../../components/shadow-input-text';
import { formatBase64 } from '../../../../utility/image-utils';
const { Text } = Typography;

export  const LearningJourneyList = () => {
  const navigate = useNavigate();
  const [load, setLoad] = React.useState(false)
  const[ journeys, setJourneys] = React.useState<JourneyDetailType[]>([])
  const [hasMore, setHasMore ] = React.useState(false)
  const [page,setPage ] = React.useState(0)
  const [keyState, setKeyState] = React.useState('')
  let key = ''

  const loadMoreData = () => {
    if (load) { return; }
    setLoad(false);
    getJourneys(keyState,page.toString()).then(
      resp => {
        setJourneys([...journeys, ...resp.data.content])
        setHasMore(!resp.data.last)
        setPage(page +1)
        setLoad(false)
      }
    )
  };

  const searchJourneys = () => {
    setKeyState(key)
    if(load) { return ;}
    setLoad(false);
    getJourneys(key).then(
      resp => {
        setJourneys([...resp.data.content])
        setHasMore(!resp.data.last)
        setPage(1)
        setLoad(false)
      }
    )
  }

  React.useEffect(() => {
    loadMoreData();
  }, []);

  const searchKey = (str: string) =>{
    key = str
    debounce(searchJourneys,500)
  }
 
  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ShadowSearchInput 
        placeholder='Type in the journey title you are looking for...'
        size='large'
        onChange={(e:string) => {searchKey(e);} } 
    />
    <div
      id="scrollableDiv"
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      { journeys.length != 0 &&
      <InfiniteScroll
        dataLength={journeys.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4}}
          style={{padding : "1%"}}
          dataSource={journeys}
          renderItem={item => (
            <List.Item key={item.title}>
              <Card 
                hoverable
                style={{
                  width: 340,
                  height: 350
                }}
                cover={
                  <Image
                    style={{
                      width: 340,
                      height: 195
                    }}
                    src={formatBase64(item.thumbnail)}
                    fallback={DEFAULT_LND_THUMBNAIL}
                    preview={false}
                  />
                }
                actions={[
                  <Button type='link' style={{width:'100%'}} onClick={()=>{navigate(item.id.toString())}}> Go to journey <ArrowRight /> </Button>
                ]}
              >
                <Meta
                  title={item.title}
                  description={<div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height:'20px'}}>{item.description}</div>}
                />
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      }
      {
        journeys.length == 0 &&
        <Result
          status="404"
          title={<Text type='secondary'>No Journey Found</Text>}
        />
      }
    </div>
    </div>
    </>
  );
};