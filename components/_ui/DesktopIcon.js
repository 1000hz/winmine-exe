import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Text from "~/components/_ui/Text"
import ditherBackground from "~/lib/ditherBackground"
import useTaskManager from "~/lib/useTaskManager"

const StyledDesktopIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 0;
`

const Icon = styled.div`
  display: block;
  width: 32px;
  height: 32px;
  background-image: url(${props => props.src});
  background-size: 32px;

  :after {
    ${props => (props.isSelected ? `content: ""` : undefined)};
    display: block;
    width: 32px;
    height: 32px;
    ${props => (props.isSelected ? ditherBackground(props.theme.colors.navy, "#000") : undefined)};
    mix-blend-mode: lighten;
  }
`

const Label = styled(Text)`
  position: relative;
  display: inline-block;
  color: ${props => props.theme.colors.gray[3]};
  background: ${props => (props.isSelected ? props.theme.colors.navy : "transparent")};
  margin: 4px;
  padding: 2px;
  padding-top: 1px;

  :after {
    ${props => (props.isSelected ? `content: ""` : undefined)};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px dotted ${props => props.theme.colors.gray[3]};
    mix-blend-mode: exclusion;
  }

  :focus :after {
    content: "";
  }
`

const DesktopIcon = ({application}) => {
  const {createTask} = useTaskManager()
  const [isSelected, setIsSelected] = useState(false)

  return (
    <StyledDesktopIcon
      tabIndex="0"
      onDoubleClick={() => createTask({application})}
      onFocus={() => setIsSelected(true)}
      onBlur={() => setIsSelected(false)}
    >
      <Icon src={application.iconLarge} isSelected={isSelected} />
      <Label isSelected={isSelected}>{application.title}</Label>
    </StyledDesktopIcon>
  )
}

export default DesktopIcon
