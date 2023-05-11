import "./ChannelInfoModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditChannelModal from "./EditChannelModal";


const ChannelInfoModal = ({ channel }) => {
    const sessionUser = useSelector(state => state.session.user)
    const [owner, setOwner] = useState([]);
    const [channelUsers, setChannelUsers] = useState([]);

    useEffect(() => {
        fetchOwner();
    }, []);


    const fetchOwner = async () => {
        const res = await fetch(`/api/users/${channel.ownerId}`);
        const owner = await res.json();
        setOwner(owner);
    };

    const addUser = (user) => {
        setChannelUsers([...channelUsers, user]);
    };


    return (
        <>
            <h2>{channel.channelName}</h2>
            <div>
                {channel.description}
            </div>
            <div>
                Created By:
                {owner.firstName} {owner.lastName}
            </div>
            {sessionUser.id === channel.ownerId && !channel.isDm &&
                <>

                    <OpenModalButton
                        buttonText={"Delete"}
                        modalComponent={<ConfirmDeleteModal channelId={channel.id} />}
                    />
                    <OpenModalButton
                        buttonText={"Edit"}
                        modalComponent={<EditChannelModal channel={channel} />} />
                </>
            }
        </>
    );
};
export default ChannelInfoModal;
