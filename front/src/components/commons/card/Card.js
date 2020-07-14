import React from 'react';
import PropTypes from 'prop-types';
import Loading from './../loader/Loading'
import './Card.css'

const Card = (forms) => {
    const { loadingInfo } = forms;
    return (
            <div className="Card">
                {loadingInfo && <div className="Card-loading"><Loading/></div>}
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