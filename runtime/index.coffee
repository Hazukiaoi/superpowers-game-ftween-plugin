SupEngine.addEarlyUpdatePlugin "fTween", -> 
  if window? then window.SUPTWEEN.update()
  return
