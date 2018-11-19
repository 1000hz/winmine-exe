import styled from "styled-components"
import Button from "~/components/_ui/Button"

export const WindowFrame = styled.div`
  position: absolute;
  transform: translate3d(${props => props.x}px, ${props => props.y}px, 0);
  padding: 2px;
  background: ${props => props.theme.colors.gray[2]};
  border: 1px solid ${props => props.theme.colors.gray[2]};
  border-right-color: ${props => props.theme.colors.gray[0]};
  border-bottom-color: ${props => props.theme.colors.gray[0]};
  box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[1]},
    inset 1px 1px 0 ${props => props.theme.colors.gray[3]};
`

const StyledTitleBar = styled.div`
  display: grid;
  grid-template-columns: min-content fit-content(100%) auto;
  align-items: center;
  justify-items: end;
  height: 18px;
  padding: 1px 3px 2px 2px;
  color: ${props => (props.active ? props.theme.colors.gray[3] : props.theme.colors.gray[2])};
  background: ${props => (props.active ? props.theme.colors.navy : props.theme.colors.gray[1])};
`

const Icon = styled.img`
  width: 16px;
  height: 16px;
`

const Title = styled.div`
  font-weight: bold;
  margin: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TitleBarButton = styled.button`
  margin: 0;
  padding: 2px;
  width: 16px;
  height: 14px;
  font-family: ${props => props.theme.fontFamilies.default};
  font-size: 8px;
  background: ${props => props.theme.colors.gray[2]};
  background-size: 13px 11px;
  background-position: 1px 1px;
  border: 0;
  box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[0]},
    inset 1px 1px 0 ${props => props.theme.colors.gray[3]},
    inset -2px -2px 0 ${props => props.theme.colors.gray[1]};
  outline: none;

  &.win95-activeClick--src.win95-activeClick--target {
    padding: 3px 1px 1px 3px;
    box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[3]},
      inset 1px 1px 0 ${props => props.theme.colors.gray[0]},
      inset -2px -2px 0 ${props => props.theme.colors.gray[2]},
      inset 2px 2px 0 ${props => props.theme.colors.gray[1]};
    background-position: 2px 2px;
    vertical-align: top;
  }
`

const MinimizeButton = styled(TitleBarButton)`
  background-image: url(${require("./images/minimize.png")});
`
const MaximizeButton = styled(TitleBarButton)`
  background-image: url(${({disabled}) =>
    require(`./images/maximize${disabled ? "-disabled" : ""}.png`)});
`
const HelpButton = styled(TitleBarButton)`
  background-image: url(${require("./images/help.png")});
`
const CloseButton = styled(TitleBarButton)`
  background-image: url(${require("./images/close.png")});
  margin-left: 2px;
`

const TitleBar = ({active, icon, title, buttons}) => (
  <StyledTitleBar active={active}>
    <Icon src={icon} />
    <Title>{title}</Title>
    <div>{buttons}</div>
  </StyledTitleBar>
)

const DEFAULT_TITLEBAR_BUTTONS = (
  <>
    <MinimizeButton />
    <MaximizeButton />
    <CloseButton />
  </>
)

const MenuBar = styled.div`
  display: flex;
`

const MenuBarItem = styled.button.attrs({
  type: "button"
})`
  margin: 0;
  padding: 6px;
  color: ${props => props.theme.colors.gray[0]};
  background: ${props => props.theme.colors.gray[2]};
  border: 0;
  font-family: ${props => props.theme.fontFamilies.default};
  outline: none;

  :hover:not(:disabled) {
    color: ${props => props.theme.colors.gray[3]};
    background: ${props => props.theme.colors.navy};
  }

  :disabled {
    color: ${props => props.theme.colors.gray[1]};
  }
`

const Window = ({
  x,
  y,
  icon,
  title,
  titlebarButtons = DEFAULT_TITLEBAR_BUTTONS,
  menuItems,
  task,
  children
}) => {
  return (
    <WindowFrame x={x} y={y}>
      <TitleBar active={true} title={title} buttons={titlebarButtons} icon={icon} />
      {menuItems ? (
        <MenuBar>
          {menuItems.map((menuItem, i) => <MenuBarItem key={i}>{menuItem}</MenuBarItem>)}
        </MenuBar>
      ) : (
        undefined
      )}
      {children}
    </WindowFrame>
  )
}

export default Window
