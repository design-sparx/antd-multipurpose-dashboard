export const getNameInitials = (fullName: string): string => {
    const fInitial = Array.from(fullName.split(' ')[0])[0],
        lInitial = Array.from(fullName.split(' ')[1])[0];

    return `${fInitial}${lInitial}`
}