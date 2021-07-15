import { storageService, dbService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

// Nweet 생성
const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState();
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const {
            target: { files }
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result }
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";
        if (attachment != null) {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment(null);
    }
    const onClearAttachment = () => setAttachment(null);
    return (
        <form id="nweet__form" onSubmit={onSubmit}>
            <input id="nweet__content" value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} />
            <label for="nweet__file" id="nweet__file__label" >
                <span>Add photos</span>
                <FaPlus />
            </label>
            <input id="nweet__file" type="file" accept="image/*" onChange={onFileChange} />
            <input id="nweet__submit" type="submit" value="→" />
            {attachment && (
                <div id="nweet__imgPreview">
                    <img src={attachment} width="150px" height="150px" />
                    <button onClick={onClearAttachment}>Remove <FaTimes /></button>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;