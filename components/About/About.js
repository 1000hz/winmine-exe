import React, {useRef} from "react"
import styled from "styled-components"
import Window from "~/components/_ui/Window/Window"
import Text, {TitleText} from "~/components/_ui/Text"
import useHover from "~/lib/useHover"

import imgCina from "./images/cina.png"
import imgCinaKid from "./images/cina-kid.png"
import imgIconSm from "./images/icon-sm.png"
import imgTwitter from "./images/twitter.png"
import imgGitHub from "./images/github.png"
import imgLetterboxd from "./images/letterboxd.png"
import imgSoundCloud from "./images/soundcloud.png"

const Picture = styled.img`
  align-self: flex-start;
  width: 300px;
  height: 300px;
  -webkit-touch-callout: none;
`

const Container = styled.div`
  margin: 20px;
  display: flex;
`

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
`

const Subheading = styled.h1`
  font-size: 18px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 220px;
  margin-right: 20px;
  padding-right: 20px;
  color: ${(props) => props.theme.colors.gray[0]};
  box-shadow: inset -1px 0 ${(props) => props.theme.colors.gray[3]},
    inset -2px 0 ${(props) => props.theme.colors.gray[1]};
`

const Link = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.blue};
  text-decoration: underline;
  cursor: ${(props) => props.theme.cursors.pointer};
`

const Logo = styled.img`
  width: 32px;
`

const SocialLink = ({icon, alt, href, children}) => {
  return (
    <Link href={href} target="_blank">
      <Logo alt={alt} src={icon} />
      <Text>{children}</Text>
    </Link>
  )
}

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const About = () => {
  const hoverRef = useRef()
  const isHovering = useHover(hoverRef)

  return (
    <Window title="About" resizable={true} icon={imgIconSm.src}>
      <Container>
        <Content>
          <Text>
            Built in an effort to return to <Link ref={hoverRef}>simpler times</Link> by
          </Text>
          <TitleText as={Heading}>Cina Saffary</TitleText>
          <SocialLinksContainer>
            <SocialLink
              alt="Twitter Logo"
              icon={imgTwitter.src}
              href="https://twitter.com/1000hz"
            />
            <SocialLink alt="Github Logo" icon={imgGitHub.src} href="https://github.com/1000hz" />
            <SocialLink
              alt="Letterboxd Logo"
              icon={imgLetterboxd.src}
              href="https://letterboxd.com/1000hz"
            />
            <SocialLink
              alt="SoundCloud Logo"
              icon={imgSoundCloud.src}
              href="https://soundcloud.com/cinasaffary"
            />
          </SocialLinksContainer>
          <TitleText as={Subheading}>@1000hz</TitleText>
        </Content>
        <Picture alt="Cina Saffary" src={isHovering ? imgCinaKid.src : imgCina.src} />
      </Container>
    </Window>
  )
}

export default About
