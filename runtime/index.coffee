SupEngine.registerEarlyUpdateFunction "fTween", -> 
  if window? then window.SUPTWEEN.update()
  return
