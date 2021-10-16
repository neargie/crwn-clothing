import React from 'react';
import CollectionPreview from "../collection-preview/collection-preview.component";
import {createStructuredSelector} from "reselect";
import {selectShopCollectionForPreview} from "../../redux/shop/shop.selector";
import {connect} from "react-redux";

const CollectionOverview = ({collections}) => (
    <div className="collections-overview">
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview
                    key={id}
                    {...otherCollectionProps}
                />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollectionForPreview
})

export default connect(mapStateToProps)(CollectionOverview);