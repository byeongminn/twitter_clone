import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FaTrash, FaPen, FaCheck, FaTimes } from "react-icons/fa";

// Nweet 삭제, 수정
const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentURL).delete();
        }
    }
    const toggleEditing = () => setEditing(prev => !prev);
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewNweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        })
        setEditing(false);
    }
    return (
        <div>
            {editing ? (
                <>
                    {isOwner &&
                        <div id="nweet_editContainer">
                            <button onClick={toggleEditing}><FaTimes /></button>
                            <form id="nweet__editForm" onSubmit={onSubmit}>
                                <input type="text" placeholder="Edit your nweet" value={newNweet} onChange={onChange} required autoFocus />
                                <input type="submit" value="O" />
                            </form>
                        </div>}
                </>
            ) : (
                <div id="nweet__container">
                    {isOwner && (
                        <div id="nweet__btn">
                            <button onClick={onDeleteClick}><FaTrash /></button>
                            <button onClick={toggleEditing}><FaPen /></button>
                        </div>
                    )}
                    <div id="nweet__content">
                        <span id="nweet__img">{nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} width="350px" height="300px" />}</span>
                        <h4>{nweetObj.text}</h4>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Nweet;