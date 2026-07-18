import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface LottieIconProps {
    url: string;
    className?: string;
    loop?: boolean;
}

const LottieIcon = ({ url, className = "w-12 h-12", loop = true }: LottieIconProps) => {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Error loading lottie animation:", err));
    }, [url]);

    if (!animationData) return <div className={className} />;

    return (
        <div className={className}>
            <Lottie animationData={animationData} loop={loop} />
        </div>
    );
};

export default LottieIcon;
