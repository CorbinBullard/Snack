import Reaction from './index';
import "./ReactionFormModal.css"

const ReactionFormModal = ({message, socket}) => {
    let emojis = ["👍🏻", "👎🏻", "😂", "💩", "🇺🇸", "🇯🇵", "🇰🇬", "🇲🇩", "😍", "🤌🏻", "🙏🏻", "❤️", "😎"];

    return (
        <div className='reaction-form-modal'>
            <h2>Choose Reaction</h2>
            {emojis.map(emoji =>
                <Reaction reaction={emoji} message={message} socket={socket}/>
            )}
        </div>
    )
}

export default ReactionFormModal
