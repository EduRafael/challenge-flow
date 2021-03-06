import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styledComp from 'styled-components';


const Dropdown = data => {
    let { items, initial_value, next_value } = data;
    const [showListItem, setShowListItem] = useState(false);
    const [isSelect, setSelectedItem]     = useState(null);

    useEffect(()=> {
        close()
        !initial_value && setSelectedItem(items[0])
    },[initial_value, items]);

    const close = () => {
        const form = document.getElementsByTagName('body')[0]
        form.addEventListener('click', e => setShowListItem(false))
    }

    const _SetItemSelected = item => {
        next_value(item.value);
        setSelectedItem(item.label);
        setShowListItem(false);
    }
    
    return <DropLayout items={items} showListItem={showListItem}>
            <div className="drop-controller" onClick={ ()=> setShowListItem(!showListItem)}>
                <div className="drop-labelContainer">
                    {isSelect || initial_value}
                </div>
                { !showListItem ? <MdKeyboardArrowDown className='drop_icon'/> : <MdKeyboardArrowUp className='drop_icon'/> }
            </div>
            <ListItems items={items} showListItem={showListItem}>
                {
                    !!items && items.map((item, k) =>
                        <span key={k} className="item" onClick={()=>{ _SetItemSelected(item)}}>
                            {item.label}
                        </span>
                    )
                }
            </ListItems>
        </DropLayout> 
}


Dropdown.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.object
    ),
    initial_value: PropTypes.string,
    next_value: PropTypes.func
};


const DropLayout = styledComp.div`
  .drop-controller{
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .drop-labelContainer{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .drop_icon {
	font-size: 2rem;
}
`;
const ListItems = styledComp.div`
    overflow:hidden;
    width:96%;
    display: block;
    flex-direction: column;
    z-index: 1;
    transition: height .3s;
    position:absolute;
    left: 10;
    top: 3rem;
    box-shadow: 2px 3px 13px -6px rgba(0,0,0,0.75);;
    background-color: white;
    height: ${ ({ showListItem, items }) => showListItem ? `${items.length * 3}rem` : "0px"};
    padding: ${ ({ showListItem }) => showListItem ? "1rem 0" : "0"};
    
  .item{
    min-height: 2.7rem;
    cursor: pointer;
    width: 100%;
    padding-left: 1rem ;
    display: flex;
    border-color: #345d73 #476561;
    border-style: ridge;
    border-width: 1px;
    border-radius: 1%;
    align-items: center;
      &:hover{
      background-color: #319FC1;
      color: white;
    }
  }
`;

export default Dropdown;