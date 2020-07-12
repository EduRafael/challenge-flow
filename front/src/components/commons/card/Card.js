import React from 'react';
import PropTypes from 'prop-types';
import Loading from './../loader/Loading'
import './Card.css'

const Card = (forms) => {
    const { isLoading } = forms;
    return (
            <div className="Card">
                {isLoading && <div className="Card-isLoading"><Loading/></div>}
                <div >
                    {forms.children}
                </div>
            </div>
    )  
}

Card.propTypes = {
    isLoading: PropTypes.bool 
}

export default Card