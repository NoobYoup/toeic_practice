import { useEffect, useState } from 'react';

function BackToTop({ threshold = 200 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > threshold);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button
            onClick={handleClick}
            className={`back-to-top btn btn-primary ${visible ? 'show' : ''}`}
            aria-label="Back to top"
        >
            <i className="fas fa-arrow-up"></i>
        </button>
    );
}

export default BackToTop;
