const id = () =>
  Math.random()
    .toString(0x10)
    .slice(2, 10)

export default id
