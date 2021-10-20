import React from 'react';
import CollectionOverview from "../../components/collection-overview/collections-overview.component";
import {Route} from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utility";
import {connect} from "react-redux";
import {handleUpdateCollection} from "../../redux/shop/shop.action";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

// HOC -> High Order Component
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageOverviewWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        isLoading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionReference = firestore.collection('collections');

        collectionReference.get()
            .then(snapshot => {
                const collectionsSnapshotToMap = convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsSnapshotToMap);
                this.setState({isLoading: false})
            })

    }

    render() {
        const {match} = this.props;
        const {isLoading} = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                       render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props}/>}
                />
                <Route exact path={`${match.path}/:categoryId`}
                       render={(props) => <CollectionPageOverviewWithSpinner isLoading={isLoading} {...props}/>}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collections => dispatch(handleUpdateCollection(collections))
})

export default connect(null, mapDispatchToProps)(ShopPage);