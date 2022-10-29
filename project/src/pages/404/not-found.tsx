function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <h1>404 Page not found</h1>
        <div className="video">
          <div style={{width:'100%'}}>
            <div style={{height:'0',paddingBottom:'75%',position:'relative',width:'100%'}}>
              <iframe title="rickroll" frameBorder={0} height={'100%'} src="https://giphy.com/embed/uhYPkjP03h9RvVdazZ/video" style={{left:0,position:'absolute',top:0}} width="100%"></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
