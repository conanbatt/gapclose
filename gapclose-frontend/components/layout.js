import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'GapClose' }) => (
  <div className="layout">
    <Head>
      <title>GapClose - Getting to the other side</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"/>
      <link rel="stylesheet" href="static/bootstrap2-toggle.css"/>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </Head>
    <style jsx>{`
      .header {
          border-top: 1px solid transparent;
      }
    `}
    </style>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link prefetch href="/"><a className="navbar-brand">
            GapClose
          </a></Link>
        </div>
      </div>
    </nav>

    { children }
    {/*<footer></footer>*/}
  </div>)