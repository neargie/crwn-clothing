import React from 'react';

import './collection.styles.scss'
import {selectShopCollection} from "../../redux/shop/shop.selector";
import {connect} from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({collection: {title, items}}) => {
    return (
        <div className='collection-page'>
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item}/>
                    ))
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        collection: selectShopCollection(ownProps.match.params.categoryId)(state)
    }
}
export default connect(mapStateToProps)(CollectionPage);