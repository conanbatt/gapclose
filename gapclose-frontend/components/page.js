
export default ({ children, extraClasses }) => (
  <div className="page_container container">
    <style jsx>{`
      .page_container {
          background: white;
          border: 1px solid #dedede;
          border-radius: 4px;
          padding: 20px 0;
          margin-bottom: 40px;
      }
    `}
    </style>
    { children }
  </div>)