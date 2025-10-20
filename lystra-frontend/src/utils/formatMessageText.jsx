const formatMessageText = (text) => {
    if (!text) return null;

    text = text.trim();

    const isPhoneNumber = /^\+?[1-9]\d{1,14}$/.test(text);

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);

    const isUrl = /^(https?:\/\/|www\.)[^\s]+|([a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|io|dev|co|ai|uk|ca|au|us|info|biz|me|tv|xyz|tech|app|blog|store|online)(\/[^\s]*)?)$/.test(text);

    if (isPhoneNumber) return <a href={`tel:${text}`} className="text-blue-500 underline">{text}</a>

    if (isEmail) return <a href={`mailto:${text}`} className="text-blue-500 underline"> {text}</a>

    if (isUrl) {
        const url = text.startsWith("http") ? text : `https://${text}`;
        return <a href={url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{text}</a>
    }

    return <p className="text-[#161616] m-0">{text}</p>;
};

export default formatMessageText;