//Takes a string and puts it into a div container
export default function TakeString(props:{ str:string}) {
    
    return(
        <div>
            <h2>Take String Solid Component</h2>
            <div>This is your string: {props.str} </div>
        </div>
    )
}