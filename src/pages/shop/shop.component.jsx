import React from 'react';

import CollectionPage from '../collection/collection.component';
import CollectionOverview from './../../components/collection-overview/collection-overview.component';
import WithSpinner from './../../components/with-spinner/with-spinner.component';

import { connect } from 'react-redux';
import { firestore, convertCollectionSnapshotToMap } from './../../firebase/firebase.utils';
import { Route } from 'react-router-dom';
import { updateCollections } from './../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  state = {
    loading: true
  }
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection(`collections`);
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({ loading: false })
    })
    collectionRef.get().then(snapshot => {
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({ loading: false })
    })
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionMap = convertCollectionSnapshotToMap(snapshot);
    //   updateCollections(collectionMap);
    //   this.setState({ loading: false })
    // })
  }
  
  render() {
    const { loading } = this.state;
    const { match } = this.props;
    return ( 
      <div className="shop-page">
         <Route exact 
            path={`${match.path}`} 
            render={ props => (
              <CollectionOverviewWithSpinner isLoading={loading} {...props} />
            )}
          />
         <Route
            path={`${match.path}/:collectionId`}
            render={props => (
              <CollectionPageWithSpinner isLoading={loading} {...props} />
            )}
          />
       </div>  
     )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);