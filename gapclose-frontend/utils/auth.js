export const authorized = async (req)=>{

  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const authHeader = new Headers();
  if(req){
    authHeader.append('cookie', req.headers.cookie)
  }
  const auth = await fetch(`${baseUrl}/api/auth/user`, {credentials: 'same-origin', headers: authHeader})
  const resp = await auth.json()
  console.log("auth resp", resp)
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
