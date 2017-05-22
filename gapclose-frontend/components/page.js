
export default ({ children, extraClasses, title }) => (
  <div className="page_container panel panel-default">
    <style jsx>{`
      .page_container {
          background: white;
      }
    `}
    </style>
    { title ?
      <div className="panel-heading">
        { title }
      </div> : null }
    <div className="panel-body">
      { children }
    </div>
  </div>)