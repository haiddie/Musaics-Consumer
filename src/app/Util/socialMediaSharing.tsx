
export const sanitizeTitle = (title: string) => {
    const regex = /(&apos;)/g;
    return title.replace(regex, "'");
};


export const stripAndFilterText = (text: string) => {
    let strippedString = text.replace(/(<([^>]+)>)/gi, '');
    const max_len = 100;

    strippedString = strippedString.trim();

    if (strippedString.length > max_len) {
        strippedString = strippedString.slice(0, max_len) + '..';
    }

    return strippedString;
};

export const handleFacebookShare = (url: string) => {
    const facebook = `https://www.facebook.com/sharer/sharer.php?href=${url}`;
    window.open(facebook, 'facebook');
};

export const handleTwitterShare = async (url: string, name: string, description: string, isDesktop: boolean, displayPicture: any) => {
    const shortenedUrl = await fetch(`https://api.tinyurl.com/dev/api-create.php?url=${url}`);
    const sanitizedTitle = sanitizeTitle(name).trim();
    const sanitizedDescription = stripAndFilterText(description).trim();
    const sanitizedText = isDesktop ? `${displayPicture} ${sanitizedTitle}%0A%0A${sanitizedDescription}` : `${sanitizedTitle}%0A%0A${sanitizedDescription}`;

    const twitter =
        isDesktop
            ? `http://twitter.com/share?text=${encodeURIComponent(sanitizedText)}&url=${shortenedUrl?.url}%0A&hashtags=sportswriters`
            : `http://twitter.com/intent/tweet?text=${encodeURIComponent(sanitizedText)}&url=${shortenedUrl?.url}%0A&hashtags=sportswriters`;

    window.open(twitter, 'twitter');
};
