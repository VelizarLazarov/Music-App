import * as playlistService from '../../../services/playlistService'

const EditPlaylist = (props) => {
    function onEditSubmit(e){
        e.preventDefault();
        
        playlistService.editPlaylist(e, props.parentId)
        .then((newList) => props.editHandler(newList))
    }
    
    return(
        <>
            <form onSubmit={onEditSubmit}>
                <h2>Edit Info</h2>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" defaultValue={props.title}></input>

                <label htmlFor="password">Img Url:</label>
                <input type="text" name="imgUrl" defaultValue={props.imgUrl}></input>

                <button type="submit">Edit</button>

            </form>

            <style jsx="true">{`
                form{
                    position:relative;
                    z-index:0;
                    left:56%;
                    bottom:50%;
                    display: flex;
                    flex-direction: column;
                    align-items: left;
                    padding:40px;
                    width:200px;
                    height:260px;
                    color: white;
                    border-radius: 0 15px 15px 0;
                    border-left-style: solid;
                    border-left-color: #7289da;
                    border-left-width: 5px;
                    background-color:#282b30;
                }
                form input {
                    border-radius: 6px;
                    padding: 1.5%;
                    width: 95%;
                    display:block;
                    font-size:large;
                }
                form label{
                    font-size:large;
                }
                form button{
                    margin-top:40px;
                    background-color:#7289da;
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    border-radius: 5px;
                    font-size:large;
                    
                }
                form button:hover{
                    cursor:pointer;
                }
                
                
            
            `}</style>
            </>
    )
}
export default EditPlaylist