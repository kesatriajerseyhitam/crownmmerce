import React from 'react'

const ColelctionPreview = ({title, items}) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title}</h1>
      <div className="preview">
        {
          items.filter((item, index) => {
            return index < 4;
          }).map(item => (
            <div key={item.id}>
              {item.name}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ColelctionPreview
