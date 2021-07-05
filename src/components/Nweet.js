import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

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
                        <>
                            <form onSubmit={onSubmit}>
                                <input type="text" placeholder="Edit your nweet" value={newNweet} onChange={onChange} required />
                                <input type="submit" value="Update Nweet" />
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </>}
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} width="50px" height="50px" />}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Nweet;