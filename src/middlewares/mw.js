const mw = (handlers) => async (req, res) => {
  const { method } = req
  const handler = handlers[method]

  if (!handler) {
    res.status(404).send('Not Found')

    return
  }

  const mws = Array.isArray(handler) ? handler : [handler]
  let mwIndex = -1

  const next = async () => {
    mwIndex += 1

    try {
      await mws[mwIndex](req, res, next)
    } catch (err) {
      res.status(500).send(err)
    }

    return
  }

  await next()
}

export default mw
