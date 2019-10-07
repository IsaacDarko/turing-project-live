import React from 'react'

const Searchbar = () => {
    return (
        <div>
        <form className="searchbar">
            <div className="searchbar-inner">
                <div className="searchbar-input-wrap">
                <input type="search" placeholder="Search"/>
                <i className="searchbar-icon"></i>
                <span className="input-clear-button"></span>
                </div>               
                <span className="searchbar-disable-button">Cancel</span>
            </div>
            </form>
        </div>
    )
}

export default Searchbar;
 