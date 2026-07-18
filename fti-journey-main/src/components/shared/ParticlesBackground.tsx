import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

export const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
    };

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            className="absolute inset-0 -z-10"
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "bubble",
                        },
                    },
                    modes: {
                        bubble: {
                            distance: 200,
                            size: 10,
                            duration: 0.3,
                            opacity: 0.8,
                            color: "#f97316"
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#ffffff", "#f97316", "#fdba74"],
                    },
                    move: {
                        direction: "bottom",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: { min: 1, max: 2.5 },
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: { min: 0.2, max: 0.5 },
                        animation: {
                            enable: false,
                            speed: 1,
                            sync: false,
                        }
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 2 },
                    },
                },
                detectRetina: false,
            }}
        />
    );
};

export default ParticlesBackground;
