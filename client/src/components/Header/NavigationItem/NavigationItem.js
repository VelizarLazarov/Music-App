
const NavigationItem = (props) => {
    return (
        <>
            <li className="listItem">
                <span className="navListItem">{props.children}</span>
            </li>
            <style jsx="true">{`
                .navListItem {
                    color: white;
                    text-decoration: none;
                }
        
            `}</style>
        </>
    )
}

export default NavigationItem