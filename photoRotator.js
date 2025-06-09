// PhotoRotator.js
// React component for rotating photo gallery

function PhotoRotator() {
    // Start with a random photo instead of the first one
    const getRandomPhoto = () => {
        const randomIndex = Math.floor(Math.random() * photos.length);
        return photos[randomIndex];
    };

    const [currentPhoto, setCurrentPhoto] = React.useState(getRandomPhoto());

    const changePhoto = () => {
        let newPhoto;
        do {
            const randomIndex = Math.floor(Math.random() * photos.length);
            newPhoto = photos[randomIndex];
        } while (newPhoto.id === currentPhoto.id && photos.length > 1);

        setCurrentPhoto(newPhoto);
    };

    return React.createElement('figure', { style: { margin: 0 } }, [
        React.createElement('img', {
            key: 'img',
            src: currentPhoto.src,
            alt: currentPhoto.alt,
            style: {
                width: '100%',
                height: 'auto',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease'
            },
            onClick: changePhoto,
            title: "Click to see a different photo!"
        }),
        React.createElement('figcaption', {
            key: 'caption',
            style: {
                marginTop: '8px',
                fontSize: '14px',
                color: '#666',
                lineHeight: '1.4'
            }
        }, currentPhoto.caption)
    ]);
}

// Function to initialize the component
function initPhotoRotator() {
    ReactDOM.render(
        React.createElement(PhotoRotator),
        document.getElementById('photo-rotator-container')
    );
}