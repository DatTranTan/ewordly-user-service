export function parseDuration(duration: string): number {
    console.log('Parsing duration:', duration);
    const match = duration.match(/^([1-9][0-9]*)([smhd])$/);
    if (!match) {
        throw new Error('Invalid duration format');
    }
    
    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        case 'd':
            return value * 24 * 60 * 60 * 1000;
        default:
            throw new Error('Invalid duration unit');
    }
}