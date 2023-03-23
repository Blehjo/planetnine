export function unixConverter (unixTimestamp: number) {
    const convertedTimestamp = new Date(unixTimestamp * 1000).toLocaleDateString("en-US");
    return `Released: ${convertedTimestamp}`;
}

export function utcConverter (unixTimestamp: number) {
    const date = new Date(unixTimestamp);
    const convertedTime = date.toLocaleDateString();
    return convertedTime;
}
