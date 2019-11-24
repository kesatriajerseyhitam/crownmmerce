import React from 'react'
import './collection-preview.style.scss';

import CollectionItem from './../collection-item/collection-item.component';
import {withRouter} from 'react-router-dom';

const CollectionPreview = ({title, items, match, history}) => {
  return (
    <div className="collection-preview">
      <h1 className="title pointer"
        onClick={() => history.push(`${match.url}/${title.toLowerCase()}`) }      
      >{title.toUpperCase()}</h1>
      <div className="preview">
        {
          items.filter((item, index) => {
            return index < 4;
          }).map((item) => (
            <CollectionItem
              key={ item.id }
              item={ item }
            />
          ))
        }
      </div>
    </div>
  )
}

export default withRouter(CollectionPreview)
