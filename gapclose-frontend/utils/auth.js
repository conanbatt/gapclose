export const authorized = async (req)=>{

  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const authHeader = new Headers();
  if(req && req.headers.cookie){
    authHeader.append('cookie', req.headers.cookie)
  }
  const auth = await fetch(`${baseUrl}/api/auth/user`, {credentials: 'same-origin', headers: authHeader})
  if(auth.status == 401){
    return
  }
  const resp = await auth.json()
  if(resp.auth){
    return resp.user
  }
}

export const logIn = async (username, password)=>{

  const auth = await fetch(`/api/auth/login`, {
    method: "POST",
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  const resp = await auth.json()
  return resp
}
