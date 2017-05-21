
export default ({ children, extraClasses }) => (
  <div className="page_container panel panel-default">
    <style jsx>{`
      .page_container {
          background: white;
      }
    `}
    </style>
    <div className="panel-body">
      { children }
    </div>
  </div>)