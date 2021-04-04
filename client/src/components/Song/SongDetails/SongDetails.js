/* eslint-disable no-useless-constructor */
import { Component } from 'react'

class SongDetails extends Component{
    constructor(props){
        super(props)
        this.deleteSong = this.deleteSong.bind(this);
    }

    deleteSong(){
        this.props.delete(this.props.data._id)
        
    }

    render(){
        return(
            <>
            <div className="songDetails">
                <h3>{this.props.data.title}</h3>
                <h3>{this.props.data.artist}</h3>
                
                <h3>lengthasdasd</h3>
                
                {this.props.isCreator ?
                <button className="deleteSongBtn" onClick={this.deleteSong}>Delete</button>:
                null
                }

            </div>
            <style jsx="true">{`
                .deleteSongBtn{
                    position:relative;
                
                background-color:#7289da;
                border: none;
                outline:none;
                color: white;
                padding: 15px 25px;
                border-radius: 5px;
                font-size:large;
                text-decoration:none;
                color:white;
                border:none;
                font-weight:400;
                }
                .songDetails{
                    height:50px;
                    margin-top:12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .songDetails h3{                    
                    display:inline;
                    color:white;
                    padding-right:15%;
                    padding-left:7%;
                    font-weight:400;
                }
                .songDetails:hover{
                    cursor:pointer;
                    background-color:#424549;
                }
                .deleteSongBtn:hover{
                    cursor:pointer;
                    font-weight:bold;
                }
            `}</style>
            </>
        )
    }
}

export default SongDetails