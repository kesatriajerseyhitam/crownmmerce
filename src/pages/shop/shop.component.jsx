import React from 'react';

import CollectionPreview from './../../components/collection-preview/collection-preview.component';

import { connect } from 'react-redux';
import { selectShopCollections } from './../../redux/shop/shop.selector';
import { createStructuredSelector } from 'reselect';

const Shop = ({ collections }) => (
  <div className="shop-page">
    {
      collections.map(({id, title, routeName, items}) => (
        <CollectionPreview 
          key={id}
          items={items}
          routeName={routeName}
          title={title}
        />
      ))
    }
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
})

export default connect(mapStateToProps)(Shop)