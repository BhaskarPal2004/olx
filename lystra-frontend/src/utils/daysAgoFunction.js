const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();

    const createdAtLocal = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());
    const currentTimeLocal = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

    const timeDifference = currentTimeLocal - createdAtLocal;
    const day = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    if (day === 0)
        return 'Today'
    else if (day === 1)
        return 'Yesterday'
    else
        return `${day} Days ago`
};

export default daysAgoFunction;