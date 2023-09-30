import {useEffect, useState} from "react";
import {Image, theme, Typography} from "antd";
import {useMediaQuery} from "react-responsive";

const {Title, Text} = Typography

const HomePage = () => {
    const {
        token: {borderRadius, colorPrimary},
    } = theme.useToken();
    const isMedium = useMediaQuery({minWidth: 769}),
        isLarge = useMediaQuery({minWidth: 992}),
        isXLarge = useMediaQuery({minWidth: 1200}),
        isXXLarge = useMediaQuery({minWidth: 1400})
    const [containerWidth, setContainerWidth] = useState<string>()

    useEffect(() => {
        // sort from large to small devices
        if (isXXLarge) {
            setContainerWidth("1320px")
        } else if (isXLarge) {
            setContainerWidth("1140px")
        } else if (isLarge) {
            setContainerWidth("960px")
        } else if (isMedium) {
            setContainerWidth("720px")
        } else {
            setContainerWidth("100%")
        }
    }, [isLarge, isXLarge, isXXLarge, isMedium]);

    return (
        <div
            style={{
                // backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 1) 40%), url('/grid-3d.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    padding: "80px 0",
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div
                    // as per bootstrap container sizes
                    style={{
                        maxWidth: containerWidth,
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <section
                        style={{
                            width: `calc(${containerWidth} - 200px)`,
                            margin: "0 auto 40px auto"
                        }}
                    >
                        <Text
                            style={{
                                padding: ".5rem .75rem",
                                color: colorPrimary,
                                textTransform: "uppercase",
                                fontSize: 14,
                                fontWeight: 600,
                                borderRadius,
                                border: `1px solid ${colorPrimary}`
                            }}
                        >
                            premium admin dashboard for success
                        </Text>
                        <Title
                            style={{
                                margin: "3rem",
                                fontSize: 48,
                                fontWeight: 700,
                            }}
                        >
                            Multi <span className="text-highlight">dashboard</span>{' '}
                            template with{' '}
                            <span className="text-highlight">React</span> and{' '}
                            <span className="text-highlight">Ant Design</span>{' '}
                            v5.
                        </Title>
                        <Text style={{fontSize: 18, fontWeight: 500}}>Explore a powerful & versatile multi-dashboard
                            application</Text>
                    </section>
                    <Image
                        src="/landing-frame.png"
                        alt="dashboard image snippet"
                        style={{
                            marginTop: "1rem",
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;