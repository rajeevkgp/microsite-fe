import { Card, Divider, Modal, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as moment from 'moment';
import * as React from 'react'
import { announcementType } from '../../../../models/announcementType';
import { getAnnouncementDoc } from '../../../../service/announcment-service';
import './index.css'


function AnnouncementModal(props: announcementType) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [doc, setdoc] = React.useState();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const fetchAnnouncmentDoc = React.useCallback(async (props: announcementType) => {
        let resp = await getAnnouncementDoc(props)
        console.log(resp.data.url)
        setdoc(resp.data.url);
    }, [])
    // if(props){
    //     fetchAnnouncmentDoc
    // }
    React.useEffect(() => {
        fetchAnnouncmentDoc(props)
    }, [props, fetchAnnouncmentDoc(props)])

    return (<>
        <div>
            <div>
                <a onClick={showModal} style={{ display: 'flex', flexDirection: "column" }}>
                    <h6 style={{ fontWeight: '540' }} className='inline'>
                        {props.title}
                    </h6>
                    <Typography.Text disabled style={{ fontSize: "12px" }}>{moment(props.createdAt).format("DD MMM, YYYY")}</Typography.Text>
                </a>
            </div>
            <Divider style={{ margin: "5px 0px 5px 0px" }} />
        </div>
        <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
            {props.description == null &&
                <div>
                    <iframe src={doc} height={'740px'} width={'470px'} ></iframe>
                </div>
            }
            {props.description !== '' &&
                <p>{props.description}</p>
            }
        </Modal>

    </>
    )

}

export default AnnouncementModal;