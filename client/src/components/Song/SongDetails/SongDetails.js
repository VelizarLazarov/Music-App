import { Component } from 'react'

class SongDetails extends Component{
    render(){
        return(
            <>
            <div className="songDetails">
                <h3>Song titleasdadasdasd</h3>
                <h3>Artistasdasdasd</h3>
                <h3>lengthasdasd</h3>
            </div>
            <style jsx="true">{`
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
            `}</style>
            </>
        )
    }
}

export default SongDetails