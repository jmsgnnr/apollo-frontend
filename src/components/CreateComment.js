import React, { useState, useEffect }from 'react'
import { useHistory } from 'react-router-dom'
import CommentModel from '../models/comment'
import axios from 'axios'
import PropTypes from 'prop-types'

// always destructure props
// MAKE sure to use {}
// prop types - its something included in react where you essentially tell react to pass through said type
// of props in the objects {} we are passing 
// routes need to be changed to reflect working routes
// emotion model needs to be switched to create comment
// any time emotion is called. remove it 
// emotion is now in createComment 
// get comment by id on backend 
// comment page and comment component 

function CreateComment(props) {
    const [url, setUrl]= useState(null)
    const [content, setContent] = useState("")
    const [completed, setCompleted] = useState(false)

    const history = useHistory()

    const playlist = {
        anger: '20Bbvjfo6UGSieemnaa62R',
        disgust: '6SugLh3r9BscE1Srn5Rf6B',
        fear:'6SugLh3r9BscE1Srn5Rf6B',
        joy: '6SugLh3r9BscE1Srn5Rf6B',
        sadness:'6SugLh3r9BscE1Srn5Rf6B',
        //if undefined, playlist
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("http://localhost:4000/api/v1/emotion")
        .then(tone => {
            // state.url = playlist.tone
            console.log(tone)
            setUrl(tone)
        }).catch(err => console.log("TONE ERROR", err))
        CommentModel.create(content)
        .then(data => {
            console.log("data")
            props.history.push("/comment" )
        })
    }

    const handleChange = (event) => {
        if (event.target.type !== 'text') {
            setCompleted(!completed)
        }
        setContent(event.target.value)
    }

    return (
        <div className="form">
            <form onSubmit={(event) => handleSubmit(event) } >
                <div className="form-input">
                    {/* Controlled Input */}
                    <input 
                    type="text"
                    name="content"
                    onChange={(event) => handleChange(event) }
                    value={ content }
                    className="inputForm"
                    />
                </div>
                <input type="submit" value="Curate" className="button"/>
            </form>
        </div>
    )
}

CreateComment.propTypes = {

};

export default CreateComment
