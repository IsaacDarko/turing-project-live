import React, { Component } from 'react'

export default class OderColumns extends Component {
    render() {
        return (
            <div className="container-fluid my-5 tex-center d-none d-lg-block"> 
                
                <div className="row">

                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase">Order ID</p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase"> Product </p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase"> Unit Price </p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase"> Quantity  </p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase"> Order Reference ID </p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase"> Auth Code </p>
                    </div>

                </div>
                 
            </div>
        )
    }
}
