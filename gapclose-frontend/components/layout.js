import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'GapClose' }) => (
  <div className="layout">
    <Head>
      <style>{`
        html, body {
            height: 100%;
            background: #f5f5f5 !important;
        }
      `}
    </style>
      <title>GapClose - Getting the other side</title>
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
          <ul className="nav navbar-nav">
            <Link prefetch href="/"><li><a href="#">Topics</a></li></Link>
          </ul>
        </div>
      </div>
    </nav>

    { children }
    {/*<footer></footer>*/}
  </div>)