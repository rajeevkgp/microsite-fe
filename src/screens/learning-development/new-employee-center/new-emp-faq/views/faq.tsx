import * as React from 'react'
import { Row, PaginationProps } from 'antd';
import { FaqList } from './faq-list';
import { CategoryList } from './category-list';
import { AddQnaPropsType, FaqCategoryPropType, FaqCategoryType, FaqListPropsType } from '../../../../../models/faq-qna-details';
import { AddQNAButton } from './add-qna';


export const FAQ = () => {
    const showTotal: PaginationProps['showTotal'] = total => `Total ${total} items`;

    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    const [categoryList, setCategoryList] = React.useState(null);

    const [newQnaAdded, setNewQnaAdded] = React.useState(false);

    const onActiveCategoryUpdate = (activeCategory:string) => {
        setcurrentActiveCategory(activeCategory);
    }

    const handleCategoryList = (category : FaqCategoryType) => {
        setCategoryList(category)
    }

    const handleNewQnaAdd = () => {
        setNewQnaAdded(!newQnaAdded)
    }

    const categoryProps : FaqCategoryPropType = {
        onActiveCategoryUpdate : onActiveCategoryUpdate,
        onCategoryListUpdate : handleCategoryList
    }

    const faqProps : FaqListPropsType = {
        activeCategory:currentActiveCategory,
        faqCategoryList:categoryList,
        newQnaAdded:newQnaAdded,
    }

    const addQnaProps : AddQnaPropsType = {
        faqCategoryList:categoryList,
        onNewQnaAdd:handleNewQnaAdd,
    }
    
    return (
        <div>

            <h1>FAQ</h1>
                <Row justify="end">
                    <div>
                        <AddQNAButton addQnaProps = {addQnaProps}/>
                    </div>
                </Row>
                <Row>
                    <div>
                        <CategoryList categoryProps={categoryProps}/>
                    </div>
                </Row>
            <p></p>
            <FaqList faqProps={faqProps}/>
        </div>
    )
}

