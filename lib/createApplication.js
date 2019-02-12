const DEFAULT_APPLICATION_PROPS = {
  title: null,
  iconSmall: null,
  iconLarge: null,
  canMinimize: true,
  canMaximize: true,
  canClose: true,
  singleton: true,
  x: 100,
  y: 100
}

export const ApplicationContext = React.createContext(null)

function createApplication(Component, applicationProps = DEFAULT_APPLICATION_PROPS) {
  applicationProps = {...DEFAULT_APPLICATION_PROPS, ...applicationProps}
  const AppComponent = (runtimeProps = {}) => {
    return (
      <ApplicationContext.Provider
        value={{...applicationProps, ...runtimeProps, ApplicationContext}}
      >
        <Component {...runtimeProps} />
      </ApplicationContext.Provider>
    )
  }

  return {
    ...applicationProps,
    AppComponent
  }
}

export default createApplication
