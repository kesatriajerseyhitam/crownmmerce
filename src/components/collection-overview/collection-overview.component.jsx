import React from 'react'
import './collection-overview.style.scss';

import CollectionPreview from './../collection-preview/collection-preview.component';

import { selectShopForPreview } from './../../redux/shop/shop.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const CollectionOverview = ({ collections }) => (
  <div className="collections-overview">
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
  collections: selectShopForPreview,
})

export default connect(mapStateToProps)(CollectionOverview)