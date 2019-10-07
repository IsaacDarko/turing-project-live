import React, { Component } from 'react';
import { ProductConsumer } from '../context';
/* function for front end pagination using the props passed from the product list component  but rendered irrelevant 
since pagination is now handled at the backend. This makes the stack perform much better and faster.*/


export default function Paginator({value}) {
    
        const { getListSets } = value;

        const captureName =(e)=>{
            e.preventDefault();
            const pageNumber = e.target.name;
            const pnum = Number(pageNumber);
            getListSets(pnum);
        }


        
        return(
                        
                        <nav>
                            <ul className="pagination">
                            
                                <li className="page-item">
                                    <a href="" name="1" className="page-link">1</a>
                                </li>
                                <li className="page-item">
                                    <a href="" name="2" onClick={(e)=> captureName(e)} className="page-link">2</a>
                                </li>
                                <li className="page-item">
                                    <a href="" name="3" onClick={(e)=> captureName(e)} className="page-link">3</a>
                                </li>
                                <li className="page-item">
                                    <a href="" name="4" onClick={(e)=> captureName(e)} className="page-link">4</a>
                                </li>
                                <li className="page-item">
                                    <a href="" name="5" onClick={(e)=> captureName(e)} className="page-link">5</a>
                                </li>
                                <li className="page-item">
                                    <a href="" name="6" onClick={(e)=> captureName(e)} className="page-link">6</a>
                                </li>
                                
                            
                        {/* 
                        handled automatic numbering based on the number of products provided by the backend api call but 
                        rendered irrelevant after the pagination function was transfered to the backend get api
                
                                {pageNumbers.map ((number, index) => (
                                    <li key={number} className="page-item">
                                        <a onClick={ ()=> paginate(number)} href="#" className="page-link">
                                            {number}
                                         </a>
                                        </li>
                                ))}                
                        */}
                                
                
                            </ul>
                        </nav>

          )

    
    
}