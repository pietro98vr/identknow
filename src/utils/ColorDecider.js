const ColorDecider = (category) => {
    let circleColor;

    switch (category) {
        case 'Tutti':
            circleColor = '#ffa500';
            break;
        case 'Endodonzia':
            circleColor = '#FFBF00';
            break;
        case 'Conservativa':
            circleColor = '#50e0ff';
            break;
        case 'Protesi':
            circleColor = '#50C878';
            break;
        case 'Patologia orale':
            circleColor = '#ff6666';
            break;
        case 'Urgenze':
                circleColor = '#ff66b2';
                break;   
        default:
            circleColor = '#B0B0B0'; // Error handling
    }
    console.log("I decided " + circleColor + " for " + category);
    return circleColor;
};

export default ColorDecider;
