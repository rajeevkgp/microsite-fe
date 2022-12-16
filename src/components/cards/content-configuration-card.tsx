import * as React from 'react';
import { Card, Image } from 'antd';
import { DEFAULT_LND_THUMBNAIL } from '../../constants/string-constants';
const { Meta } = Card;


export function CourseCard(props: { cardStyle: object, isHoverable: boolean, imageStyle: object, imageSource: string, metaStyle: object, title: string, description: string }) {
    const { cardStyle, isHoverable, imageStyle, imageSource, metaStyle, title, description } = props;

    return (
        <Card
            style={cardStyle}
            hoverable={isHoverable}
            cover={
                < Image style={imageStyle}
                    alt="image"
                    src={imageSource}
                    fallback={DEFAULT_LND_THUMBNAIL}
                />
            }>

            <Meta
                style={metaStyle}
                title={title}
                description={description}
            />

        </Card >
    );
}
