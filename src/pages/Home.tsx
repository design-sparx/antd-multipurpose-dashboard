import {useEffect, useState} from "react";
import {Flex, Image, theme, Typography} from "antd";
import {useMediaQuery} from "react-responsive";
import {Card} from "../components"
import {PATH_DOCS} from "../constants";
import {Link} from "react-router-dom";

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
  const isMobile = useMediaQuery({maxWidth: 769})

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
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          height: '100%',
          width: '100%',
          padding: isMobile ? "2rem 1rem" : "5rem 0",
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
          <Flex
            vertical
            align="center"
            gap="middle"
            style={{
              width: isMobile ? "100%" : `calc(${containerWidth} - 100px)`,
              margin: "0 auto 40px auto"
            }}
          >
            <Text
              style={{
                padding: ".5rem .75rem",
                color: colorPrimary,
                textTransform: "uppercase",
                fontSize: 14,
                fontWeight: 700,
                borderRadius,
                border: `1px solid ${colorPrimary}`
              }}
            >
              premium dashboard template
            </Text>
            <Title
              style={{
                margin: "3rem",
                fontSize: isMobile ? 36 : 40,
                fontWeight: 900,
              }}
            >
              A dynamic and versatile multipurpose <span className="text-highlight">dashboard</span>{' '}
              template utilizing{' '}
              <span className="text-highlight">React</span>,{' '}
              <span className="text-highlight">Vite</span>,{' '}
              <span className="text-highlight">Ant Design</span>, and{' '}
              <span className="text-highlight">Storybook</span>{' '}
            </Title>
            <Card>
              <Flex gap={6} align="flex-end">
                <Text style={{fontSize: 16, fontWeight: 500}}>
                  <span className="text-highlight">60+</span>{' '}
                  ready made components to use.</Text>
                <Link to={PATH_DOCS.components} target="_blank">View components</Link>
              </Flex>
            </Card>
          </Flex>
          <Image
            src="/landing-frame.png"
            alt="dashboard image snippet"
            style={{
              marginTop: "1rem",
            }}
          />
        </div>
      </Flex>
    </div>
  );
};

export default HomePage;
