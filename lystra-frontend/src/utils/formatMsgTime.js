export const formatMessageTime = (date) => {
    const optionsDate = { year: "numeric", month: "short", day: "2-digit" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };

    const formattedDate = new Date(date).toLocaleDateString("en-US", optionsDate);
    const formattedTime = new Date(date).toLocaleTimeString("en-US", optionsTime);

    return [formattedDate, formattedTime];
};
