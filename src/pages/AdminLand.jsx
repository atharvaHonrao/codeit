import React, { useState, onChange } from "react";
import { Link } from 'react-router-dom';
import '../styles/adminLanding.css';

export default function AdminLand() {
    return(
        <div>
            <div className="header-container">
                <div className="namedesc">
                    <p className="gname">Group Name Here</p> 
                    <p className="description">This group is created for every student aiming to brush up their DSA</p>
                </div>
                <div className="header-buttons">
                    <button className="action-buttons">Add Problem</button>
                    <button className="action-buttons">View Problem</button>
                </div>
            </div>

            <div className="main-container">
                <div className="problem">
                    <p className="topic">Problems</p>
                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Two number sum</h2>
                            <p className='problem-description'>Given An Array Of Integers, Find Two Numbers Such That They Add Up To A Specific Target Number. You May Assume That Each Input Would Have Exactly One Solution And You May Not Use The Same Element Twice In The Result.</p>
                            <p>2E3VWKv7owQXswbSf7wS</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>

                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Valid Sudoku</h2>
                            <p className='problem-description'>Determine If A 9x9 Sudoku Board Is Valid. Only The Filled Cells Need To Be Validated According To The Following Rules: Each Row Must Contain The Digits 1-9 Without Repetition. Each Column Must Contain The Digits 1-9 Without Repetition. Each Of The 9 3x3 Sub-Grids Of The Grid Must Contain The Digits 1-9 Without Repetition.</p>
                            <p>375eRchFzcN0ruaf0vzt</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>

                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Merge Sorted Lists</h2>
                            <p className='problem-description'>Merge Two Sorted Linked Lists And Return It As A New Sorted List. The New List Should Be Made By Splicing Together The Nodes Of The First Two Lists.</p>
                            <p>3RE84rinlItXAqS0qkqJ</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>
                </div>
                
                <div className="member">
                    <p className="topic">Members</p>
                    <div className="table-container">
                        <table id='members-table' border={1}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Problems Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>007</td>
                                    <td>Richarlison</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Tatya Vinchu</td>
                                    <td>68</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 
                </div>
            </div>
        </div>
    )
}