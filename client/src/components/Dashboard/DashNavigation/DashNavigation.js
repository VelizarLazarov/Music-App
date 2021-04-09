import { Component } from 'react'

class DashNavigation extends Component {
    constructor(props){
        super(props)

        this.sortBy = this.sortBy.bind(this);
    }

    sortBy(e){
        let order = e.target.innerText
        this.props.sortCategory(order.toLowerCase())
    }

    render(){
        return (
            <>
                <nav className="dashnav">
                    <ul>
                        <li><button onClick={e =>this.sortBy(e)}>Popular</button></li>
                        <li><button onClick={e =>this.sortBy(e)}>Recent</button></li>
                    </ul>
                </nav>
                <style jsx="true">{`          
                    .dashnav li{
                        display: inline-block;                    
                        padding: 14px;                       
                        border-radius: 5px;                       
                    }
                    .dashnav li button{
                        margin-top:10px;
                        background-color:#7289da;
                        border: none;
                        color: white;
                        padding: 10px 22px;
                        border-radius: 5px;
                        font-size:large;
                    }
                    .dashnav li button:hover{
                        cursor:pointer;
                        font-weight: bold;
                    }
                `}</style>
            </>
        )
    }
}
export default DashNavigation