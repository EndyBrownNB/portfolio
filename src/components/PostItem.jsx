import React from "react"
import Mybutton from "./UI/button/MyButton";

const PostItem = (props) =>{

    return(
        <div className='post'>
            <div className='post__content'>
                <strong> {props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
                </div>
            <div className='post__btns'>
                    <Mybutton onClick={() => props.remove(props.post)}>Remove post</Mybutton>
           </div>
         </div>
        
    )
}
export default PostItem;