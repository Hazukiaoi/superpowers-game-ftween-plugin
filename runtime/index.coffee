SupEngine.registerEarlyUpdateFunction "fTween", -> 
  if window? then window.FTWEEN.update()
  return
