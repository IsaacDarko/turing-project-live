import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        return (
            <div className="container">
                <div className="row mt-9">
                    <div className="col-10 text-uppercase py-5">
                        <h1 className="display-1"> 404 </h1>
                        <h2> Error </h2>
                        <h5 className="font-italic"> The requested URL <span className="text-danger text-lowercase"> {this.props.location.pathname} </span>  
                         was not found </h5>
                    </div>
                </div>
            </div>
        )
    }
}
