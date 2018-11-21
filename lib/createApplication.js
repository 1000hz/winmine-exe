const DEFAULT_APPLICATION_PROPS = {
  title: null,
  iconSmall: null,
  iconLarge: null,
  minimize: true,
  maximize: true,
  close: true,
  singleton: false,
  menu: null
}

const DEFAULT_EXECUTION_PROPS = {
  taskId: null,
  x: 100,
  y: 100,
  runtimeOptions: null
}

export const ApplicationContext = React.createContext(null)

function createApplication(Component, applicationProps = DEFAULT_APPLICATION_PROPS) {
  applicationProps = {...DEFAULT_APPLICATION_PROPS, ...applicationProps}
  const AppComponent = (executionProps = DEFAULT_EXECUTION_PROPS) => {
    executionProps = {...DEFAULT_EXECUTION_PROPS, ...executionProps}
    return (
      <ApplicationContext.Provider value={{...applicationProps, ...executionProps}}>
        <Component {...executionProps.runtimeOptions} />
      </ApplicationContext.Provider>
    )
  }

  return {
    ...applicationProps,
    AppComponent
  }
}

export default createApplication
