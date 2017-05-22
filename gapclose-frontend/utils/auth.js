export const authorized = async (req)=>{

  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const authHeader = new Headers();
  if(req){
    authHeader.append('cookie', req.headers.cookie)
  }
  const auth = await fetch(`${baseUrl}/api/auth/test`, {credentials: 'same-origin', headers: authHeader})
  return auth.status !== 401
}
